const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class TodosTags extends Model {
    static associate() {
    }
  }
  TodosTags.init({
    todo_id: {
      type: DataTypes.INTEGER,
    },
    tag_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'TodosTags',
    timestamps: false,
  });
  return TodosTags;
};
