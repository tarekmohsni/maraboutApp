const env = {
    database: 'testdb',
    username: 'postgres',
    password: '1234',
    host: '127.0.0.1',
    port:'5432',
    dialect: 'postgres',
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};

module.exports = env;
