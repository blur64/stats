const testTables = [
  {
    name: 'test 1',
    id: 1,
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
];

function fetchTables() {
  return Promise.resolve().then(() => testTables);
}

export { fetchTables };
