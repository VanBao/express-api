exports.up = function(knex) {
    return knex.schema
        .createTable('epl_users', function(table) {
            table.increments().primary()
            table.string('username', 255).notNullable()
            table.string('email', 255).notNullable()
            table.string('phone', 20).nullable()
            table.string('password', 255).notNullable()
            table.specificType('status', 'tinyint').unsigned().notNullable().defaultTo(0);
            table
                .specificType('account_verified', 'tinyint')
                .notNullable()
                .defaultTo(0)
            table.datetime ('created_at').nullable()
            table.datetime ('updated_at').nullable()
        })
        .createTable('epl_introductions', function(table) {
            table.increments().primary()
            table.string('title', 255).notNullable()
            table.text('content').nullable()
            table.string('image', 255).nullable()
            table.text('find_raw').nullable()
            table.specificType('status', 'tinyint').unsigned().notNullable().defaultTo(1);
            table.datetime ('created_at').nullable()
            table.datetime ('updated_at').nullable()
        })
        .createTable('epl_faqs', function(table) {
            table.increments().primary()
            table.string('title', 255).notNullable()
            table.text('content').nullable()
            table.text('find_raw').nullable()
            table.specificType('status', 'tinyint').unsigned().notNullable().defaultTo(1);
            table.datetime ('created_at').nullable()
            table.datetime ('updated_at').nullable()
        })
        .createTable('epl_support_requests', function(table) {
            table.increments().primary()
            table.string('name', 255).notNullable()
            table.string('email', 255).notNullable()
            table.string('phone', 20).notNullable()
            table.text('content').nullable()
            table.text('find_raw').nullable()
            table.specificType('status', 'tinyint').unsigned().notNullable().defaultTo(1);
            table.datetime ('created_at').nullable()
            table.datetime ('updated_at').nullable()
        })
}

exports.down = function(knex) {
    return knex.schema.dropTable('user').dropTable('introduction').dropTable('faq').dropTable('support_request')
}