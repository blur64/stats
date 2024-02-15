import Router from 'express';
import UserController from './user/UserController.js';
import TableController from './table/TableController.js';

const router = new Router();

router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.post('/registration', UserController.create);
router.get('/logined', UserController.isUserLogined);
router.post('/tables', TableController.create.bind(TableController));
router.get('/tables', TableController.getUserTables.bind(TableController));
router.put('/tables/:tableId', TableController.changeTable.bind(TableController));
router.delete('/tables/:tableId', TableController.deleteTable.bind(TableController));
router.put('/tables/rename/:tableId', TableController.renameTable.bind(TableController));
router.put('/tables/types/:tableId', TableController.changeColumnsTypes.bind(TableController));

export default router;
