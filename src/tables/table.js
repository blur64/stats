function getColumnType(columnCellValue) {
  switch (typeof columnCellValue) {
    case 'string':
      return 'string';
    case 'number':
      return 'number';
  }
}

class Column {
  constructor({ name, type, value }) {
    this.name = name;
    this.type = type;
    this.value = value;
  }

  setType(type) {
    this.type = type;
    if (type === 'number') {
      this.value = this.value.map((columnItem) => +columnItem);
    }
  }
}

class Table {
  constructor({ name, id, headers, rows }) {
    this.name = name;
    this.id = id;
    this.headers = headers;
    this.rows = rows;
    this.columns = [];

    headers.forEach((header, index) => {
      this.columns.push(
        new Column({
          name: header,
          value: rows.map((row) => row[index]),
          type: getColumnType(rows[0][index]),
        })
      );
    });
  }

  getColumn(name) {
    return this.columns.find((column) => column.name === name);
  }
}

export default Table;
