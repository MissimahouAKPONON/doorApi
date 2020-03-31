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
            answer: scenario.answers,
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
    DoorToDoor.findAll().then((datas) => {
        res.send({datas: datas});
// let tabs;
//         for (let data of datas){
//
//             Scenario.findAll({
//                 where: {
//                     doorToDoorId: data.id
//                 }
//             }).then((result) => {
//                 tabs = result
//                 res.send({datas: tabs});
//
//             });
//
//         }

    }).catch((error) => {
        res.send({datas: error});
    });

};

exports.userBoard = (req, res) => {
    res.status(200).send("User Content.");
};

exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content.");
};

