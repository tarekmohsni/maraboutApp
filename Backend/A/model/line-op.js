module.exports=(sequelize,Sequelize) => {
    const lineop = sequelize.define('line-ops',{
        id:{
            primaryKey:true,
            type:Sequelize.INTEGER,
            autoIncrement:true,
        },
        line_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'lines',
                key:'line_id'
            }
        },
        operation_id:{
            type:Sequelize.INTEGER,
            references: {
                model: 'operations',
                key: 'operation_id'
            }
        },
    });
    return lineop;
}
