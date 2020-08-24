const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Employe = db.employes;
const multer = require('multer');



// creat operateurs
exports.createOp = (req, res)  => {
    // Save to database
    const url = req.protocol + "://" + req.get('host');
    console.log(url + "/images/" + req.file.filename);

    Employe.create({
        name: req.body.name,
        last_name: req.body.last_name,
        start_working_date: req.body.start_working_date,
        last_login_date: req.body.last_login_date,
        adress: req.body.adress,
        rfid :req.body.rfid,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age,
        status: req.body.status,
        matricule: req.body.matricule,
        email: req.body.email,
        job:'Operators',
        profile_image: url + "/images/" + req.file.filename,
    }).then(employe => {
        res.send({employe:employe});

    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// creat Superviseurs
exports.createSup = (req, res)  => {
    // Save to database
    const url = req.protocol + "://" + req.get('host');
    console.log(url + "/images/" + req.file.filename);

    Employe.create({
        name: req.body.name,
        last_name: req.body.last_name,
        start_working_date: req.body.start_working_date,
        last_login_date: req.body.last_login_date,
        adress: req.body.adress,
        rfid :req.body.rfid,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age,
        status: req.body.status,
        matricule: req.body.matricule,
        email: req.body.email,
        job:'Supervisors',
        profile_image: url + "/images/" + req.file.filename,
    }).then(employe => {
        res.send({employe:employe});

    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// creat Mechanics
exports.createMech = (req, res)  => {
    // Save to database
    const url = req.protocol + "://" + req.get('host');
    console.log(url + "/images/" + req.file.filename);

    Employe.create({
        name: req.body.name,
        last_name: req.body.last_name,
        start_working_date: req.body.start_working_date,
        last_login_date: req.body.last_login_date,
        adress: req.body.adress,
        rfid :req.body.rfid,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age,
        status: req.body.status,
        matricule: req.body.matricule,
        email: req.body.email,
        job:'Mechanics',
        profile_image: url + "/images/" + req.file.filename,
    }).then(employe => {
        res.send({employe:employe});

    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// creat electronics
exports.creatElec = (req, res)  => {
    // Save to database
    const url = req.protocol + "://" + req.get('host');
    console.log(url + "/images/" + req.file.filename);

    Employe.create({
        name: req.body.name,
        last_name: req.body.last_name,
        start_working_date: req.body.start_working_date,
        last_login_date: req.body.last_login_date,
        adress: req.body.adress,
        rfid :req.body.rfid,
        city: req.body.city,
        gender: req.body.gender,
        age: req.body.age,
        status: req.body.status,
        matricule: req.body.matricule,
        email: req.body.email,
        job:'Electronics',
        profile_image: url + "/images/" + req.file.filename,
    }).then(employe => {
        res.send({employe:employe});

    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// findall Operators
exports.findAllOp = (req, res) => {
    Employe.findAll({
        where: {job:'Operators'}
    }).then(employe => {
        res.send({employe:employe});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;



    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// findall Supervisors
exports.findAllSup = (req, res) => {
    Employe.findAll({
        where: {job:'Supervisors'}
    }).then(employe => {
        res.send({employe:employe});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;



    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// findall Mechanics
exports.findAllMech = (req, res) => {
    Employe.findAll({
        where: {job:'Mechanics'}
    }).then(employe => {
        res.send({employe:employe});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;



    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// findall Electronics
exports.findAllElc = (req, res) => {
    Employe.findAll({
        where: {job:'Electronics'}
    }).then(employe => {
        res.send({employe:employe});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;



    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// find article by ID
exports.findById = (req, res) => {
    Employe.findById(req.params.emp_id).then(emp => {
        res.send(emp);
    })
};

// delete employe with ID
exports.delete = (req, res) => {
    const id = req.params.emp_id;
    Employe.destroy({
        where:{emp_id: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a operation with id = ' + id);
    }).catch((err) =>{
        res.status(404).send('delete failed');
    });
};
