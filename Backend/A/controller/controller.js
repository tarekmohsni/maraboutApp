const db = require('../config/db.config.js');
const config = require('../config/config.js');
const User = db.user;
const Role = db.role;

const Op = db.Sequelize.Op;

var jwt = require('jsonwebtoken');
var bcrypt = require('bcrypt');

exports.signup = (req, res) => {
    // Save User to Database
    console.log("Processing func -> SignUp");

    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        profile_id: req.body.profile_id,
        password: bcrypt.hashSync('marabout', 8),

    }).then(user => {
        Role.findAll({
            where: {
                name: {
                    [Op.or]: req.body.roles
                }
            }
        }).then(roles => {
            user.setRoles(roles).then(() => {

                res.send("User registered successfully!");
            });
        }).catch(err => {
            res.status(500).send("Error -> " + err);
        });
    }).catch(err => {
        res.status(500).send("Fail! Error -> " + err);
    })
}

exports.signin = (req, res) => {
    console.log("Sign-In");

    User.findOne({
        where: {
            email: req.body.email,

        },

    }).then(user => {
        if (!user) {
            return res.status(404).send('User Not Found.');
        }
        console.log(user);
        db.profiles.findAll({
            include: [{
                model: db.permissions,
            }],
            where: {
                profile_id: user.profile_id,
            }
        }).then(function (profile) {
            console.log('ftrggf',profile);
            user.permissions = [];
            profile.forEach(prof => {
                prof.permissions.forEach(function (perm, i) {


                user.permissions.push(prof.permissions[i].label);
                console.log('ftrggf', prof.permissions[i].label)
                })
            });

            var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);
        if (!passwordIsValid) {
            return res.status(401).send({auth: false, accessToken: null, reason: "Invalid Password!"});
        }



            var token = jwt.sign({id: user.id, permissions: user.permissions}, config.secret, {
                expiresIn: 86400 // expires in 24 hours
            });

            res.status(200).send({auth: true, accessToken: token});

        }).catch(err => {
            res.status(500).send('Error -> ' + err);
        });
    })
}

exports.userContent = (req, res) => {
    User.findOne({
        where: {id: req.userId},
        attributes: ['name', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "User Content Page",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access User Page",
            "error": err
        });
    })
}

exports.adminBoard = (req, res) => {
    User.findOne({
        where: {id: req.userId},
        attributes: ['name', 'username', 'email'],
        include: [{
            model: Role,
            attributes: ['id', 'name'],
            through: {
                attributes: ['userId', 'roleId'],
            }
        }]
    }).then(user => {
        res.status(200).json({
            "description": "Admin Board",
            "user": user
        });
    }).catch(err => {
        res.status(500).json({
            "description": "Can not access Admin Board",
            "error": err
        });
    })
}

// find All user
exports.findAll = (req, res) =>{
    User.findAll().then(user => {
        res.send(user) ;
    }).catch(function (err) {
        console.log("findall failed with err :"+err);
        return null;

    });
}
// find user by ID
exports.findOne = (req, res) => {
    const id = req.params.id;

    User.findByPk(id)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message: "Error retrieving Tutorial with id=" + id
            });
        });
};
// Create a User

exports.create = (req, res,next) => {
    // Save to my database
    User.create({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: bcrypt.hashSync('marabout', 8)
    }).then(user => {
        res.send(user);
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;
    });
};

// Delete a User based on Id

exports.delete = (req, res) => {
    User.destroy({
        where: {id: req.body.id }
    }).then(() => {
        res.send('ok');
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};
