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
    console.log('Connexion PostgreSQL réussie.');
    await sequelize.sync();
  } catch (error) {
    console.error('Erreur connexion PostgreSQL :', error);
  }
})();

module.exports = { sequelize, Note };

