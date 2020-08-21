const db = require("../config/db.config");
const Machine =db.machine;

// creat Machine

exports.create = (req,res) => {

    Machine.create({
        label: req.body.label,
        startworkDate: req.body.startworkDate,
        manufachinerlifeTime: req.body.manufachinerlifeTime,
        operation: req.body.operation,
    }).then(machine => {
        res.send(machine);
    }).catch(function (err) {
        console.log("create machine failed with error: " + err);
        return 0;
    });
};

// findall Machine
exports.findAll = (req, res) => {
    Machine.findAll().then(machine => {
        res.send(machine);
    }).catch(function (err) {
        console.log("find machine failed with error: " + err);
        return 0;

    });
};

// find Machine by id

exports.findById = (req,res) =>{
    Machine.findByPk(req.params.id_mach).then(machine =>{
        if(!machine){
            return res.status(404).send({message:"machine not found with id" + req.params.id_mach});
        }
        res.send(machine);
    }).catch(err => {
        if(err.kind ==='ObjectId'){
            return res.status(404).send({
                message: "machine not found with id " + req.params.id_mach
            });

        }
        return res.status(500).send({
            message: "Error getting machine with id " + req.params.id_mach
        });
    });
};

// update Machine
exports.update = (req,res) =>{
    const id = req.params.id_mach;
    Machine.update({
            label: req.body.label,
            startworkDate: req.body.startworkDate,
            manufachinerlifeTime: req.body.manufachinerlifeTime,
            operation: req.body.operation,
        },
        { where: {id_mach: req.params.id_mach} }
    ).then(() => {
        res.status(200).send("updated successfully a machine with id = " + id);
    });
};
//delete Machine
exports.delete = (req,res) =>{
    const id = req.params.id_mach;
    Machine.destroy({
        where:{id_mach: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a machine with id = ' + id);
    });
};
