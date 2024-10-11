module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
    },
    username: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false,
      unique: true,
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
