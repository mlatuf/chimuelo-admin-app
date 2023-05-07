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
      (_product) =>
        _product.name.toLowerCase().indexOf(query.toLowerCase()) !== -1 ||
        _product.category.toLowerCase().indexOf(query.toLowerCase()) !== -1
    );
  }
  return stabilizedThis.map((el) => el[0]);
};

export const TABLE_HEAD = [
  { id: 'name', label: 'Nombre', alignRight: false },
  { id: 'price', label: 'Precio', alignRight: false },
  { id: 'category', label: 'Categoria', alignRight: false },
  { id: 'attributes', label: 'Atributos', alignRight: false },
  { id: 'stock', label: 'Stock', alignRight: false },
  { id: '' },
];

export const ROWS_PER_PAGE = 25;
