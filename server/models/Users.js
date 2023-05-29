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
      allowNull: true
    }, sentRequest: [{
      username: { type: String, default: '' }
    }],
    request: [{
      userId: { type: DataTypes.Schema.Types.ObjectId, ref: 'User' },
      username: { type: String, default: '' }
    }],
    friendsList: [{
      friendId: { type: DataTypes.Schema.Types.ObjectId, ref: 'User' },
      friendName: { type: String, default: '' }
    }],
    totalRequest: { type: Number, default: 0 }
  });

  return Users;
};  