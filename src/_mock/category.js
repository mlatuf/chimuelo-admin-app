import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const categories = [...Array(24)].map((_, index) => ({
  id: index,
  name: faker.commerce.department(),
  parentId: faker.datatype.boolean() ? faker.datatype.number({ min: 0, max: 24 }) : null,
}));

export default categories;
