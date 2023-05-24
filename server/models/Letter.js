module.exports = (sequelize, DataTypes) => {

  const Letters = sequelize.define("Letters", {
    letter: {
      type: DataTypes.STRING,
      allowNull: false
    },
  });

  return Letters;
};  