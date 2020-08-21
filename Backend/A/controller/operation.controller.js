const db = require('../config/db.config.js');
const Operation = db.operation;
// creat operation
exports.creat = (req,res) =>{
    // save to database
    Operation.create({
        label:req.body.label,
        op_code:req.body.op_code,
        description:req.body.description,
        time:req.body. time,
        accMinPrice:req.body.accMinPrice,
        quantity:req.body.quantity,
    }).then(operation =>{
        res.send({operation:operation});
    }).catch(function (err) {
        console.log("creat failed with error"+ err);
        return 0;
    });

};
// findall operation
exports.findAll = (req,res) =>{
    Operation.findAll().then(operation =>{
        res.send({operation:operation});
    }).catch(function (err) {
        console.log("find failed with error"+ err);
        return 0;

    });
};
// find operation by id

