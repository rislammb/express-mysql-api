module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define("Comment", {
    commentBody: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  return Comment;
};
