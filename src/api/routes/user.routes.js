import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import userController from '../controllers/userController';

const router = express.Router();

router.get('/user', checkUserAuth, checkPermissionUser(['ADMIN']), userController.getAllUser);
router.get('/user/disable', checkUserAuth, checkPermissionUser(['ADMIN']), userController.disableUserById);
router.get('/user/:id', checkUserAuth, checkPermissionUser(['CUSTOMER', 'STAFF', 'ADMIN']), userController.getUserById);

export default router;
