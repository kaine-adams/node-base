exports.up = function(knex, Promise) {
    return knex.schema.createTable('platform_users', function(table) {
      table.increments().primary();
      table.string('platform').notNullable();
      table.integer('account_id').notNullable();
      table.integer('external_id').notNullable();
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
  }
  
  exports.down = function(knex, Promise) {
    return knex.schema.dropTable('platform_users');
  }