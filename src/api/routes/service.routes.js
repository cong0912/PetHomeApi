import express from 'express';
import { checkUserAuth, checkPermissionUser } from '../middlewares/jwtMiddleWares';
import serviceRecordController from '../controllers/serviceRecordController';

const router = express.Router();

router.post('/service', checkUserAuth, checkPermissionUser(['CUSTOMER']), serviceRecordController.createServiceRecord);
router.get('/service', checkUserAuth, checkPermissionUser(['STAFF']), serviceRecordController.getAllServiceRecord);

router.post(
    '/service/serviceHistory',
    checkUserAuth,
    checkPermissionUser(['CUSTOMER']),
    serviceRecordController.getServiceHistory,
);
router.post(
    '/service/confirm',
    checkUserAuth,
    checkPermissionUser(['STAFF']),
    serviceRecordController.confirmServiceRecord,
);
router.post(
    '/service/cancel',
    checkUserAuth,
    checkPermissionUser(['CUSTOMER']),
    serviceRecordController.cancelServiceRecord,
);
router.post(
    '/service/inProgress',
    checkUserAuth,
    checkPermissionUser(['STAFF']),
    serviceRecordController.inProgressServiceRecord,
);
router.post(
    '/service/completed',
    checkUserAuth,
    checkPermissionUser(['STAFF']),
    serviceRecordController.completedServiceRecord,
);
router.post(
    '/service/staff/cancel',
    checkUserAuth,
    checkPermissionUser(['STAFF']),
    serviceRecordController.staffCancelServiceRecord,
);
router.get(
    '/service/:id',
    checkUserAuth,
    checkPermissionUser(['STAFF']),
    serviceRecordController.getDetailServiceRecord,
);

export default router;
