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
    let doors=[];
    let scenas=[];


    DoorToDoor.findAll().then((datas) => {
        // res.send({datas: datas});
        doors = datas;
        doors.forEach((elt)=>{
            Scenario.findAll({
                where: {
                    doorToDoorId: elt.id
                }
            }).then((result) => {
                // tabs = result
                scenas = result;
                elt.schenarios=scenas;
                res.send({datas: doors});
            });
        });





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

