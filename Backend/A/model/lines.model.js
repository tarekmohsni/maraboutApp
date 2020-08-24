module.exports = (sequeleize, Sequelize) => {
    const line = sequeleize.define('lines',{
        line_id:{
            autoIncrement: true,
            primaryKey: true,
            type: Sequelize.INTEGER
        },
        label:{
            allowNull:false,
            type:Sequelize.STRING
        },
        description:{
            allowNull:false,
            type:Sequelize.STRING
        },
        site_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'sites',
                key:'site_id'
            }
        }

    });
    return line;
}
