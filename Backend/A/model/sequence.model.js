module.exports= (sequelize, Sequelize) => {
    const sequence= sequelize.define('sequences',{
        sequence_id:{
            type: Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        stitchcount:{
            type: Sequelize.INTEGER,
        },
        sequence_ordre:{
            type: Sequelize.INTEGER,
        },
        picture_id:{
            type: Sequelize.INTEGER,
        },
        active:{
            type: Sequelize.STRING,
        },
        coupe_fil:{
            type: Sequelize.INTEGER,
        },
        back_stitch:{
            type: Sequelize.INTEGER,
        },
        parent_sequence:{
            type: Sequelize.INTEGER,
        },
        back_stitch_positive_tolerence:{
            type: Sequelize.INTEGER,
        },
        back_stitch_negative_tolerence:{
            type: Sequelize.INTEGER,
        },
        stitchcount_positive_tolerence: {
            type: Sequelize.INTEGER,
        },
        stitchcount_negative_tolerence:{
            type: Sequelize.INTEGER,
        },
        with_subsequences:{
            type: Sequelize.STRING,
        },
        description:{
            type: Sequelize.STRING,
        },
        second_back_stitch: {
            type: Sequelize.INTEGER,
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
