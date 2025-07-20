const express = require('express');
const router = express.Router();
const getDatabaseInstance = require('../db'); // path is correct
const db = getDatabaseInstance();

router.get('/list', async (req, res) => {
  try {
    const tokens = await db.getAllTokens();
    console.log('Tokens:', tokens);

    if (!tokens || tokens.length === 0) {
      return res.send(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>No Tokens</title>
          <style>
            body {
              background-color: #121212;
              color: #fff;
              font-family: sans-serif;
              padding: 2rem;
              text-align: center;
            }
          </style>
        </head>
        <body>
          <h1>No tokens found in the database.</h1>
        </body>
        </html>
      `);
    }

    const rowsHtml = tokens.map(t => `
      <tr>
        <td>${t.token_id}</td>
        <td><code>${t.token_value}</code></td>
        <td>${t.token_time}</td>
      </tr>
    `).join('');

    res.send(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Token List</title>
        <style>
          body {
            background-color: #121212;
            color: #fff;
            font-family: sans-serif;
            padding: 2rem;
          }
          h1 {
            text-align: center;
            margin-bottom: 2rem;
          }
          table {
            width: 100%;
            border-collapse: collapse;
          }
          th, td {
            padding: 10px;
            border: 1px solid #444;
            word-break: break-word;
          }
          th {
            background-color: #333;
          }
          code {
            background: #1e1e1e;
            padding: 2px 4px;
            border-radius: 4px;
            font-size: 0.9rem;
          }
        </style>
      </head>
      <body>
        <h1>All Tokens</h1>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Token (hashed)</th>
              <th>Time (s)</th>
            </tr>
          </thead>
          <tbody>
            ${rowsHtml}
          </tbody>
        </table>
      </body>
      </html>
    `);
  } catch (error) {
    console.error('Error fetching tokens:', error);
    res.status(500).send('Internal Server Error');
  }
});

module.exports = router;
