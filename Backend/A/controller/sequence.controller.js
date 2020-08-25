const db = require('../config/db.config.js');
const Sequence = db.sequence;
const Operation = db.operation_template;
// creat sequence

exports.creat = (req,res) =>{
    Sequence.create({
        stitchcount: req.body.stitchcount,
        sequence_ordre: req.body.sequence_ordre,
        picture_id: req.body.picture_id,
        active: req.body.active,
        coupe_fil: req.body.coupe_fil,
        back_stitch: req.body.back_stitch,
        parent_sequence: req.body.parent_sequence,
            back_stitch_positive_tolerence: req.body.back_stitch_positive_tolerence,
            back_stitch_negative_tolerence: req.body. back_stitch_negative_tolerence,
        stitchcount_positive_tolerence: req.body.stitchcount_positive_tolerence,
        stitchcount_negative_tolerence: req.body.stitchcount_negative_tolerence,
        with_subsequences: req.body.with_subsequences,
        description: req.body.description,
        second_back_stitch: req.body.second_back_stitch,
            operation_template_id: req.params.operation_template_id,

    }
    ).then(sequence =>{
        res.send({sequence: sequence});
    }).catch(function (err) {
        console.log("creat sequence failed with error"+ err);
        return 0;
    });

};
// findall sequences
exports.findAll = (req,res) =>{
    Sequence.findAll(
        { where: {operation_template_id: req.params.operation_template_id} }
    ).then(sequence =>{
        res.send({sequence: sequence});
    }).catch(function (err) {
        console.log("find sequence failed with error"+ err);
        return 0;

    });
};
