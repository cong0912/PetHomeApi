import express from 'express';
import dashboardController from '../controllers/dashboardController';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
const router = express.Router();

router.get('/dashboard/daily', checkUserAuth, checkPermissionUser(['ADMIN']), dashboardController.getRevenueByDay);
router.get('/dashboard/month', checkUserAuth, checkPermissionUser(['ADMIN']), dashboardController.getRevenueByMonth);

export default router;
