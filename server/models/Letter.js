module.exports = (sequelize, DataTypes) => {

  const Letters = sequelize.define("Letters", {
    letter: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  Letters.associate = (models) => {
    Letters.belongsTo(models.Users, {
      as: 'fromUser',
      foreignKey: {
        allowNull: false
      }
    });
    Letters.belongsTo(models.Users, {
      as: 'toUser',
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Letters;
};