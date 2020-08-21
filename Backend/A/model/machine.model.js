module.exports = (sequelize, Sequelize) => {
    const machine = sequelize.define('machines', {
        id_mach:{
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
            type: Sequelize.DATE
        },
        manufachinerlifeTime:{

            type:Sequelize.INTEGER
        },
        operation:{

            type:Sequelize.STRING
        }
    });
    return machine;
}
