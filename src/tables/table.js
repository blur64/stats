class Column {
  constructor({ name, type, value }) {
    this.name = name;
    this.type = type;
    this.value = value;

    if (type === 'number') {
      this.setType('number');
    }
  }

  setType(type) {
    if (this.type === 'number' && (type === 'string' || type === 'factor')) {
      this.value = this.value.map((columnItem) => String(columnItem));
    }

    this.type = type;

    if (type === 'number') {
      this.value = this.value.map((columnItem) => {
        if (columnItem !== '' && !isNaN(+columnItem)) {
          return +columnItem;
        } else {
          return '';
        }
      });
    }
  }
}

class Table {
  constructor({ name, id, headers, rows, columnTypes }) {
    this.name = name;
    this.id = id;
    this.headers = headers;
    this.rows = rows;
    this.columns = [];

    headers.forEach((header, index) => {
      let columnValue = rows.map((row) => row[index]);
      const columnType = columnTypes[index];

      const newColumn = new Column({
        name: header,
        value: columnValue,
        type: columnType,
      });

      this.columns.push(newColumn);
    });
  }

  getColumn(name) {
    return this.columns.find((column) => column.name === name);
  }

  setNewRows(rows) {
    this.rows = rows;
  }

  getColumnTypes() {
    return this.columns.map((column) => column.type);
  }
}

export default Table;
