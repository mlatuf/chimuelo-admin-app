/* eslint-disable no-console */
/* eslint-disable no-debugger */
/* eslint-disable no-prototype-builtins */

// Mapping of original property names to translated property names
const translationMap = {
  Nombre: 'name',
  Stock: 'stock',
  SKU: 'sku',
  Precio: 'price',
  'Precio oferta': 'offerPrice',
  Categorías: 'categories',
  Peso: 'weigth',
  Alto: 'height',
  Ancho: 'width',
  Profundidad: 'depth',
  'Mostrar en tienda': 'showInStores',
  IDProduct: 'idEmpretienda',
};

// Function to recursively translate property names
const translateProperties = (obj) => {
  const translatedObj = {};

  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const translatedKey = translationMap[key] || key;

      if (typeof obj[key] === 'object' && obj[key] !== null) {
        translatedObj[translatedKey] = translateProperties(obj[key], translationMap[key] || {});
      } else {
        translatedObj[translatedKey] = obj[key];
      }
    }
  }

  return translatedObj;
};

const addAttributesToArray = (inputJson) => {
  const attributes = [];

  const attributesKeys = Object.keys(inputJson).filter((key) => key.includes('atributo'));

  for (let i = 1; i <= attributesKeys.length / 2; i++) {
    const nameKey = `Nombre atributo ${i}`;
    const valueKey = `Valor atributo ${i}`;

    const attributeName = inputJson[nameKey];
    const attributeValue = inputJson[valueKey];

    if (attributeName !== '' || attributeValue !== '') {
      attributes.push({
        name: attributeName,
        value: attributeValue,
      });

      delete inputJson.nameKey;
      delete inputJson.valueKey;
    }
  }

  return {
    attributes,
    ...inputJson,
  };
};

const groupProductsBy = (arr, property) => {
  return arr.reduce((acc, obj) => {
    const key = obj[property];
    if (!acc[key]) {
      acc[key] = [];
    }
    acc[key].push(obj);
    return acc;
  }, {});
};

const transformedProductsData = (productsJson) => {
  productsJson.forEach((product) => addAttributesToArray(product));
  console.log(productsJson);
  // const groupedProducts = groupProductsBy(productsJson, 'IDProduct');
  return translateProperties(productsJson);
};

export { translateProperties, addAttributesToArray, groupProductsBy, transformedProductsData };
