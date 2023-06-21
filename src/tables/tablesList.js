import Table from './table.js';

const columnTypes = ['string', 'number', 'factor'];

let areTablesLoaded = false;
const tableLoadedStateSubs = [];

let tables = [];

function filterTableData(table) {
  return {
    name: table.name,
    headers: table.headers,
    rows: table.rows,
    id: table._id,
    columnTypes: table.columnTypes,
  };
}

function getTable(id) {
  return tables.find((table) => table.id === id);
}

function addTable(tableData) {
  tables.push(new Table(filterTableData(tableData)));
}

function getTablesNamesAndIds() {
  return tables.map((table) => {
    return { id: table.id, name: table.name };
  });
}

function addTables(tablesList) {
  tablesList.forEach((table) => addTable(table));
}

function subscribeToTablesLoadedState(callback) {
  tableLoadedStateSubs.push(callback);
}

function notifyTablesLoadedStateSubs() {
  areTablesLoaded = true;
  tableLoadedStateSubs.forEach((func) => func());
}

function updateTableRows(id, newRows) {
  getTable(id).setNewRows(newRows);
}

function getAllTables() {
  return tables;
}

function deleteTableFromList(tableId) {
  tables = tables.filter((table) => table.id !== tableId);
}

export {
  getTable,
  updateTableRows,
  addTable,
  getTablesNamesAndIds,
  columnTypes,
  addTables,
  areTablesLoaded,
  subscribeToTablesLoadedState,
  notifyTablesLoadedStateSubs,
  getAllTables,
  deleteTableFromList,
};
