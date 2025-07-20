const mysql = require('mysql2/promise');
const bcrypt = require('bcrypt');

class MySQL {
  constructor() {
    this.init();
  }

  async init() {
    this.pool = await mysql.createPool({
      host: process.env.MYSQL_HOST || 'localhost',
      user: process.env.MYSQL_USER || 'root',
      password: process.env.MYSQL_PASSWORD || '',
      database: process.env.MYSQL_DATABASE || 'tokens',
      port: process.env.MYSQL_PORT || 3306,
    });

    await this.pool.execute(`
      CREATE TABLE IF NOT EXISTS token (
        token_id INT AUTO_INCREMENT PRIMARY KEY,
        token_value TEXT NOT NULL,
        token_time INT NOT NULL
      )
    `);
  }

  async saveToken(token, time) {
    const hash = await bcrypt.hash(token, 10);
    await this.pool.execute(
      `INSERT INTO token (token_value, token_time) VALUES (?, ?)`,
      [hash, time]
    );
  }

  async getAllTokens() {
    const [rows] = await this.pool.execute(`SELECT * FROM token`);
    return rows;
  }

  async getToken(token) {
    const [rows] = await this.pool.execute(`SELECT * FROM token`);
    for (let row of rows) {
      if (await bcrypt.compare(token, row.token_value)) {
        return row;
      }
    }
    return null;
  }

  async deleteToken(token) {
    const [rows] = await this.pool.execute(`SELECT * FROM token`);
    for (let row of rows) {
      if (await bcrypt.compare(token, row.token_value)) {
        await this.pool.execute(`DELETE FROM token WHERE token_id = ?`, [row.token_id]);
        break;
      }
    }
  }

  async addToken(token, time) {
    return this.saveToken(token, time);
  }
}

module.exports = MySQL;
