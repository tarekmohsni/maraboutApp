module.exports = (sequelize, Sequelize) => {
    const ordre = sequelize.define('ordres' , {
        ordre_id:{
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        label:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        code:{
            type:Sequelize.INTEGER

        },
        ordrequantity:{
            type:Sequelize.INTEGER

        },
        description:{
            type:Sequelize.STRING,
            allowNull:false,

        },
        client_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'customers',
                key:'client_id'
            }
        },
        article_id:{
            type: Sequelize.INTEGER,
            references:{
                model:'articles',
                key:'article_id'
            }
        }
    });
    return ordre;
}
