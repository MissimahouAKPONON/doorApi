module.exports = {
    HOST: "us-cdbr-iron-east-01.cleardb.net",
    USER: "bfe1c659da0754",
    PASSWORD: "2d4da2ca",
    DB: "heroku_44d75109700ef34",
    dialect: "mysql",
    reconnect: true,
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};