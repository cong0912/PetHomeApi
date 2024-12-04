import express from 'express';
import categoryController from '../controllers/categoryController';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
const router = express.Router();

router.get('/category', checkUserAuth, checkPermissionUser(['STAFF']), categoryController.getCategory);

export default router;
