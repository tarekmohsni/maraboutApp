module.exports=(sequelize, Sequelize)=>{
    const article= sequelize.define('articles',{
        article_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        article_name:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        code:{
            type:Sequelize.STRING,
            allowNull:false,

        },
        description:{
            type:Sequelize.STRING,
            allowNull:false,
        },

    });
    return article;
}
