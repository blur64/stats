const testTables = [
  {
    name: 'test 1',
    id: 1,
    headers: ['header1123', 'header2', 'header3'],
    rows: [
      [123, 'val2', 'val3'],
      [32, 'val2', 'val3'],
      [412, 'val2', 'val3'],
      [2, 'val2', 'val3'],
      [5, 'val2', 'val3'],
    ],
  },
  {
    name: 'test 2',
    id: 2,
    headers: ['header1', 'header2', 'header3'],
    rows: [
      ['val1', 'val2', 'val3'],
      ['val1', 'val2', 'val3'],
      ['val1', 'val2', 'val3'],
      ['val1', 'val2', 'val3'],
      ['val1', 'val2', 'val3'],
    ],
  },
  {
    name: 'test 3',
    id: 3,
    headers: ['string', 'factor', 'number'],
    rows: [
      ['val1', 'AB', 123],
      ['sdf', 'AB', 0],
      ['serget', 'CO', -53],
      ['maxin', 'AB', -832],
      ['asdma', 'GA', 3],
    ],
  },
];

function fetchTables() {
  return Promise.resolve().then(() => testTables);
}

function postTable() {
  return;
}

export { fetchTables, postTable };
