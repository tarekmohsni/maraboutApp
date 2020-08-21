module.exports=(sequelize, Sequelize) =>{
    const artopt = sequelize.define('art-opts', {
        id:{
            primaryKey:true,
            type:Sequelize.INTEGER,
            autoIncrement:true,
        },
        article_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'articles',
                key:'article_id'
            }
        },
        operation_template_id:{
            type:Sequelize.INTEGER,
            references: {
                model: 'operation_templates',
                key: 'operation_template_id'
            }
        },
    });
    return artopt;
}
