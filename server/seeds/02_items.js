const { faker } = require('@faker-js/faker');

const maxQuantity = 200;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex('items').del();

  const users = await knex('users').select('id');
  const userIds = users.map((user) => user.id);

  const items = Array.from({ length: maxQuantity }, () => ({
    user_id: faker.helpers.arrayElement(userIds),
    item_name: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    quantity: faker.number.int({ min: 0, max: 500 }),
  }));

  await knex('items').insert(items);
};
