const Sequelize = require('sequelize');
module.exports = new Sequelize('akaaflam', 'postgres', '12345', {
    host: 'localhost',
    dialect: 'postgres', // Change to your database type
});