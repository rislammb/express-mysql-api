module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define("Like", {
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Like;
};
