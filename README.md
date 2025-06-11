# Express TypeScript Boilerplate

A robust Express.js boilerplate with TypeScript, featuring authentication, authorization, and user management.

## Features

- 🔐 JWT Authentication
- 👥 User Registration and Login
- 🔑 Role-based Authorization
- 📊 Permission Management (Admin only)
- 👤 User CRUD Operations (Admin only)
- ✅ JSON Form Validation
- 🏗️ Repository Service Pattern
- 🔄 TypeScript Support
- 🗃️ Prisma ORM with PostgreSQL

## Tech Stack

- Express.js
- TypeScript
- Prisma ORM
- PostgreSQL
- JSON Web Token (JWT)
- bcryptjs
- express-validator

## Project Structure

```
├── src/
│   ├── app.ts                # Express app setup
│   ├── server.ts             # Entry point
│   ├── routes/               # API route definitions
│   │   ├── auth.routes.ts
│   │   ├── user.routes.ts
│   │   ├── role.routes.ts
│   │   └── permission.routes.ts
│   ├── controllers/          # Request handlers
│   │   ├── auth.controller.ts
│   │   ├── user.controller.ts
│   │   ├── role.controller.ts
│   │   └── permission.controller.ts
│   ├── services/             # Business logic
│   │   ├── auth.service.ts
│   │   ├── user.service.ts
│   │   ├── role.service.ts
│   │   └── permission.service.ts
│   ├── repositories/         # Data access layer
│   │   ├── user.repository.ts
│   │   ├── role.repository.ts
│   │   └── permission.repository.ts
│   ├── interfaces/           # TypeScript interfaces
│   │   ├── user.interface.ts
│   │   └── permission.interface.ts
│   ├── middlewares/          # Express middlewares
│   │   ├── auth.middleware.ts
│   │   └── validation.middleware.ts
│   └── config/               # Configuration files (e.g., Swagger)
│       └── swagger.ts
├── prisma/
│   ├── schema.prisma         # Prisma schema
│   ├── seed.ts               # Seeder script
│   └── migrations/           # Database migrations
│       └── ...
├── package.json              # Project metadata and scripts
├── tsconfig.json             # TypeScript configuration
├── README.md                 # Project documentation
└── .env.example              # Example environment variables
```

## Quick Start with npx

You can quickly create a new project using this template via npm:

```
npx express-ts-prisma-starter <project-directory>
```

Replace `<project-directory>` with your desired folder name. This will clone the template, install dependencies, and set up your project structure.

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/ramdhanrizkij/express-prisma-typescript-starter.git
   cd express-prisma-typescript-starter
   ```
2. **Install dependencies:**
   ```
   npm install
   ```

## Database Configuration

1. **Set up your PostgreSQL database.**
2. **Copy the example environment file and edit it:**
   ```
   cp .env.example .env
   ```
   Edit the `.env` file and set your `DATABASE_URL` to match your PostgreSQL connection string, for example:
   ```
   DATABASE_URL="postgresql://user:password@localhost:5432/your_db_name"
   ```
3. **Run Prisma migrations:**
   ```
   npx prisma migrate dev
   ```

## Running the Application

- **Development mode:**
  ```
  npm run dev
  ```
- **Production build:**
  ```
  npm run build
  npm start
  ```

## Database Seeding

To populate the initial roles and permissions (Admin, User, and user CRUD permissions), run:

```
npm run seed
```

## API Documentation

You can access the API documentation via Swagger UI after starting the server:

```
http://localhost:3000/api-docs
```

## Default Admin Credential

After seeding, please create an admin user manually using the register endpoint or directly in the database. Example payload to register an admin:

```
POST /api/auth/register
{
  "email": "admin@example.com",
  "password": "admin123",
  "name": "Admin",
  "roleId": 1
}
```

- **roleId 1** is Admin (created by the seeder)
- After registration, this user will have full access to all admin endpoints