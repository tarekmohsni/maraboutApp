module.exports= (sequelize, Sequelize) => {
    const sequence= sequelize.define('sequences',{
        sequence_id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        stitchcount:{
            type: Sequelize.STRING,
        },
        sequence_ordre:{
            type: Sequelize.STRING,
        },
        picture_id:{
            type: Sequelize.STRING,
        },
        active:{
            type: Sequelize.STRING,
        },
        coupe_fil:{
            type: Sequelize.STRING,
        },
        back_stitch:{
            type: Sequelize.STRING,
        },
        parent_sequence:{
            type: Sequelize.STRING,
        },
        back_stitch_positive_tolerence:{
            type: Sequelize.STRING,
        },
        back_stitch_negative_tolerence:{
            type: Sequelize.STRING,
        },
        stitchcount_positive_tolerence: {
            type: Sequelize.STRING,
        },
        stitchcount_negative_tolerence:{
            type: Sequelize.STRING,
        },
        with_subsequences:{
            type: Sequelize.STRING,
        },
        description:{
            type: Sequelize.STRING,
        },
        second_back_stitch: {
            type: Sequelize.STRING,
        },
        operation_template_id:{
            type: Sequelize.INTEGER,
            references: {
                model: 'operation_templates',
                key: 'operation_template_id'
            }
        },

    });
    return sequence;

}
