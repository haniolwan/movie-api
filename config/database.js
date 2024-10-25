const Sequelize = require('sequelize');

module.exports = new Sequelize('postgres', 'postgres.ankxehgmbdwxayrayzem', 'zbcQpwW8P#LC9$x', {
    host: 'aws-0-eu-central-1.pooler.supabase.com',
    port: 6543,
    dialect: 'postgres',
});

// module.exports = new Sequelize('akaaflam', 'postgres', '12345', {
//     host: 'localhost',
//     dialect: 'postgres', // Change to your database type
// });