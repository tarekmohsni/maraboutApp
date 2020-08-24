module.exports = (sequelize,Sequelize) =>{
    const job= sequelize.define('jobs',{
        job_id:{
            allowNull:false,
            primaryKey:true,
            autoIncrement:true,
            type:Sequelize.INTEGER
        },
        label:{
            allowNull:false,
            type: Sequelize.STRING
        },
        description:{
            allowNull:false,
            type:Sequelize.STRING
        }
    });
    return job;
    // job has many employe
}
