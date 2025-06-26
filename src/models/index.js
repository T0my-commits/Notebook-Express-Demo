const { Sequelize } = require('@sequelize/core');
const { PostgresDialect } = require('@sequelize/postgres');
const { SqliteDialect } = require('@sequelize/sqlite3');

let sequelize;

if (process.env.NODE_ENV === 'test') {
  // SQLite in-memory for tests
  sequelize = new Sequelize({
    dialect: SqliteDialect,
    storage: ':memory:',
    pool: { max: 1, idle: Infinity, maxUses: Infinity },
  });
} else {
  // Default to PostgreSQL
  sequelize = new Sequelize({
    dialect: PostgresDialect,
    database: process.env.DB_NAME,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    ssl: false,
    clientMinMessages: 'notice',
  });
}

const Note = require('./note')(sequelize);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection establised with database.');
    await sequelize.sync();
  } catch (error) {
    console.error('Error during connection to PostgreSQL database: ', error);
  }
})();

module.exports = { sequelize, Note };

