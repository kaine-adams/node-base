exports.up = function(knex, Promise) {
    return knex.schema.createTable('accounts', function(table) {
      table.increments().primary();
      table.string('username').notNullable();
      table.string('password');
      table.string('email');
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('accounts');
  }

