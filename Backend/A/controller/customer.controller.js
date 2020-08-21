const db = require('../config/db.config');
const Customer = db.cutomer;

// creat customer
exports.create=(req,res)=>{
    Customer.create({
        client_name: req.body.client_name,
        phoneNumber: req.body.phoneNumber,
        email: req.body.email,
        technical_contact: req.body.technical_contact,
        sales_contact: req.body.sales_contact,
        fax:req.body.fax,
        picpath:req.body.picpath,
        country:req.body.country,
        state:req.body.state,
        city:req.body.city
    }).then(customer =>{
        res.send({customer:customer});
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });

};
 // find all customer
exports.findAll = (req, res) => {
    Customer.findAll().then(customer => {

        res.send({customer:customer});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

//
