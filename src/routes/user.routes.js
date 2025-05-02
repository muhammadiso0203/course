import { Router } from "express";
import { userController } from "../controller/user.controller.js";

const router = Router();
const controller = new userController();

router
    .post('/', controller.createUser)
    .get('/', controller.getAllUser)
    .get('/:id', controller.getUserById)

export default router;