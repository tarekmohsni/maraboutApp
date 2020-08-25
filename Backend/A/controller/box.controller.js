const db = require('../config/db.config.js');
const config = require('../config/config.js');
const Box = db.box;

// creat box
exports.create = (req, res) => {
    // Save to database
    Box.create({
        label: req.body.label,
        box_version: req.body.box_version,
        adress_mac: req.body.adress_mac,
        box_ip: req.body.box_ip,
        line_id:req.body.line_id,
        mach_id: req.body.mach_id
    }).then(box => {
        res.send({box:box});
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};

// findall box
exports.findAll = (req, res) => {
    Box.findAll().then(box => {

        res.send({box:box});
    }).catch(function (err) {
        console.log("find failed with error: " + err);
        return 0;

    });
};

// find box by ID
exports.findById = (req, res) => {
    Box.findById(req.params.box_id).then(box => {
        res.send(box);
    })
};

// update box
exports.update = (req,res) =>{
    const id = req.params.box_id;
    Box.update({
            label: req.body.label,
            box_version: req.body.box_version,
            adress_mac: req.body.adress_mac,
            box_ip: req.body.box_ip,
            line_id:req.body.line_id,
            mach_id: req.body.mach_id
        },
        { where: {box_id: id} }
    ).then((box) => {
        res.send({box:box});
    });
};

// delete box with ID
exports.delete = (req, res) => {
    Box.destroy({
        where: {box_id: req.body.box_id }
    }).then(() => {
        res.send('ok');
    }).catch(function (err) {
        console.log("delete failed with error: " + err);
        return 0;
        // handle error;
    });
};

// logout user session
exports.logout=(req, res, next)=> {

    var db = require('../models');

    var       usersession_id = req.params.      usersession_id;

    var rt = moment().format("YYYY-MM-DD HH:mm:ss");
    if (       usersession_id === null ||       usersession_id === '') {

        res.send({
            success: false,
            data: null,
            messages: [
                {
                    userMessage: 'Invalid user session data',
                    internalMessage: 'Invalid user session data',
                    code: 1006
                }
            ]
        });
        return;

    }

    db.user_session.findOne({
        where: {
                  usersession_id:       usersession_id
        }
    }).then(usersessions => {

        if (usersessions) {

            //1. Close usersession

            db.user_session.update(
                {
                    time_out: rt,
                },
                {
                    where: {
                             usersession_id:      usersession_id
                    }
                });

            //2. Close CPS

            db.carte_pending_session.findAll({
                where: {
                    UserSessionId:      usersession_id
                }
            }).then(cart_pending_sessions => {

                cart_pending_sessions.forEach(function (cps) {

                    if (cps.updated_at === null) {

                        db.carte_pending_session.update(
                            {
                                updated_at: rt,
                                end_time: rt //////////////////////////////////////////////
                            },
                            {
                                where: {
                                    UserSessionId: cps.UserSessionId,
                                    end_time: null
                                }
                            });

                    }

                })

                res.send({
                    "success": true,
                    "data": null,
                    "messages": [
                        {
                            userMessage: "Logout successful",
                            internalMessage: "Logout successful",
                            code: 1018,
                            more_info: null
                        }
                    ],
                    "attributes": [],
                    "status": 200
                });
                return;

            })


        } else {

            res.send({
                success: false,
                data: null,
                messages: [
                    {
                        userMessage: 'User session not exists',
                        internalMessage: 'User session not exists',
                        code: 1008
                    }
                ]
            });
            return;

        }

    })

}


exports.startOperation=(req, res, next)=> {

    let cpo_id = req.query.cpo_id;
    let  usersession_id = req.query. usersession_id;
    var starttime = moment().format("YYYY-MM-DD HH:mm:ss");

    var _this = this;

    if ((cpo_id == null) || (cpo_id == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'CPO_ID not provided',
                internalMessage: 'CPO_ID not provided',
                code: 7002
            }]
        });
        return;
    }


    if ((starttime == null) || (starttime == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'Start time not provided',
                internalMessage: 'Start time not provided',
                code: 1025
            }]
        });
        return;
    }

    if (( usersession_id == null) || ( usersession_id == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'User session does not exists',
                internalMessage: 'User session does not exists',
                code: 1008
            }]
        });
        return;
    }

    _this.db.user_session.findOne({

        where: {
             usersession_id:  usersession_id,
            time_out: null
        }

    }).then(usersession => {

        if (usersession) {

            _this.db.carte_pending_session.findOne({

                where: {
                    id: cpo_id
                },
                include: [
                    {
                        model: _this.db.bundle
                    }
                ]


            }).then(cpo => {


                if (cpo) {

                    if (Number(cpo.quantity) === 0) {

                        let allOperationsSQL = 'select count(cpo.*) \n' +
                            'from cart_pending_operations cpo\n' +
                            'where cpo.BundleId = ' + cpo.BundleId

                        _this.db.sequelize.query(allOperationsSQL,
                            {type: _this.db.sequelize.QueryTypes.SELECT})
                            .then(operationCount => {
                                console.log('all operations = ', operationCount[0].count)

                                let sql = 'select count(cpo.*) \n' +
                                    'from cart_pending_operations cpo\n' +
                                    'where cpo.BundleId = ' + cpo.BundleId + ' and cpo.Start_date is null'

                                _this.db.sequelize.query(sql,
                                    {type: _this.db.sequelize.QueryTypes.SELECT})
                                    .then(cpo_not_started => {

                                        if (cpo_not_started[0].count === operationCount[0].count) {
                                            _this.db['bundle'].update({
                                                Start_date: new Date(starttime * 1000),

                                            }, {
                                                where: {
                                                    bundle_id: cpo.BundleId
                                                }
                                            })
                                        }
                                    })

                            })
                        this.db.carte_pending_operation.update({
                            inProgess: 'Y',
                            quantity: 0,
                            Start_date: new Date(starttime * 1000)

                        }, {
                            where: {

                                id: cpo_id,

                            }
                        })
                    } else {
                        this.db.carte_pending_operation.update({
                            inProgess: 'Y',
                            Start_date: new Date(starttime * 1000)

                        }, {
                            where: {

                                cart_pending_operation_id: cpo_id,
                            }
                        })
                    }
                    this.db.carte_pending_session.update({
                            active: 'N',
                        },
                        {
                            where: {
                                UserSessionId:  usersession_id,
                                CartPendingOperationId: cpo_id,
                                end_time: null,
                                active: 'Y'
                            }
                        }).then(result1 => {
                        var modalObj = _this.db['cart_pending_session'].build({
                            UserSessionId:  usersession_id,
                            CartPendingOperationId: cpo_id,
                            created_at: new Date(starttime * 1000).getTime(),
                            quantity: 0,
                            in_progress: 'Y',
                            active: 'Y',
                            start_time: new Date(starttime * 1000).getTime()
                        });

                        modalObj.save()
                            .then(cps => {

                                if (cps) {
                                    res.send({
                                        success: true,
                                        data: cps,
                                        messages: [{
                                            userMessage: 'Start operation with success',
                                            internalMessage: 'Start operation with success',
                                            code: 4003
                                        }]
                                    });
                                    return;
                                } else {
                                    res.send({
                                        success: false,
                                        data: null,
                                        messages: [{
                                            userMessage: 'Failed to create operation',
                                            internalMessage: 'Failed to create operation',
                                            code: 4009
                                        }]
                                    });
                                    return;
                                }


                            });
                    })


                } else {
                    res.send({
                        success: false,
                        data: null,
                        messages: [{
                            userMessage: 'Cart Pending Operation does not exists',
                            internalMessage: 'Cart Pending Operation does not exists',
                            code: 7003
                        }]
                    });
                    return;
                }

            });

        } else {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'User session does not exists',
                    internalMessage: 'User session does not exists',
                    code: 1008
                }]
            });
            return;
        }

    })
}

