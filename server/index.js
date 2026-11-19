const express = require('express');
const app = express();
const port = 8080;
const cors = require('cors');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => res.status(200).json({ status: 'ok' }));

app.use('/users', require('./routes/users'));

app.listen(port, () => console.log(`Server listening on port ${port}`));

module.exports = app;
