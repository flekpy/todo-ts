module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('TodosTags', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      todo_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Todos',
        },
      },
      tag_id: {
        type: Sequelize.INTEGER,
        references: {
          model: 'Tags',
        },
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('TodosTags');
  },
};
