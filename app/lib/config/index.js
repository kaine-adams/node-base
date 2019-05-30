var config = {};

config.bcrypt = {
    factor: parseInt(process.env.BCRYPT_FACTOR) || 10,
}

config.passport = {
    session_secret: process.env.SESSION_SECRET || 'DWqi5xAC8yHDWGby1tYBkmKGUQEb7V6s',
}

config.server = {
    port: process.env.NODE_PORT || 3000,
};

config.database = {};

config.database.mysql = {
    hostname: process.env.DATABASE_MYSQL_HOSTNAME || 'localhost',
    port: process.env.DATABASE_MYSQL_PORT || '3306',
    username: process.env.DATABASE_MYSQL_USERNAME || 'root',
    password: process.env.DATABASE_MYSQL_PASSWORD || '',
    database: process.env.DATABASE_MYSQL_DATABASE || 'application',
};

module.exports = config;