module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Tags', [
      {
        name: 'работа',
        color: '#D2CEFF',
      },
      {
        name: 'учеба',
        color: '#D1E5F7',
      },
      {
        name: 'развлечения',
        color: '#FFCECE',
      },
      {
        name: 'семья',
        color: '#DAF2D6',
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Tags', null, {});
  },
};
