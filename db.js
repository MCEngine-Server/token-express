const dotenv = require('dotenv');
dotenv.config();

function getDatabaseInstance() {
  const dbType = (process.env.DB_TYPE || '').toLowerCase();

  switch (dbType) {
    case 'sqlite':
      return new (require('./models/database/SQLite'))();
    case 'postgresql':
      return new (require('./models/database/PostgreSQL'))();
    case 'mysql':
      return new (require('./models/database/MySQL'))();
    default:
      throw new Error(`Unsupported DB_TYPE: ${process.env.DB_TYPE}`);
  }
}

module.exports = getDatabaseInstance;
