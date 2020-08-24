module.exports=(sequelize,Sequelize) => {
    const site = sequelize.define("sites", {
        site_id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        label:{

            type:Sequelize.STRING
        },
        email:{

            type:Sequelize.STRING
        },
        phone:{

            type:Sequelize.INTEGER
        },
        technical_contact:{

            type:Sequelize.INTEGER
        },
        prodcontact:{

            type:Sequelize.INTEGER
        },
        fax:{

            type:Sequelize.INTEGER
        },
        adress:{

            type:Sequelize.STRING
        },
        city:{

            type:Sequelize.STRING
        },
        country:{

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
