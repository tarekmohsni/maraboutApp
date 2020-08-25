const db = require("../config/db.config");
const Machine =db.machine;

// creat Machine

exports.create = (req,res) => {

    Machine.create({
        label: req.body.label,
        startworkDate: req.body.startworkDate,
        manufachinerlifeTime: req.body.manufachinerlifeTime,
        line_id: req.body.line_id,
        mach_type_id: req.body.mach_type_id
    }).then(machine => {
        if(req.body.operation_templatess){
            machine.setOperation_templates(req.body.operation_templatess);
        }
        res.send({machine:machine});
    }).catch(function (err) {
        console.log("create machine failed with error: " + err);
        return 0;
    });
};

// findall Machine
exports.findAll = (req, res) => {
    Machine.findAll().then(machine => {
        res.send({machine:machine});
    }).catch(function (err) {
        console.log("find machine failed with error: " + err);
        return 0;

    });
};

// find Machine by id

exports.findById = (req,res) =>{
    Machine.findByPk(req.params.mach_id).then(machine =>{
        if(!machine){
            return res.status(404).send({message:"machine not found with id" + req.params.mach_id});
        }
        res.send(machine);
    }).catch(err => {
        if(err.kind ==='ObjectId'){
            return res.status(404).send({
                message: "machine not found with id " + req.params.mach_id
            });

        }
        return res.status(500).send({
            message: "Error getting machine with id " + req.params.mach_id
        });
    });
};

// update Machine
exports.update = (req,res) =>{
    const id = req.params.mach_id;
    Machine.update({
            label: req.body.label,
            startworkDate: req.body.startworkDate,
            manufachinerlifeTime: req.body.manufachinerlifeTime,
            line_id: req.body.line_id,
            mach_type_id: req.body.mach_type_id
        },
        { where: {mach_id: req.params.mach_id} }
    ).then(() => {
        if(req.body.operation_templatess){
            machine.setOperation_templates(req.body.operation_templatess);
        }
        res.status(200).send("updated successfully a machine with id = " + id);
    });
};
//delete Machine
exports.delete = (req,res) =>{
    const id = req.params.mach_id;
    Machine.destroy({
        where:{mach_id: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a machine with id = ' + id);
    });
};
