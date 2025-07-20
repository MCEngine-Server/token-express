const express = require('express');
const router = express.Router();
const crypto = require('crypto');

// GET /add-token
router.get('/', (req, res) => {
  const token = crypto.randomBytes(2048).toString('hex'); // 4096-character hex token

  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <title>Add Token</title>
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
          margin-bottom: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          gap: 10px;
          width: 100%;
          max-width: 400px;
        }
        input, button {
          padding: 10px;
          border: none;
          border-radius: 5px;
          font-size: 1rem;
        }
        input {
          background-color: #1e1e1e;
          color: #ffffff;
        }
        button {
          background-color: #007bff;
          color: white;
          cursor: pointer;
        }
        button:hover {
          background-color: #0056b3;
        }
        label {
          font-size: 1rem;
        }
        .floating-token {
          position: fixed;
          top: 20px;
          right: 20px;
          background: #222;
          padding: 15px 20px;
          border-radius: 10px;
          font-family: monospace;
          font-size: 0.8rem;
          max-height: 250px;
          width: 300px;
          overflow: auto;
          white-space: pre-wrap;
          word-break: break-word;
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
          cursor: pointer;
        }
        .copied {
          background: #28a745 !important;
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="floating-token" id="tokenBox" title="Click to copy">${token}</div>

      <h1>Create a Token</h1>
      <form id="tokenForm" method="POST" action="/add-token">
        <input type="hidden" name="token" value="${token}" />
        <label for="time">Time (in seconds):</label>
        <input type="number" name="time" id="time" min="1" required placeholder="Enter time in seconds" />
        <label for="email">Email:</label>
        <input type="email" name="email" id="email" required placeholder="Enter your email" />
        <button type="submit">Submit Token</button>
      </form>

      <script>
        const tokenBox = document.getElementById('tokenBox');
        tokenBox.addEventListener('click', () => {
          navigator.clipboard.writeText(tokenBox.textContent).then(() => {
            tokenBox.classList.add('copied');
            tokenBox.textContent = 'Copied!';
            setTimeout(() => {
              tokenBox.classList.remove('copied');
              tokenBox.textContent = '${token}';
            }, 1500);
          });
        });
      </script>
    </body>
    </html>
  `);
});

// POST /add-token
router.post('/', (req, res) => {
  const { token, time } = req.body;

  if (!token || !time) {
    return res.status(400).send('Missing token or time');
  }

  // TODO: Save token logic here
  console.log('Token received:', { token, time });

  // Redirect after saving
  res.redirect('/add-token');
});

module.exports = router;
