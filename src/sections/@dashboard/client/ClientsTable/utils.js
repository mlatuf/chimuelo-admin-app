import { filter } from 'lodash';

export const applySortFilter = (array, comparator, query) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return filter(
      array,
      (_client) =>
        _client.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _client.lastname.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
};

export const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'score', label: 'Chimu puntos', alignRight: false },
  { id: '' },
];

export const ROWS_PER_PAGE = 10;
