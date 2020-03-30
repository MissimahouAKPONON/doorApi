module.exports = (sequelize, Sequelize) => {
    const Scenario = sequelize.define("scenarios", {
        request: {
            type: Sequelize.STRING,
        },
        answer: {
            type: Sequelize.STRING,
        },
        placeholder: {
            type: Sequelize.STRING,
        }
    });

    return Scenario;
};