const { sequelize } = require('./models');

async function connectToDB() {
  try {
    await sequelize.authenticate();
    console.log('Соединение с Базой Данных прошло успешно');
  } catch (error) {
    console.log(`Соединение с Базой Данных прошло неудачно, ошибка: ${error.message}`);
  }
}

module.exports = { connectToDB };
