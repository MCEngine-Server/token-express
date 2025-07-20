const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

class SQLite {
  constructor() {
    this.db = new sqlite3.Database('./tokens.db');
    this.db.run(`CREATE TABLE IF NOT EXISTS token (
      token_id INTEGER PRIMARY KEY AUTOINCREMENT,
      token_value TEXT NOT NULL,
      token_time INTEGER NOT NULL
    )`);
  }

  async saveToken(token, time) {
    const hash = await bcrypt.hash(token, 10);
    this.db.run(`INSERT INTO token (token_value, token_time) VALUES (?, ?)`, [hash, time]);
  }

  async getAllTokens() {
    return this.allAsync(`SELECT * FROM token`);
  }

  async getToken(token) {
    const rows = await this.allAsync(`SELECT * FROM token`);
    for (let row of rows) {
      if (await bcrypt.compare(token, row.token_value)) {
        return row;
      }
    }
    return null;
  }

  deleteToken(token) {
    this.db.all(`SELECT * FROM token`, async (err, rows) => {
      for (let row of rows) {
        if (await bcrypt.compare(token, row.token_value)) {
          this.db.run(`DELETE FROM token WHERE token_id = ?`, [row.token_id]);
        }
      }
    });
  }

  async addToken(token, time) {
    return this.saveToken(token, time);
  }

  allAsync(query) {
    return new Promise((resolve, reject) => {
      this.db.all(query, [], (err, rows) => {
        if (err) reject(err);
        else resolve(rows);
      });
    });
  }
}

module.exports = SQLite;
