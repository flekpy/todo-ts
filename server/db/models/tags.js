const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tags extends Model {
    static associate({ Todo, TodosTags }) {
      this.belongsToMany(Todo, { through: TodosTags, foreignKey: 'todo_id' });
    }
  }
  Tags.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    color: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Tags',
    timestamps: false,
  });
  return Tags;
};
