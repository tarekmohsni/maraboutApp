module.exports = (sequelize, Sequelize) => {
    const machine = sequelize.define('machines', {
        mach_id:{
            allowNull:false,
            autoIncrement:true,
            primaryKey:true,
            type:Sequelize.INTEGER
        },
        label:{
            allowNull:false,
            type:Sequelize.STRING
        },
        startworkDate:{
            allowNull:false,
            type: Sequelize.STRING
        },
        manufachinerlifeTime:{

            type:Sequelize.INTEGER
        },
        line_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'lines',
                key:'line_id'
            }
        },
        mach_type_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'machine_types',
                key:'mach_type_id'
            }
        }
    });
    return machine;
}
