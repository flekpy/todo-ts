module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'работа',
      },
      {
        name: 'учеба',
      },
      {
        name: 'развлечения',
      },
      {
        name: 'семья',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
