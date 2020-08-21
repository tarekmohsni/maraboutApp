module.exports=(sequelize, Sequelize)=>{
    const mach_type = sequelize.define('machine_types',{
        mach_type_id:{
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        type:{
            allowNull:false,
            type:Sequelize.STRING
        },
        description:{
            allowNull:false,
            type:Sequelize.STRING
        }
    });
    return mach_type;
}
