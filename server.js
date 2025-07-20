const express = require('express');
const bodyParser = require('body-parser');
const addTokenPage = require('./routes/add-token');
const listRoute = require('./routes/list');
const rootRoute = require('./routes/index');
const tokenRoute = require('./routes/token');

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true })); // needed for form submissions

// Routes
app.use('/', rootRoute);
app.use('/token', tokenRoute);
app.use('/add-token', addTokenPage);
app.use('/list', listRoute);

// Fallback
app.use((req, res) => {
  res.redirect('/');
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
