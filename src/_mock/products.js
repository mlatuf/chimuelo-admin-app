import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const products = [...Array(24)].map((_, index) => {
  const setIndex = index + 1;

  return {
    id: faker.datatype.uuid(),
    cover: `/assets/images/products/product_${setIndex}.jpg`,
    name: faker.commerce.productName(),
    price: faker.commerce.price(),
    category: faker.commerce.department(),
  };
});

export default products;
