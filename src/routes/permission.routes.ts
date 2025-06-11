import { Router } from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware";
import { PermissionController } from "../controllers/permission.controller";

const router = Router()
const permissionController = new PermissionController()
const authMiddleware = new AuthMiddleware()

router.use(authMiddleware.authenticate, authMiddleware.isAdmin)

/**
 * @swagger
 * /api/permission:
 *   post:
 *     summary: Create a new permission
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Permission created successfully
 *       400:
 *         description: Failed to create permission
 *       401:
 *         description: Unauthorized
 *       403:
 */
router.post("/", permissionController.createPermission)

/**
 * @swagger
 * /api/permission/{id}:
 *   get:
 *     summary: Get a permission by ID
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Permission fetched successfully
 *       404:
 *         description: Permission not found
 *       401:
 *         description: Unauthorized
 *       403:
 */
router.get("/:id", permissionController.getPermissionById)

/**
 * @swagger
 * /api/permission:
 *   get:
 *     summary: Get all permissions
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Permissions fetched successfully
 *       401:
 *         description: Unauthorized
 *       403:
*/
router.get("/", permissionController.getAllPermission)

/**
 * @swagger
 * /api/permission/{id}:
 *   put:
 *     summary: Update a permission by ID
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Permission updated successfully
 *       400:
 *         description: Failed to update permission
 *       401:
 *         description: Unauthorized
 */
router.put("/:id", permissionController.updatePermission)

/**
 * @swagger
 * /api/permission/{id}:
 *   delete:
 *     summary: Delete a permission by ID
 *     tags: [Permission]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *     responses:
 *       200:
 *         description: Permission deleted successfully
 *       400:
 *         description: Failed to delete permission
 *       401:
 *         description: Unauthorized
 */
router.delete("/:id", permissionController.deletePermission)

export {router as permissionRoutes}