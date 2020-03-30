module.exports = (sequelize, Sequelize) => {
    const DoorToDoor = sequelize.define("doorToDoors", {
        title: {
            type: Sequelize.STRING,
        }
    });

    return DoorToDoor;
};