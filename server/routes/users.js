const express = require('express');
const bcrypt = require('bcrypt');
const knex = require('knex')(require('../knexfile.js')['development']);
const router = express.Router();

const saltRounds = 10;

router.get('/', (req, res) => {
  const { username, id } = req.query;
  const query = knex('users').select('*');

  if (username) {
    query.where('username', 'ilike', username);
  }
  if (id) {
    query.where('id', id);
  }
  query
    .then((data) => res.status(200).json(data))
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.get('/:id', (req, res) => {
  const { id } = req.params;

  knex('users')
    .select('*')
    .where('id', id)
    .first()
    .then((users) => {
      if (!users) {
        return res.status(404).json({ error: 'user not found' });
      }
      res.status(200).json(users);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.post('/', (req, res) => {
  const { first_name, last_name, username, password } = req.body;
  if (!username || !password || !first_name || !last_name) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  knex('users')
    .select('id')
    .where('username', 'ilike', username)
    .first()
    .then((existing) => {
      if (existing) {
        return res.status(409).json({ error: 'username already exists' });
      }

      return bcrypt
        .hash(password, saltRounds)
        .then((hashedPassword) =>
          knex('users')
            .insert({
              first_name,
              last_name,
              username,
              password: hashedPassword,
            })
            .returning(['id', 'first_name', 'last_name', 'username']),
        )
        .then((rows) => res.status(201).json(rows[0]));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
