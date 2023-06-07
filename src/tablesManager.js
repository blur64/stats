class Table {
  constructor({ headers, rows, name, id }) {
    this.headers = headers;
    this.rows = rows;
    this.name = name;
    this.id = id;
  }
}

class TablesManager {
  constructor(tables) {
    this.tables = tables;
  }

  getTableById(id) {
    return this.tables.find((table) => table.id === id);
  }

  createTable(tableData) {
    const table = new Table(tableData);
    this.tables.push(table);
  }

  getTablesData() {
    return this.tables.map((table) => {
      return { id: table.id, name: table.name };
    });
  }
}

export default new TablesManager([]);
