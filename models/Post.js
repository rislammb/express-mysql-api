module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define("Post", {
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postText: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  });

  Post.associate = (models) => {
    Post.hasMany(models.Comment, {
      as: "comments",
      foreignKey: "postId",
      onDelete: "cascade",
    });
    Post.hasMany(models.Like, {
      as: "likes",
      foreignKey: "postId",
      onDelete: "cascade",
    });
  };

  return Post;
};
