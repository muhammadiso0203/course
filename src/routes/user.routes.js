import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const router = Router();
const controller = new userController();

router
    .post('/superadmin', controller.createSuperAdmin)
    .post('/', controller.createUser)
    .get('/', controller.getAllUser)
    .get('/:id', controller.getUserById)
    .patch('/:id', controller.updateUser)
    .delete('/:id', controller.deleteUser)

export default router;