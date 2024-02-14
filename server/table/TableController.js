import TableService from './TableService.js';

class TableController {
  async create(req, res) {
    try {
      const table = await TableService.create(req.body);
      res.json(table);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async getUserTables(req, res) {
    try {
      const tables = await TableService.getUserTables(req.params.userId);
      res.json(tables);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async changeTable(req, res) {
    try {
      const table = await TableService.changeTableRows(
        req.params.tableId,
        req.body.rows
      );
      res.json(table);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async deleteTable(req, res) {
    try {
      const deletedTable = await TableService.deleteTable(req.params.tableId);
      res.json(deletedTable);
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async renameTable(req, res) {
    try {
      const renamedTable = await TableService.renameTable(
        req.params.tableId,
        req.body.name
      );

      res.json({ id: renamedTable._id, name: renamedTable.name });
    } catch (e) {
      res.status(500).json(e);
    }
  }

  async changeColumnsTypes(req, res) {
    try {
      const updatedTable = await TableService.changeColumnsTypes(
        req.params.tableId,
        req.body.newColumnTypes
      );
      res.json({ id: updatedTable._id, columnTypes: updatedTable.columnTypes });
    } catch (e) {
      res.status(500).json(e);
    }
  }
}

export default new TableController();
