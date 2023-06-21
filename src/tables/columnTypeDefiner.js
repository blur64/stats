function getTypeOfColumn(columnItemExample) {
  if (!isNaN(+columnItemExample)) {
    return 'number';
  } else {
    return 'string';
  }
}

export { getTypeOfColumn };
