const db = require('../config/db.config.js');
const Ordre = db.ordre;
const Bundle = db.bundle;
const Line = db.line;
const Operation = db.operation;
const Op_grp = db.operation_template;
const Article = db.article;
const Art_Op = db.artopt;
const Art_line = db.artline;
const Line_op = db.line_op


// creat ordre

exports.create = (req, res) => {
    console.log('Order____', req.body);
    let lines = [];
    let Opts = [];

    Ordre.create(req.body).then(CreatedModel => {
        if (req.body.bundles) {
            Bundle.bulkCreate(req.body.bundles, {returning: true}).then(bundle => {
                console.log('operation__group---', bundle);
                if (req.body.bundles[0].Operations_group) {
                    console.log('operation groupe', req.body.bundles[0].Operations_group);
                    req.body.bundles[0].Operations_group.forEach(function (operation_group, i) {
                        lines=(operation_group.line_id);
                        Opts = operation_group.operation_id;
                        console.log('hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh', Opts);
                        console.log('lllll', lines, 'oooo', operation_group);
                        Opts.forEach(function (operation, k) {

                            console.log('operationcarttttttttt', operation);
                            db.carte_pending_operation.create({
                                bundle_id: req.body.bundles[0].bundle_id,
                                operation_id: operation,
                                inProgess: 'no',
                                finished: 0
                            }).then(cpo =>{
                                console.log('cpoooooo',cpo);
                            })
                        });

                        const n = Opts.length;
                        for (let c = 0; c < n; c++) {
                            let id = Opts[c];


                            Op_grp.findOne({


                                where: {
                                    operation_template_id: id
                                }
                            }).then(op => {
                                console.log('sdrgfsdfhgzvsrdfgserdg', op);

                                // delete op.operation_template_id;
                                Operation.create({
                                    label: op.label,
                                    op_code: op.op_code,
                                    description: op.description,
                                    time: op.time,
                                    accMinPrice: op.accMinPrice,
                                    quantity: op.quantity,
                                }).then(operations => {
                                    bundle[0].setOperations(operations);
                                });


                                Line.findOne({
                                    where: {
                                        line_id: operation_group.line_id
                                    }
                                }).then(line => {
                                    for (let j = 0; j < n; j++) {


                                        Operation.findOne({
                                            where: {operation_id: Opts[j]}
                                        }).then(op => {
                                            console.log('line-----', line);
                                            console.log('ggggggggggg', j, n);

                                            line.setArticles(req.body.article_id);
                                            //art.setOrdres(CreatedModel);
                                            line.setOperations(Opts[j]);

                                        });
                                    }


                                });


                            });
                        }
                        bundle[0].setLines(operation_group.line_id);


                    });
                }
                console.log('optssss', Opts);


                //lines = [];
                //Opts = [];
                CreatedModel.setBundles(bundle);
                // CreatedModel.setArticles(req.body.articless);
                console.log('tttt', CreatedModel);
            });


        }
        ;
    });
    Ordre.findAll({
        where: {ordre_id: req.body.ordre_id},

    }).then(resFind => {
        res.json({

            message: 'success',
            data: resFind,

        })
    })
        .catch(err =>
            res.status(500).json(err)
        )


};

// findall ordre
exports.findAll = (req, res) => {
    Ordre.findAll().then(ordre => {
        res.send({ordre: ordre});
    }).catch(function (err) {
        console.log("find ordre failed with error: " + err);
        return 0;

    });
};

// find ordre by id

exports.findById = (req, res) => {
    const Op = [];
    const Op_t = [];
    const Lines_art = [];
    const Lines=[];
    const Lin_op= []
    Ordre.findByPk(req.params.ordre_id).then(ordre => {
        if (!ordre) {
            return res.status(404).send({message: "ordre not found with id" + req.params.ordre_id});
        }
        Article.findOne({
            where: {article_id: ordre.article_id}
        }).then(art => {
            Art_line.findAll({
                where: {article_id: art.article_id}
            }).then(line => {
                for (let i = 0; i < line.length; i++) {
                    Lines_art.push(line[i].line_id);
                }
                ;
                console.log('lineeee', Lines_art);
                Line.findAll({
                    where:{line_id: Lines_art}
                }).then(line =>{

                    for(let k=0;k<line.length;k++){
                    Lines.push(line);};
                    console.log('lllllllllllllllllllllllllllllllll', Lines);



            Art_Op.findAll({
                where: {article_id: art.article_id}
            }).then(oprt => {
                console.log(' longueur de la liste ::', oprt.length);
                for (let i = 0; i < oprt.length; i++) {
                    Op.push(oprt[i].operation_template_id);
                }
                ;
                console.log('liste des operation dans art_operation', Op);

                Op_grp.findAll({


                    where: {
                        operation_template_id: Op
                    }


                }).then(op_t => {
                    for (let j = 0; j < op_t.length; j++) {
                        console.log('ttttttttttttttt', op_t);
                        Op_t.push(op_t[j].op_code);
                    }
                    ;
                    console.log('gggggddtyrtyr', Op_t);

                    // find all operation with in line
                    line.forEach(function (liin, i) {
                        Line_op.findAll({

                            where: {line_id: line[i].line_id}

                        }).then(op => {
                            for (let i = 0; i < op.length; i++) {
                                Lin_op.push(op[i].operation_id);
                            }
                            ;

                            db.operation.findAll({
                                where: {operation_id: Lin_op}
                            }).then(oper => {
                                res.send({op_t, art, line, oper});
                            })
                        })
                    })
                });
            });

            });
            });


            //res.send(art)

        })
        return (Op_t, Lines_art);

    }).catch(err => {
        if (err.kind === 'ObjectId') {
            return res.status(404).send({
                message: "User not found with id " + req.params.ordre_id
            });

        }
        return res.status(500).send({
            message: "Error getting ordre with id " + req.params.ordre_id
        });
    });
};

// update ordre
exports.update = (req, res) => {
    const id = req.params.ordre_id;
    Ordre.update({
            label: req.body.label,
            code: req.body.code,
            quantity: req.body.quantity,
            description: req.body.description,
        },
        {where: {ordre_id: req.params.ordre_id}}
    ).then(() => {
        res.status(200).send("updated successfully a ordre with id = " + id);
    });
};

//delete ordre
exports.delete = (req, res) => {
    const id = req.params.ordre_id;
    Ordre.destroy({
        where: {ordre_id: id}
    }).then(() => {
        res.status(200).send('deleted successfully a ordre with id = ' + id);
    });
};
