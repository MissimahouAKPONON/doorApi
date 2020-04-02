const db = require("../models");
const config = require("../config/auth.config");
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");


exports.signin = (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
        .then(user => {
            if (!user) {
                return res.status(404).send({message: "User Not found."});
            }

            var passwordIsValid = bcrypt.compareSync(
                req.body.password,
                user.password
            );

            if (!passwordIsValid) {
                return res.status(401).send({
                    token: null,
                    message: "Invalid Password!"
                });
            }

            var token = jwt.sign({id: user.id}, config.secret, {
                expiresIn: 86400 // 24 hours
            });

            var authorities = [];
            user.getRoles().then(roles => {
                for (let i = 0; i < roles.length; i++) {
                    authorities.push("ROLE_" + roles[i].name.toUpperCase());
                }
                res.status(200).send({
                    // id: user.id,
                    username: user.username,
                    email: user.email,
                    roles: authorities,
                    token: token
                });
            });
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};


exports.signup = (req, res) => {
    // Save User to Database


    User.create({
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync(req.body.password, 8)
    })
        .then(user => {
            if (req.body.roles) {
                Role.findAll({
                    where: {
                        name: {
                            [Op.or]: req.body.roles
                        }
                    }
                }).then(roles => {
                    user.setRoles(roles).then(() => {
                        this.signin(req, res);
                    });
                });
            } else {
                // user role = 1
                user.setRoles([1]).then(() => {
                    this.signin(req, res);
                });
            }
        })
        .catch(err => {
            res.status(500).send({message: err.message});
        });
};


///////////////////////