import { faker } from '@faker-js/faker';

// ----------------------------------------------------------------------

const clients = [...Array(24)].map((_, index) => ({
  id: faker.datatype.uuid(),
  avatarUrl: `/assets/images/avatars/avatar_${index + 1}.jpg`,
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phone: faker.phone.number(),
  instagram: faker.internet.userName(),
  address: {
    street: faker.address.streetName(),
    number: faker.address.streetAddress(),
    flat: faker.datatype.number({min: 1, max: 2000}),
    city: faker.address.cityName(),
  },
  points: faker.datatype.number({min: 0, max: 10}),
}));

export default clients;
