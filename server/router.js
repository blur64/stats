import Router from 'express';
import UserController from './UserController.js';
import TableController from './TableController.js';

const router = new Router();

router.post('/users', UserController.create);
router.get('/users', UserController.getUserId);
router.post('/tables', TableController.create);
router.get('/tables/:userId', TableController.getUserTables);
router.put('/tables/:tableId', TableController.changeTable);
router.delete('/tables/:tableId', TableController.deleteTable);
router.put('/tables/rename/:tableId', TableController.renameTable);
router.put('/tables/types/:tableId', TableController.changeColumnsTypes);

export default router;
