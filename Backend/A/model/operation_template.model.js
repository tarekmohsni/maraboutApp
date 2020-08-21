module.exports=(sequelize,Sequelize)=>{
    const operation_template = sequelize.define('operation_templates',{
            operation_template_id:{
                type:Sequelize.INTEGER,
                autoIncrement:true,
                primaryKey:true,
            },
            label:{
                type:Sequelize.STRING,
            },
            op_code:{
                type:Sequelize.STRING,
            },
            description:{
                type:Sequelize.STRING,
            },
            time:{
                type:Sequelize.STRING,

            },
            accMinPrice:{
                type:Sequelize.STRING,
            },
            quantity:{
                type:Sequelize.INTEGER,
            },
          with_subsequence:{
            type:Sequelize.BOOLEAN,
           },

    });
    return operation_template;
}
