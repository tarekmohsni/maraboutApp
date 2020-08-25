module.exports=(sequelize,Sequelize)=>{
    const cpo = sequelize.define('carte_pending_operations',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        reparation:{
            type:Sequelize.STRING,
        },
        finished:{
            type:Sequelize.STRING,
        },
        bundle_id:{
            type:Sequelize.STRING
        },
        operation_id:{
            type:Sequelize.STRING
        },
        quantity:{
            type:Sequelize.STRING
        }

    });
    return cpo;
}
