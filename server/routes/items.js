const express = require('express');
const knex = require('knex')(require('../knexfile.js')['development']);
const router = express.Router();

router.get('/', (req, res) => {
  const { item_name, id } = req.query;
  const query = knex('items').select('*');

  if (item_name) {
    query.where('item_name', 'ilike', item_name);
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

  knex('items')
    .select('*')
    .where('id', id)
    .first()
    .then((items) => {
      if (!items) {
        return res.status(404).json({ error: 'item not found' });
      }
      res.status(200).json(items);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.get('/name/:item_name', (req, res) => {
  const { item_name } = req.params;

  knex('items')
    .select('*')
    .where('item_name', 'ilike', item_name)
    .first()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'item not found' });
      }
      res.status(200).json(item);
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  knex('items')
    .where('id', id)
    .del()
    .then((deletedCount) => {
      if (!deletedCount) {
        return res.status(404).json({ error: 'item not found' });
      }
      res.status(204).end();
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.post('/', (req, res) => {
  const { user_id, item_name, description, quantity } = req.body;
  if (!user_id || !item_name || !description || quantity == 1) {
    return res.status(400).json({ error: 'Please fill in all fields' });
  }

  knex('users')
    .select('id')
    .where('id', user_id)
    .first()
    .then((user) => {
      if (!user) {
        return res
          .status(400)
          .json({ error: 'user_id does not match an existing user' });
      }

      return knex('items')
        .select('id')
        .where('item_name', 'ilike', item_name)
        .first()
        .then((existing) => {
          if (existing) {
            return res.status(409).json({ error: 'item already exists' });
          }

          return knex('items')
            .insert({
              user_id,
              item_name,
              description,
              quantity,
            })
            .returning([
              'id',
              'user_id',
              'item_name',
              'description',
              'quantity',
            ])
            .then((rows) => res.status(201).json(rows[0]));
        });
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const { item_name, description, quantity } = req.body;
  if (
    item_name === undefined &&
    description === undefined &&
    quantity === undefined
  ) {
    return res.status(400).json({ error: 'No fields to update' });
  }

  knex('items')
    .select('id')
    .where('id', id)
    .first()
    .then((item) => {
      if (!item) {
        return res.status(404).json({ error: 'item not found' });
      }

      return knex('items')
        .where('id', id)
        .update({ item_name, description, quantity })
        .returning('*')
        .then((rows) => res.status(200).json(rows[0]));
    })
    .catch((error) => res.status(500).json({ error: error.message }));
});

module.exports = router;
