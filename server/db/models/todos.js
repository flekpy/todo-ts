const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    static associate({ User, Tags, TodosTags }) {
      this.belongsTo(User, { foreignKey: 'id' });
      this.belongsToMany(Tags, { through: TodosTags, foreignKey: 'tag_id' });
    }
  }
  Todo.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    completed: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    modelName: 'Todo',
    timestamps: false,
  });
  return Todo;
};
