module.exports =(sequelize,Sequelize)=>{
    const artlin = sequelize.define('art-line',{
        line_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'lines',
                key:'line_id'
            }
        },
        article_id:{
            type:Sequelize.INTEGER,
            references:{
                model:'articles',
                key:'article_id'
            }

        }
    })
    return artlin;
}
