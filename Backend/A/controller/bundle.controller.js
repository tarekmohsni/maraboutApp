const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Bundle = db.bundle;
const Ordre =db.ordre;
const Line= db.line;
const operation = db.operation;

// creat bundle
exports.create = (req, res) => {
    // Save to database
    let lines = [];
    Bundle.create({
        num_bundle: req.body.num_bundle,
        size: req.body.size,
        quantity: req.body.quantity,
        ord_id: req.params.ord_id,
    },
        { where: {ord_id: req.params.ord_id} }

    ).then(bundle => {
        console.log('operation__group---', bundle);
        if (req.body.Operations_group) {
            console.log('ssssssssss',req.body.Operations_group);
            req.body.Operations_group.forEach(function (operation_group, i) {
                lines.push(operation_group.line_id);
                console.log('lllll', lines,'oooo', operation_group);
                operation.bulkCreate(operation_group.operations, {returning: true}).then(operations => {
                    bundle.setOperations(operations);

                    Line.findOne({
                        where: {
                            line_id: operation_group.line_id
                        }
                    }).then(line => {
                        console.log('line-----',line);
                        line.setOperations( operations);
                    });

                });
                bundle.setLines(req.body.Operations_group[0].line_id);


            });
        }


       /* lines = [];
        CreatedModel.setBundles(bundle);
        console.log('tttt',CreatedModel);*/
       res.send('success');

    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// findall bundle
exports.findAll = (req, res) => {
    Bundle.findAll(
        { where: {ord_id: req.params.ord_id} }
    ).then(bundle => {

        res.send({bundle:bundle});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// find article by ID
exports.findById = (req, res) => {
    Bundle.findById(req.params.ordre_id).then(bundle => {
        res.send(bundle);
    })
};


/*exports.delete = (req, res) => {
    Bundle.destroy({
        where: {id: req.body.article_id }
    }).then(() => {
        res.send('ok');
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};*/
