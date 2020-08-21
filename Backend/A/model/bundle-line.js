module.exports=(sequelize,Sequelize) =>{
    const bndline = sequelize.define('bundle-lines',{
        id:{
            type:Sequelize.INTEGER,
            primaryKey:true,
            autoIncrement:true,
        },
        line_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'lines',
                key:'line_id',
            }
        },
        bundle_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'bundles',
                key:'bundle_id'
            }
        }

    });
    return bndline;
}
