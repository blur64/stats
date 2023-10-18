import Table from './Table.js';

class TableService {
  async create(table) {
    const createdTable = await Table.create(table);
    return createdTable;
  }

  async getUserTables(userId) {
    const tables = await Table.find({ user: userId });
    return tables;
  }

  async changeTableRows(tableId, newRows) {
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      { rows: newRows },
      { new: true }
    );
    return updatedTable;
  }

  async deleteTable(tableId) {
    const deletedTable = await Table.findByIdAndDelete(tableId);
    return deletedTable;
  }

  async renameTable(tableId, newName) {
    const renamedTable = await Table.findByIdAndUpdate(
      tableId,
      { name: newName },
      { new: true }
    );
    return renamedTable;
  }

  async changeColumnsTypes(tableId, newColumnTypes) {
    const updatedTable = await Table.findByIdAndUpdate(
      tableId,
      { columnTypes: newColumnTypes },
      { new: true }
    );

    return updatedTable;
  }
}

export default new TableService();
