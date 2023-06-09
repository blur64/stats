import Table from './table.js';
import { postTable } from '../api.js';

const columnTypes = ['string', 'number', 'factor'];

const tables = [];

function getTable(id) {
  return tables.find((table) => table.id === id);
}

function addTable(tableData) {
  tables.push(new Table(tableData));
  postTable(tableData);
}

function getTablesNamesAndIds() {
  return tables.map((table) => {
    return { id: table.id, name: table.name };
  });
}

export { getTable, addTable, getTablesNamesAndIds, columnTypes };
