const db = require("../config/db.config");
const Machine_type =db.machine_type;

// creat Machine_type

exports.create = (req,res) => {

    Machine_type.create({
        type: req.body.type,
        description: req.body.description,

    }).then(machine_type => {
        res.send({machine_type:machine_type});
    }).catch(function (err) {
        console.log("create Machine_type failed with error: " + err);
        return 0;
    });
};

// findall Machine_type
exports.findAll = (req, res) => {
    Machine_type.findAll().then(machine_type => {
        res.send({machine_type:machine_type});
    }).catch(function (err) {
        console.log("find Machine_type failed with error: " + err);
        return 0;

    });
};

// find Machine_type by id

exports.findById = (req,res) =>{
    Machine_type.findByPk(req.params.id_mach_type).then(machine_type =>{
        if(!machine_type){
            return res.status(404).send({message:"Machine_type not found with id" + req.params.id_mach_type});
        }
        res.send(machine_type);
    }).catch(err => {
        if(err.kind ==='ObjectId'){
            return res.status(404).send({
                message: "Machine_type not found with id " + req.params.id_mach_type
            });

        }
        return res.status(500).send({
            message: "Error getting Machine_type with id " + req.params.id_mach_type
        });
    });
};

// update Machine type
exports.update = (req,res) =>{
    const id = req.params.id_mach_type;
    Machine_type.update({
            type: req.body.type,
            description: req.body.description,
        },
        { where: {id_mach_type: req.params.id_mach_type} }
    ).then(() => {
        res.status(200).send("updated successfully a machine type with id = " + id);
    });
};
//delete Machine type
exports.delete = (req,res) =>{
    const id = req.params.id_mach_type;
    Machine_type.destroy({
        where:{id_mach_type: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a machine type with id = ' + id);
    });
};
