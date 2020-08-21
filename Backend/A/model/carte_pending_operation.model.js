module.exports=(sequelize,Sequelize)=>{
    const cpo = sequelize.define('carte_pending_operations',{
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
        }

    });
    return cpo;
}
