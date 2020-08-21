module.exports= (sequelize,Sequelize)=>{
    const has_permission= sequelize.define('has_permissions',{
        has_permissions_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
    });
    return has_permission;
}
