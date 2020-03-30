module.exports = {
    HOST: "us-cdbr-iron-east-01.cleardb.net",
    USER: "b4a4ac07f3c41d",
    PASSWORD: "16d852b0",
    DB: "heroku_b90c760c438ca00",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    }
};