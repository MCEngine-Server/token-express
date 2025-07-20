const { Pool } = require('pg');
const bcrypt = require('bcrypt');

class PostgreSQL {
  constructor() {
    this.pool = new Pool({
      user: process.env.PG_USER || 'postgres',
      host: process.env.PG_HOST || 'localhost',
      database: process.env.PG_DATABASE || 'tokens',
      password: process.env.PG_PASSWORD || 'password',
      port: process.env.PG_PORT || 5432,
    });

    this.pool.query(`
      CREATE TABLE IF NOT EXISTS token (
        token_id SERIAL PRIMARY KEY,
        token_value TEXT NOT NULL,
        token_time INTEGER NOT NULL
      )
    `);
  }

  async saveToken(token, time) {
    const hash = await bcrypt.hash(token, 10);
    await this.pool.query(
      `INSERT INTO token (token_value, token_time) VALUES ($1, $2)`,
      [hash, time]
    );
  }

  async getAllTokens() {
    const res = await this.pool.query(`SELECT * FROM token`);
    return res.rows;
  }

  async getToken(token) {
    const res = await this.pool.query(`SELECT * FROM token`);
    for (let row of res.rows) {
      if (await bcrypt.compare(token, row.token_value)) {
        return row;
      }
    }
    return null;
  }

  async deleteToken(token) {
    const res = await this.pool.query(`SELECT * FROM token`);
    for (let row of res.rows) {
      if (await bcrypt.compare(token, row.token_value)) {
        await this.pool.query(`DELETE FROM token WHERE token_id = $1`, [row.token_id]);
        break;
      }
    }
  }

  async addToken(token, time) {
    return this.saveToken(token, time);
  }
}

module.exports = PostgreSQL;
