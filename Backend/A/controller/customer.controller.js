const db = require('../config/db.config');
const Customer = db.cutomer;

// creat customer
exports.create=(req,res)=>{
    Customer.create({
        company: req.body.company,
        phone: req.body.phone,
        email: req.body.email,
        technical_contact: req.body.technical_contact,
        sales_contact: req.body.sales_contact,
        fax:req.body.fax,
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

//update customer
exports.update = (req,res) =>{
    const id = req.params.client_id;
    Customer.update({
            company: req.body.company,
            phone: req.body.phone,
            email: req.body.email,
            technical_contact: req.body.technical_contact,
            sales_contact: req.body.sales_contact,
            fax:req.body.fax,
            country:req.body.country,
            state:req.body.state,
            city:req.body.city
        },
        { where: {client_id: id} }
    ).then((customer) => {
        res.send({customer:customer});
    });
};

// delete customer
exports.delete = (req,res) =>{
    const id = req.params.client_id;
    Customer.destroy({
        where:{client_id: id}
    }).then(() =>{
        res.status(200).send('deleted successfully a machine type with id = ' + id);
    });
};
