module.exports=(sequelize,Sequelize)=>{
    const profile=sequelize.define('profiles',{
        profile_id:{
            type:Sequelize.STRING,
            primaryKey:true,

        },
        profile_label:{
            type:Sequelize.STRING,
        },
        profile_allowedsections:{
            type:Sequelize.STRING,
        },
        profile_description:{
            type:Sequelize.STRING,
        },
        active:{
            type:Sequelize.STRING,
        },
        has_update:{
            type:Sequelize.STRING,
        },
        has_delete:{
            type:Sequelize.STRING,
        },
        has_save:{
            type:Sequelize.STRING,
        },
    });
    return profile;
}
