module.exports=(sequelize,Sequelize)=>{
    const cps = sequelize.define('carte_pending_sessions',{
        c_p_s_id:{
            primaryKey:true,
            autoIncrement:true,
            type:Sequelize.INTEGER,
        },
        creat_at:{
            type:Sequelize.DATE,
        },
        time:{
            type:Sequelize.STRING,
        },
        sys_quantity:{
            type:Sequelize.INTEGER,
        },
        satrt_time:{
            type:Sequelize.DATE,
        },
        end_time:{
            type:Sequelize.DATE,
        },
        reparation:{
            type:Sequelize.STRING,
        },
        in_progress:{
            type:Sequelize.STRING,
        },
        usersession_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'user-ssessions',
                key: 'usersession_id'
            }
        }
    });
    return cps;
}
