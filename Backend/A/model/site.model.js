module.exports=(sequelize,Sequelize) => {
    const site = sequelize.define("sites", {
        id_site:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        label:{
            allowNull:false,
            type:Sequelize.STRING
        },
        email:{
            allowNull:false,
            type:Sequelize.STRING
        },
        phone:{
            allowNull:false,
            type:Sequelize.INTEGER
        },
        technicalcontact:{
            allowNull:false,
            type:Sequelize.INTEGER
        },
        prodcontact:{
            allowNull:false,
            type:Sequelize.INTEGER
        },
        site_fax:{
            allowNull:false,
            type:Sequelize.INTEGER
        },
        adress:{
            allowNull:false,
            type:Sequelize.STRING
        },
        city:{
            allowNull:false,
            type:Sequelize.STRING
        },
        country:{
            allowNull:false,
            type:Sequelize.STRING
        },
        client_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'customers',
                key:'client_id'
            }
        }


    });
    return site;

}
