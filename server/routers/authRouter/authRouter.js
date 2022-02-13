const router = require('express').Router();
const { User } = require('../../db/models');
const UserDto = require('../../dtos/userDtos');

router.get('/', async (req, res) => {
  try {
    if (req.session.user) {
      const userCheckData = await User.findOne({ where: { id: req.session.user.id }, raw: true });
      const userDto = new UserDto(userCheckData);
      req.session.user = { id: userCheckData.id, email: userCheckData.email };

      return res.json({ user: userDto });
    }
    return res.json({ message: 'пользователь не авторизован' });
  } catch (error) {
    return res.json(error);
  }
});

module.exports = router;
