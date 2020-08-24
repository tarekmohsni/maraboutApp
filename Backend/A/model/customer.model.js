module.exports=(sequelize, Sequelize)=>{
    const customer = sequelize.define('customers',{
        client_id:{
            type:Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement:true
        },
        company:{
            type:Sequelize.STRING
        },
        phone:{
            type:Sequelize.STRING
        },
        email:{
            type:Sequelize.STRING
        },
        technical_contact:{
            type:Sequelize.STRING
        },
        sales_contact:{
            type:Sequelize.STRING
        },
        fax:{
            type:Sequelize.STRING
        },
        country:{
            type:Sequelize.STRING
        },
        state:{
            type:Sequelize.STRING
        },
        city:{
            type:Sequelize.STRING
        }
    });
    return customer;
}
