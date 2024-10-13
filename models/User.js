module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      primaryKey: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  User.associate = (models) => {
    User.hasMany(models.Post, {
      as: "posts",
      foreignKey: "username",
      onDelete: "cascade",
    });
    User.hasMany(models.Comment, {
      as: "comments",
      foreignKey: "username",
      onDelete: "cascade",
    });
  };

  return User;
};
