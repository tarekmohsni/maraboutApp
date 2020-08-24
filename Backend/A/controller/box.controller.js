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
        box_ip: req.body.box_ip,
        line_id:req.body.line_id,
        mach_id: req.body.mach_id
    }).then(box => {
        res.send({box:box});
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
    Box.findById(req.params.box_id).then(box => {
        res.send(box);
    })
};

// update box
exports.update = (req,res) =>{
    const id = req.params.box_id;
    Box.update({
            label: req.body.label,
            box_version: req.body.box_version,
            adress_mac: req.body.adress_mac,
            box_ip: req.body.box_ip,
            line_id:req.body.line_id,
            mach_id: req.body.mach_id
        },
        { where: {box_id: id} }
    ).then((box) => {
        res.send({box:box});
    });
};

// delete box with ID
exports.delete = (req, res) => {
    Box.destroy({
        where: {box_id: req.body.box_id }
    }).then(() => {
        res.send('ok');
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};
