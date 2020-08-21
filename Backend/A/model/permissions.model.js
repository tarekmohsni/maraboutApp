module.exports= (sequelize, Sequelize)=>{
    const permissions = sequelize.define('permissions',{
        permission_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        permission_label:{
            type:Sequelize.STRING,
        },
        active:{
            type:Sequelize.STRING,
        },
        level:{
            type:Sequelize.INTEGER,
        },
        parent_menu:{
            type:Sequelize.INTEGER,
        },
    });
    return permissions;
}
