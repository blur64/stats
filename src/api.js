const API_URL = 'http://localhost:8081/api';

function deleteTableRequest(tableId) {
  return fetch(`${API_URL}/tables/${tableId}`, { method: 'DELETE' }).then(
    (rawResponse) => rawResponse.json()
  );
}

function sendRequestToTableUpdate({ tableId, newTableRows }) {
  const jsonStringifiedTableRows = JSON.stringify({ rows: newTableRows });
  return fetch(`${API_URL}/tables/${tableId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonStringifiedTableRows,
  }).then((rawResponse) => rawResponse.json());
}

function postNewTable(tableData) {
  const jsonStringifiedTableData = JSON.stringify(tableData);
  return fetch(`${API_URL}/tables`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonStringifiedTableData,
  }).then((rawResponse) => rawResponse.json());
}

function sendRequestToUserLogin({ name, password }) {
  return fetch(`${API_URL}/users?name=${name}&password=${password}`)
    .then((rawResponse) => rawResponse.json())
    .then((response) => response);
}

function sendRequestToUserRegistration({ name, password }) {
  const jsonStringifiedUserData = JSON.stringify({ name, password });
  return fetch(`${API_URL}/users`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonStringifiedUserData,
  })
    .then((rawResponse) => rawResponse.json())
    .then((response) => (response.errorMessage ? false : true));
}

function fetchUserTables(userId) {
  return fetch(`${API_URL}/tables/${userId}`).then((rawResponse) =>
    rawResponse.json()
  );
}

function renameTableRequest(tableId, newName) {
  const jsonStringifiedNewTableName = JSON.stringify({ name: newName });
  return fetch(`${API_URL}/tables/rename/${tableId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonStringifiedNewTableName,
  }).then((rawResponse) => rawResponse.json());
}

function sendRequestToChangeColumnTypes(tableId, newColumnTypes) {
  const jsonStringifiedNewColumnTypes = JSON.stringify({
    newColumnTypes: newColumnTypes,
  });
  return fetch(`${API_URL}/tables/types/${tableId}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: jsonStringifiedNewColumnTypes,
  }).then((rawResponse) => rawResponse.json());
}

export {
  postNewTable,
  sendRequestToUserRegistration,
  sendRequestToUserLogin,
  fetchUserTables,
  sendRequestToTableUpdate,
  deleteTableRequest,
  renameTableRequest,
  sendRequestToChangeColumnTypes,
};
