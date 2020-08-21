const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Box = db.box;

// creat box
exports.create = (req, res) => {
    // Save to database
    Box.create({
        label: req.body.label,
        box_version: req.body.box_version,
        adress_mac: req.body.adress_mac,
        box_ip: req.body.box_ip
    }).then(box => {
        res.send(box);
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// findall box
exports.findAll = (req, res) => {
    Box.findAll().then(box => {

        res.send(box);
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// find box by ID
exports.findById = (req, res) => {
    Box.findById(req.params.article_id).then(box => {
        res.send(box);
    })
};

// delete box with ID
exports.delete = (req, res) => {
    Box.destroy({
        where: {id: req.body.article_id }
    }).then(() => {
        res.send('ok');
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};
