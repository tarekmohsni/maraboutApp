const db = require('../config/db.config.js');
const Operation_t = db.operation_template;
const Art_Op = db.artopt;
// creat operation
exports.creat = (req,res) =>{
    // save to database
    Operation_t.create({
        label:req.body.label,
        op_code:req.body.op_code,
        description:req.body.description,
        time:req.body. time,
        accMinPrice:req.body.accMinPrice,
        quantity:req.body.quantity,
        with_subsequence:req.body.with_subsequence,
    }).then(operation =>{
        res.send({operation:operation});
    }).catch(function (err) {
        console.log("creat failed with error"+ err);
        return 0;
    });

};
// findall operation
exports.findAll = (req,res) =>{
    Operation_t.findAll().then(operation =>{
        res.send({operation:operation});
    }).catch(function (err) {
        console.log("find failed with error"+ err);
        return 0;

    });
};
// find operation by id
exports.findById = (req,res) =>{
    Operation_t.findByPk(req.params.operation_template_id).then(operation =>{
        if(!operation){
            return res.status(404).send({message:"operation not found with id" + req.params.operation_template_id});
        }
        res.send({operation:operation});
    }).catch(err => {
        if(err.kind ==='ObjectId'){
            return res.status(404).send({
                message: "User not found with id " + req.params.operation_template_id
            });

        }
        return res.status(500).send({
            message: "Error getting ordre with id " + req.params.params.operation_template_id
        });
    });
};
// update operation
exports.update = (req,res) =>{
    const id = req.params.operation_template_id;
    Operation_t.update({
            label:req.body.label,
            op_code:req.body.op_code,
            description:req.body.description,
            time:req.body. time,
            accMinPrice:req.body.accMinPrice,
            quantity:req.body.quantity,
            with_subsequence:req.body.with_subsequence,
        },
        { where: {operation_template_id: req.params.operation_template_id} }
    ).then(() => {
        res.status(200).send("updated successfully a operation with id = " + id);
    });
};
// delete operation
exports.delete = (req,res) =>{
    const id = req.params.operation_template_id;
    Operation_t.destroy({
        where:{operation_template_id: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a operation with id = ' + id);
    });
};
// find operation with article id
exports.findOpbyArt=(req,res)=>{

}

