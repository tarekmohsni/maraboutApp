module.exports=(sequelize, Sequelize)=>{
    const mach_type = sequelize.define('machine_types',{
        mach_type_id:{
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        type:{

            type:Sequelize.STRING
        },
        description:{

            type:Sequelize.STRING
        }
    });
    return mach_type;
}
