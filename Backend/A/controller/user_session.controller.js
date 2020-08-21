const db = require('../config/db.config');
const User_session = db.user_session;
const Employes = db.employes;
const moment = require('moment');
exports.authAction=(req, res, next)=>{

    let timeStamp = req.query._rt;
    timeStamp = timeStamp * 1000;


    let rt = moment.unix(req.query.rt).format("YYYY-MM-DD HH:mm:ss");
    let rfid = req.query.rfid;
    let addr = req.query.adress_mac;
    let box_ip = req.query.box_ip;
    let box_version = req.query.box_version;

    if (addr === null || addr === '') {


        res.send({
            success: false,
            messages: [
                {
                    userMessage: 'Invalid source address data',
                    internalMessage: 'Invalid source address data',
                    code: 1002
                }
            ]
        });
        return;
    }
    if (rfid === null || rfid === '') {
        res.send({
            success: false,
            messages: [
                {
                    userMessage: 'Invalid RFID data',
                    internalMessage: 'Invalid RFID data',
                    code: 1001
                }
            ]
        });
        return;
    }
    if (box_ip === null || box_ip === '' || box_ip === undefined || box_ip === 'undefined') {


        res.send({
            success: false,
            messages: [
                {
                    userMessage: 'Invalid Box IP data',
                    internalMessage: 'Invalid Box IP data',
                    code: 1047
                }
            ]
        });
        return;
    }

    if (box_version === null || box_version === '' || box_version === undefined || box_version === 'undefined') {
        res.send({
            success: false,
            messages: [
                {
                    userMessage: 'Invalid Box version',
                    internalMessage: 'Invalid Box version',
                    code: 1048
                }
            ]
        });
        return;
    }
    Employes.findOne({
        where: {
            rfid: {
                $ilike: rfid
            },
        },
        include: [
            {
                model: db.job
            }
        ]
    }).then(user =>{
        db.box.findOne({
            include: [{
                model: db.machine
            }],
            where: {
                adress_mac: {
                    $iLike: addr
                }
            }

        }).then(box =>{
            if (user && box && box.machine) {
                User_session.findOne({
                    where:
                        {
                            employee_id:
                                {
                                    $eq: user.emp_id
                                },
                            time_out: null,
                        },
                    include: [
                        {
                            model: db.box
                        }
                    ]
                }).then(old_usersession => {

                    if (old_usersession) {
                        return res.send({
                            success: false,
                            data: old_usersession,
                            messages: [
                                {
                                    userMessage: "You are already connected from another box [" + old_usersession.box.label + "], please log out of the previous session",
                                    internalMessage: "You are already connected from another box, please log out of the previous session",
                                    code: 1055
                                }
                            ]
                        });

                    }
                    db.box.update({

                            box_ip: box_ip,
                        },
                        {
                            where: {
                                adress_mac: addr
                            }
                        }
                    ).then(update_box => {
                    })
                    User_session.build({
                        time_in: rt,
                        emp_id: user.emp_id,
                        box_id: box.box_id,
                        last_tag: tag,

                    }).save().then(result1 =>{
                        var result111 = {};

                        db.user_session.findOne({
                            where: {
                                usersession_id: result1.usersession_id
                            },
                            include: [
                                {
                                    model: db.employes,

                                    include: [
                                        {
                                            model: db.job
                                        }
                                    ]
                                },
                                {
                                    model: db.box,
                                    include: [
                                        {
                                            model: db.machine
                                        },
                                        {
                                            model: db.line,

                                        }]
                                }
                            ]
                        }).then(user_session =>{
                            res.send({
                                message: 'Employee is connected',
                                success: true,
                                data: user_session,
                                code: 1049
                            })
                        })

                    })
                });
            }else if (user && !box) {
                res.send(
                    {
                        success: false,
                        data: null,
                        messages: [
                            {
                                userMessage: "Box not affected to machine",
                                internalMessage: "Box not affected to machine",
                                code: 1017,
                            }
                        ],
                        attributes: [],
                        status: 500
                    }
                );
                return;

            }else {
                res.send(
                    {
                        success: false,
                        data: null,
                        messages: [
                            {
                                "userMessage": "Rfid not exists",
                                "internalMessage": "Rfid not exists",
                                "code": 1004
                            }
                        ],
                        attributes: [],
                        status: 500
                    }
                );
                return;
            }
        })

    })


}
