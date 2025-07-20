class User {
  constructor(db) {
    this.db = db;
  }

  async saveToken(token, time) {
    return this.db.saveToken(token, time);
  }

  async getToken(token) {
    return this.db.getToken(token);
  }

  async deleteToken(token) {
    return this.db.deleteToken(token);
  }

  async addToken(token, time) {
    return this.db.addToken(token, time);
  }
}

module.exports = User;
