module.exports=(sequelize, Sequelize) =>{
    const Employe = sequelize.define('employes',{
        emp_id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        name:{

            type:Sequelize.STRING
        },
        last_name:{

            type:Sequelize.STRING
        },
        start_working_date:{

            type:Sequelize.STRING
        },
        last_login_date: {
            type: Sequelize.STRING
        },
        adress:{

            type:Sequelize.STRING
        },
        rfid: {
            type: Sequelize.STRING
        },
        gender: {
            type: Sequelize.STRING,
        },
        city:{

            type:Sequelize.STRING
        },
        age:{

            type:Sequelize.STRING
        },
        matricule:{

            type:Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING
        },
        profile_image:{

            type:Sequelize.STRING
        },
        jooob:{
            type:Sequelize.STRING
        },
        job_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'jobs',
                key:'job_id'
            }
        }

    });
    return Employe;
}
