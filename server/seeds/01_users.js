const bcrypt = require('bcrypt');

const saltRounds = 10;

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  const pw_hash = await bcrypt.hash('password', saltRounds);
  // Deletes ALL existing entries
  await knex('items').del(); // items reference users, so clear them first
  await knex('users').del();
  await knex('users').insert([
    {
      first_name: 'John',
      last_name: 'Smith',
      username: 'jsmith',
      password: pw_hash,
    },
    {
      first_name: 'Bruce',
      last_name: 'Wayne',
      username: 'bwayne',
      password: pw_hash,
    },
    {
      first_name: 'Ash',
      last_name: 'Ketchum',
      username: 'aketchum',
      password: pw_hash,
    },
  ]);
};
