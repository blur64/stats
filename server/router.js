import Router from 'express';
import UserController from './user/UserController.js';
import TableController from './table/TableController.js';

const router = new Router();

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/registration', UserController.create);
router.get('/logined', UserController.isUserLogined);
router.post('/tables', TableController.create);
router.get('/tables/:userId', TableController.getUserTables);
router.put('/tables/:tableId', TableController.changeTable);
router.delete('/tables/:tableId', TableController.deleteTable);
router.put('/tables/rename/:tableId', TableController.renameTable);
router.put('/tables/types/:tableId', TableController.changeColumnsTypes);

export default router;
