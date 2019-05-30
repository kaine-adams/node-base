const config = require('config');

module.exports = require('knex')({
    client: 'mysql',
    connection: {
        multipleStatements: true,
        host: config.database.mysql.hostname,
        port: config.database.mysql.port,
        user: config.database.mysql.username,
        password: config.database.mysql.password,
        database: config.database.mysql.database,
        pool: { min: 6, max: 60 },
        useNullAsDefault: true
    }
});