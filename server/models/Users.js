module.exports = (sequelize, DataTypes) => {

  const Users = sequelize.define("Users", {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    token: {
      type: DataTypes.STRING,
      allowNull: true
    },
    userImage: {
      type: DataTypes.STRING,
      allowNull: true,
      defaultValue: ""
    },
    sentRequestsList: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
    friendsList: {
      type: DataTypes.ARRAY(DataTypes.STRING, DataTypes.STRING),
      allowNull: true,
      defaultValue: []
    },
  });

  return Users;
};  