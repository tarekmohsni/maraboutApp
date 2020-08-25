module.exports = (sequelize,Sequelize) => {
    const user_session = sequelize.define('user-ssessions',{
        usersession_id:{
            type:Sequelize.INTEGER,
            autoIncrement:true,
            primaryKey:true
        },
        time_in:{
            allowNull:false,
            type:Sequelize.DATE
        },
        time_out:{
            allowNull:false,
            type:Sequelize.DATE
        },
        box_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'boxs',
                key:'box_id'
            }
        },
        emp_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'employes',
                key:'emp_id'
            }
        },

    });
    return user_session;
}