// finish operation

exports.operationFinished=(req, res, next)=> {

    let cps_id = req.query.cps_id;
    let quantity = req.query.quantity;
    let time = req.query.time;
    let endtime = moment().format("YYYY-MM-DD HH:mm:ss");

    if ((cps_id == null) || (cps_id == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'CPS_ID not provided',
                internalMessage: 'CPS_ID not provided',
                code: 7000
            }]
        });
        return;
    }

    if ((quantity == null) || (quantity == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'Quantity not provided',
                internalMessage: 'Quantity not provided',
                code: 1022
            }]
        });
        return;
    }

    if ((time == null) || (time == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'Time not provided',
                internalMessage: 'Time not provided',
                code: 1023
            }]
        });
        return;
    }

    if ((endtime == null) || (endtime == '')) {
        res.send({
            success: false,
            data: null,
            messages: [{
                userMessage: 'End time not provided',
                internalMessage: 'End time not provided',
                code: 1026
            }]
        });
        return;
    }

    var _this = this;


    _this.db.carte_pending_session.findOne({
        where: {
            id: cps_id,
            end_time: null
        },
        include: [{
            model: _this.db.carte_pending_operation,
            include: [{
                model: _this.db['operation']
            }]
        },
            {
                model: _this.db['usersession'],
                include: [{
                    model: _this.db['box'],
                    include: [{
                        model: _this.db['machine']
                    }]
                }]
            }]
    }).then(cps => {
        if (cps) {


            var cps = cps;
            var quantity_operation = cps.cart_pending_operation.operation.quantity;

            if (cps.cart_pending_operation.quantity === '' || cps.cart_pending_operation.quantity === null) {
                var quantity_CPO = 0;
            } else {
                var quantity_CPO = cps.cart_pending_operation.quantity;
            }
            var total_quantity = 0;
            total_quantity = parseInt(quantity_CPO) + parseInt(quantity);
            time = parseInt((cps.cart_pending_operation.time) ? cps.cart_pending_operation.time : 0) + parseInt(time);


            if (quantity < quantity_operation && total_quantity < quantity_operation) {

                _this.db.carte_pending_operation.update({
                    quantity: total_quantity,
                    finished: 0,
                    time: time,
                    Finish_date: new Date(endtime * 1000).getTime(),
                    in_progress: 'N'
                }, {
                    where: {
                        id: cps.cart_pending_operation.id,
                    }
                }).then(cpo_updated => {
                    cps.carte_pending_operation.quantity = total_quantity;
                    cps.carte_pending_operation.finished = 0;
                    cps.carte_pending_operation.time = time;

                    cps.quantity = quantity;
                    cps.time = time;


                    _this.db['cart_pending_session'].update({

                        quantity: quantity,
                        time: time,
                        end_time: new Date(endtime * 1000),
                        in_progress: 'N'
                    }, {
                        where: {
                            id: cps.id
                        }
                    }).then(cpsUpdated => {

                        res.send({
                            success: true,
                            data: cps,
                            messages: [{
                                userMessage: 'Operation already updated and finished',
                                internalMessage: 'Operation already updated and finished',
                                code: 4006
                            }]
                        });
                        return;
                    });


                })


            } else if (total_quantity === quantity_operation) {
                //finished

                _this.db['cart_pending_operation'].update({

                    quantity: total_quantity,
                    finished: 1,
                    time: time,
                    Finish_date: new Date(endtime * 1000).getTime(),
                    in_progress: 'N'
                }, {
                    where: {
                        id: cps.carte_pending_operation.id
                    }
                }).then(cpoUpdated => {

                    // --update Bundles

                    _this.db.carte_pending_operation.findOne({
                        where: {
                            id: cps.carte_pending_operation.id
                        }
                    }).then(cpo => {

                        let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                            'where cpo.BundleId = ' + cpo.BundleId

                        _this.db.sequelize.query(allOperationSQL, {
                            type: _this.db.sequelize.QueryTypes.SELECT
                        })
                            .then(count_allOperations => {

                                let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                    'where cpo.BundleId = ' + cpo.BundleId + ' and cpo.finished = 1'

                                _this.db.sequelize.query(allOperationSQL, {
                                    type: _this.db.sequelize.QueryTypes.SELECT
                                })
                                    .then(finished_operations_count => {

                                        if (count_allOperations[0].count === finished_operations_count[0].count) {

                                            _this.db['bundle'].update({

                                                finish_date: new Date(endtime * 1000)
                                            }, {
                                                where: {
                                                    bundle_id: cpo.bundle_id
                                                }
                                            })
                                        }


                                        _this.db.carte_pending_session.update({

                                            quantity: quantity,
                                            time: time,
                                            end_time: new Date(endtime * 1000).getTime(),
                                            in_progress: 'N'

                                        }, {
                                            where: {
                                                id: cps.id,
                                                end_time: null
                                            }
                                        }).then(cpsUpdated => {

                                            cps.carte_pending_operation.quantity = total_quantity;
                                            cps.carte_pending_operation.finished = 1;
                                            cps.carte_pending_operation.time = time;

                                            cps.quantity = quantity;
                                            cps.time = time;


                                            res.send({
                                                success: true,
                                                data: cps,
                                                messages: [{
                                                    userMessage: 'Operation already updated and finished',
                                                    internalMessage: 'Operation already updated and finished',
                                                    code: 4006
                                                }]
                                            });
                                            return;
                                        });

                                    })

                            })
                    })


                });


            } else {
                let sql = 'select sum(cps.quantity) as cps_quantity, sum(cps.reparation) as total_reparation from cart_pending_sessions as cps \n ' +
                    'where cps.CartPendingOperationId = ' + cps.CartPendingOperationId
                _this.db.sequelize.query(sql,
                    {type: _this.db.sequelize.QueryTypes.SELECT})
                    .then(cps_quantity => {
                        let total = parseInt(quantity_operation) - parseInt(cps_quantity[0].cps_quantity);
                        let reparation = quantity - total;
                        let cpo_reparation = 0;
                        if (parseInt(cps_quantity[0].cps_quantity) !== null) {
                            cpo_reparation = parseInt(cps_quantity[0].total_reparation)
                        }

                        _this.db['cart_pending_operation'].update({
                            reparation: cpo_reparation + reparation,
                            quantity: quantity_operation,
                            finished: 1,
                            in_progress: 'N',
                            time: time,
                            Finish_date: new Date(endtime * 1000).getTime()
                        }, {
                            where: {
                                id: cps.carte_pending_operation.id
                            }
                        }).then(cpoUpdated => {

                            // --update Bundles

                            _this.db.carte_pending_operation.findOne({
                                where: {
                                    id: cps.carte_pending_operation.id
                                }
                            }).then(cpo => {

                                let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                    'where cpo.BundleId = ' + cpo.BundleId

                                _this.db.sequelize.query(allOperationSQL, {
                                    type: _this.db.sequelize.QueryTypes.SELECT
                                })
                                    .then(count_allOperations => {

                                        let allOperationSQL = 'select count(cpo.*) from cart_pending_operations cpo ' +
                                            'where cpo.BundleId = ' + cpo.BundleId + ' and cpo.finished = 1'

                                        _this.db.sequelize.query(allOperationSQL, {
                                            type: _this.db.sequelize.QueryTypes.SELECT
                                        })
                                            .then(finished_operations_count => {
                                                if (count_allOperations[0].count === finished_operations_count[0].count) {
                                                    _this.db['bundle'].update({
                                                        finish_date: new Date(endtime * 1000)
                                                    }, {
                                                        where: {
                                                            bundle_id: cpo.bundle_id
                                                        }
                                                    })
                                                }
                                                _this.db.carte_pending_session.update({
                                                    quantity: total,
                                                    time: time,
                                                    reparation: reparation,
                                                    end_time: new Date(endtime * 1000).getTime(),
                                                    in_progress: 'N'

                                                }, {
                                                    where: {
                                                        id: cps.id,
                                                        end_time: null
                                                    }
                                                }).then(cpsUpdated => {
                                                    cps.carte_pending_operation.quantity = quantity_operation;
                                                    cps.carte_pending_operation.finished = 1;
                                                    cps.carte_pending_operation.time = time;
                                                    cps.reparation = reparation
                                                    cps.quantity = total;
                                                    cps.time = time;
                                                    res.send({
                                                        success: true,
                                                        data: cps,
                                                        messages: [{
                                                            userMessage: 'Operation already updated and finished',
                                                            internalMessage: 'Operation already updated and finished',
                                                            code: 4006
                                                        }]
                                                    });
                                                    return;
                                                });
                                            })
                                    })
                            })
                        });

                    })
            }

        } else {
            res.send({
                success: false,
                data: null,
                messages: [{
                    userMessage: 'CPS does not exists',
                    internalMessage: 'CPS does not exists',
                    code: 7001
                }]
            });
            return;
        }

    });
}


