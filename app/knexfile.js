module.exports = {
    production: {
      client: 'mysql',
      connection: {
        host: process.env.DATABASE_MYSQL_HOSTNAME || 'localhost',
        port: process.env.DATABASE_MYSQL_PORT || '3306',
        user: process.env.DATABASE_MYSQL_USERNAME || 'root',
        password: process.env.DATABASE_MYSQL_PASSWORD || '',
        database: process.env.DATABASE_MYSQL_DATABASE || 'application',
      },
      pool: {
        min: process.env.DATABASE_POOL_MIN || 2,
        max: process.env.DATABASE_POOL_MAX || 7,
      },
      migrations: {
        directory: './db/migrations',
        tableName: 'knex_migrations',
      },
      seeds: {
        directory: './db/seeds',
      },
    },
  }