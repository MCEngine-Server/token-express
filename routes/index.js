const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>MCEngine Token Server</title>
      <style>
        body {
          background-color: #121212;
          color: #ffffff;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          min-height: 100vh;
          margin: 0;
          padding: 20px;
        }
        h1 {
          text-align: center;
          font-size: 2.5rem;
          margin-bottom: 1rem;
        }
        p {
          max-width: 600px;
          text-align: center;
          font-size: 1.2rem;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <h1>MCEngine Token Server</h1>
      <p>This server is created to host tokens and provide a system for token management.</p>
    </body>
    </html>
  `);
});

module.exports = router;
