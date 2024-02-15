import TableService from './TableService.js';
import SessionService from '../session/SessionService.js';
import UserService from '../user/UserService.js';

class TableController {
  async _getUserId(sessionId) {
    const userSession = await SessionService.find(sessionId);
    return await UserService.getUserId(userSession.userName);
  }

  async _checkUserOwnsTable(sessionId, tableId) {
    const userId = await this._getUserId(sessionId);
    return await UserService.checkUserOwnsTable(userId, tableId);
  }

  async create(req, res) {
    try {
      const tableData = Object.assign({
        user: await this._getUserId(req.cookies.sessionId)
      }, req.body);
      const table = await TableService.create(tableData);
      res.json(table);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getUserTables(req, res) {
    try {
      const userId = await this._getUserId(req.cookies.sessionId);
      res.json(await TableService.getUserTables(userId));
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async changeTable(req, res) {
    try {
      await this._checkUserOwnsTable(req.cookies.sessionId, req.params.tableId)
        ? res.json(await TableService.changeTableRows(
          req.params.tableId,
          req.body.rows
        ))
        : res.status(401).end();
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteTable(req, res) {
    try {
      await this._checkUserOwnsTable(req.cookies.sessionId, req.params.tableId)
        ? res.json(await TableService.deleteTable(req.params.tableId))
        : res.status(401).end();
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async renameTable(req, res) {
    try {
      if (await this._checkUserOwnsTable(req.cookies.sessionId, req.params.tableId)) {
        console.log(123);
        const renamedTable = await TableService.renameTable(
          req.params.tableId,
          req.body.name
        );
        res.json({ id: renamedTable._id, name: renamedTable.name });
      } else {
        res.status(401).end();
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async changeColumnsTypes(req, res) {
    try {
      if (await this._checkUserOwnsTable(req.cookies.sessionId, req.params.tableId)) {
        const updatedTable = await TableService.changeColumnsTypes(
          req.params.tableId,
          req.body.newColumnTypes
        );
        res.json({ id: updatedTable._id, columnTypes: updatedTable.columnTypes });
      } else {
        res.status(401).end();
      }
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TableController();
