const db = require("../models");
const config = require("../config/auth.config");
const Scenario = db.scenario;
const DoorToDoor = db.door;

const Op = db.Sequelize.Op;
exports.createScenario = (req, res) => {
    // res.send({ messageT: req.body });
    if (req.body.scenarios){
    for (let scenario of req.body.scenarios) {
         scenario;
        Scenario.create({
            request: scenario.request,
            answer: scenario.answer,
            placeholder: scenario.placeholder
        })
            .then(scenarii => {
                DoorToDoor.create({
                    title: req.body.title
                }).then(door => {
                    // res.send({ message: door });
                    scenarii.setDoorToDoor(door).then(() =>{
                        res.send({ message: "Save successfully!" });
                    });
                })
                    .catch(err=> {});
            })
            .catch(err => {
                res.status(500).send({ message: err.message });
            });
    }
    } else {
        DoorToDoor.create({
            title: req.body.title
        }).then(door => {

                res.send({ message: "Save successfully!" });

        })
            .catch(err=> {
                res.status(500).send({ message: err.message });
            });
    }
};

exports.getAllScenario = (req, res) => {
    DoorToDoor.findAll({
        include:[{
            model: Scenario,
            where: { doorToDoorId: db.Sequelize.col('doorToDoors.id') }
        }]
    }).then((datas) => {
            res.status(200).send(datas);
    }).catch((error) => {
        res.send({datas: error});
    });

    // DoorToDoor.findById(1
    //     ,{
    //     include:[{
    //         model: Scenario,
    //         where: { doorToDoorId: db.Sequelize.col('doorToDoors.id') }
    //     }]
    // }
    // ).then((result) => {
    //         res.status(200).send(result);
    // }).catch((error) => {
    //     res.status(401).send({error: error});
    // });

};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.getPorteById = (req, res) => {

    var id = 0;
    id = parseInt(req.params.id);
// res.status(200).send(id);
    DoorToDoor.findOne(1
        ,{
        include:[{
            model: Scenario,
            where: { doorToDoorId: db.Sequelize.col('doorToDoors.id') }
        }]
    }
    ).then((result) => {
            res.status(200).send(result);
    }).catch((error) => {
        res.status(404).send({error: error});
    });
};


exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

