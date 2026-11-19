// Update with your config settings.

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  development: {
    client: 'pg',
    connection: process.env.DATABASE_URL || {
      host: '127.0.0.1',
      password: 'docker',
      user: 'postgres',
      port: 5432,
      database: 'z-prefix',
    },
  },
};
