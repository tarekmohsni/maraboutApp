module.exports=(sequelize,Sequelize)=>{
    const profile=sequelize.define('profiles',{
        profile_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,

        },
        label:{
            type:Sequelize.STRING,
        },
        allowedsections:{
            type:Sequelize.STRING,
        },
        description:{
            type:Sequelize.STRING,
        },
        active:{
            type:Sequelize.STRING,
        },
        permis:{
            type:Sequelize.STRING,
        },
    });
    return profile;
}
