module.exports=(sequelize,Sequelize)=>{
    const bundle=sequelize.define('bundles',{
        bundle_id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true
        },
        num_bundle:{
            type:Sequelize.INTEGER,
            allowNull:false,
        },
        version:{
            type:Sequelize.INTEGER,
        },
        size:{
            type:Sequelize.STRING,
            allowNull:false,
        },
        quantity:{
            type:Sequelize.STRING,
            allowNull:false,
        },

        start_date:{
            type:Sequelize.STRING,
        },
        finish_date:{
            type:Sequelize.STRING,
        },
        ord_id:{
            type:Sequelize.INTEGER,

            references: {
                model: 'ordres',
                key: 'ordre_id'
            },

        },

    });
    return bundle;
}
