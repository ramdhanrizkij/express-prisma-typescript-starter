import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  // 1. Create permissions (from user.routes.ts)
  const permissions = [
    { name: 'user:list' },    // GET /api/users
    { name: 'user:detail' }, // GET /api/users/:id
    { name: 'user:update' }, // PUT /api/users/:id
    { name: 'user:delete' }, // DELETE /api/users/:id
    { name: 'user:create' }, // (optional, if you have POST /api/users)
    { name: "role:list" },
    { name: "role:detail" },
    { name: "role:update" },
    { name: "role:delete" },
    { name: "role:create" },
    { name: "permission:list" },
    { name: "permission:detail" },
    { name: "permission:update" },
    { name: "permission:delete" },
    { name: "permission:create" },
  ];

  // Upsert permissions
  const permissionRecords = await Promise.all(
    permissions.map((perm) =>
      prisma.permission.upsert({
        where: { name: perm.name },
        update: {},
        create: perm,
      })
    )
  );

  // 2. Create roles
  const adminRole = await prisma.role.upsert({
    where: { name: 'Admin' },
    update: {},
    create: { name: 'Admin' },
  });
  const userRole = await prisma.role.upsert({
    where: { name: 'User' },
    update: {},
    create: { name: 'User' },
  });

  // 3. Assign all permissions to Admin
  await prisma.role.update({
    where: { id: adminRole.id },
    data: {
      permissions: {
        set: permissionRecords.map((p) => ({ id: p.id })),
      },
    },
  });

  // 4. User role gets no permissions by default
  await prisma.role.update({
    where: { id: userRole.id },
    data: {
      permissions: { set: [] },
    },
  });

  console.log('Seeded roles and permissions!');

  console.log("Seeding Admin User")
  
  const adminPassword = await bcrypt.hash("admin123", 10)
  await prisma.user.upsert({
    where: { email: "admin@gmail.com" },
    update: {},
    create: {
      email: "admin@gmail.com",
      password: adminPassword,
      name: "Admin",
      role: {
        connect: {
          id: adminRole.id
        }
      }
    }
  })

  console.log("Seeded Admin User")
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 