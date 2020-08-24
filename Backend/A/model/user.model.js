module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        userId:{
          type:Sequelize.INTEGER ,
          primaryKey:true,
          autoIncrement:true
        },
        name: {
            type: Sequelize.STRING,
            allowNull: false
        },
        username: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false
        },
        email: {
            type: Sequelize.STRING,
            unique: true,
            allowNull: false

        },
        password: {
            type: Sequelize.STRING,
            allowNull: false

        }
    });

    return User;
}
