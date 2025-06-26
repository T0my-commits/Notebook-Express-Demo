const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: 'postgres',
    logging: false,
  }
);

const Note = require('./note')(sequelize);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection establised with PostgreSQL database.');
    await sequelize.sync();
  } catch (error) {
    console.error('Error during connection to PostgreSQL database: ', error);
  }
})();

module.exports = { sequelize, Note };

