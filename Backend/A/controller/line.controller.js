const db = require('../config/db.config.js');
const Line =db.line;

// creat line
exports.create = (req, res) => {
    Line.create({
            label: req.body.label,
            description: req.body.description,
        site_id: req.body.site_id
    }).then(line => {
        res.send({line:line});
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};
// findall line
exports.findAll = (req, res) => {
    Line.findAll().then(line => {
        res.send({line:line});
    }).catch(function (err) {
        console.log("find Machine_type failed with error: " + err);
        return 0;

    });
};

// find line by id

exports.findById = (req,res) =>{
    Line.findByPk(req.params.line_id).then(line =>{
        if(!line){
            return res.status(404).send({message:"Machine_type not found with id" + req.params.line_id});
        }
        res.send(line);
    }).catch(err => {
        if(err.kind ==='ObjectId'){
            return res.status(404).send({
                message: "Machine_type not found with id " + req.params.line_id
            });

        }
        return res.status(500).send({
            message: "Error getting Machine_type with id " + req.params.line_id
        });
    });
};

// update line
exports.update = (req,res) =>{
    const id = req.params.line_id;
    Line.update({
            type: req.body.type,
            description: req.body.description,
        },
        { where: {line_id: id} }
    ).then((line) => {
        res.send({line:line});
    });
};

//delete line
exports.delete = (req,res) =>{
    const id = req.params.line_id;
    Line.destroy({
        where:{line_id: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a machine type with id = ' + id);
    });
};

