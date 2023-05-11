/* eslint-disable no-console */

export const applySortFilter = (array, comparator, query) => {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });
  if (query) {
    return array.filter((_product) => _product.name.toLowerCase() === query.toLowerCase());
  }
  return stabilizedThis.map((el) => el[0]);
};

export const getAttributesToFilter = (products) => {
  const attributesArray = products.reduce((acc, obj) => {
    Object.entries(obj.attributes).forEach(([attribute, value]) => {
      const existingAttribute = acc.find((attr) => attr.label === attribute);
      if (existingAttribute) {
        if (!existingAttribute.options.includes(value)) {
          existingAttribute.options.push(value);
        }
      } else {
        acc.push({ label: attribute, options: [value] });
      }
    });
    return acc;
  }, []);
  return attributesArray;
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
