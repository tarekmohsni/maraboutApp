const db = require('../config/db.config.js');
const Line =db.line;

exports.create = (req, res) => {
    Line.create({
            label: req.body.label,
            description: req.body.description,
    }).then(line => {
        res.send({line:line});
    }).catch(function (err) {
        console.log("create failed with error: " + err);
        return 0;

    });
};
