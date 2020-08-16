module.exports = {
    development: {
        client: 'mysql',
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "wallet",
            charset: 'utf8',
            port: 3306,
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                },
                "enableArithAbort": true
            }
        },
        migrations: {
            directory: __dirname + '/db/migrations',
        },
        seeds: {
            directory: __dirname + '/db/seeds',
        },
    },

    staging: {
        client: 'postgresql',
        connection: {
            database: 'my_db',
            user: 'username',
            password: 'password',
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },

    production: {
        client: 'mysql',
        connection: {
            host: "127.0.0.1",
            user: "root",
            password: "",
            database: "wallet",
            charset: 'utf8',
            port: 3306,
            options: {
                cryptoCredentialsDetails: {
                    minVersion: 'TLSv1'
                },
                "enableArithAbort": true
            }
        },
        pool: {
            min: 2,
            max: 10,
        },
        migrations: {
            tableName: 'knex_migrations',
        },
    },
};