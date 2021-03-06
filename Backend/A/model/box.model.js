module.exports = (sequelize, Sequelize) => {
    const Box = sequelize.define('boxs', {
        box_id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        label: {
            type: Sequelize.STRING,
            allowNull: false
        },
        adress_mac: {
            type: Sequelize.STRING,
            unique: true,

        },
        box_version: {
            type: Sequelize.STRING,

        },
        box_ip:{
            type:Sequelize.STRING,
        },
        mach_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'machines',
                key:'mach_id'
            }
        },
        line_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'lines',
                key:'line_id'
            }
        }

    });

    return Box;
}
