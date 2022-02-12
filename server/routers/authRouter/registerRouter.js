const router = require('express').Router();
const bcrypt = require('bcrypt');
const { validationResult } = require('express-validator');
const { User } = require('../../db/models');
const UserDto = require('../../dtos/userDtos');

router.post('/', async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.json({ message: 'Ошибка при регистрации', errors });
    }
    const { name, email, password } = req.body;
    const candidateName = await User.findOne({ where: { name } });
    const candidateEmail = await User.findOne({ where: { email } });

    if (candidateName) {
      return res.json({ message: 'Пользователь с таким именем уже существует' });
    }

    if (candidateEmail) {
      return res.json({ message: 'Пользователь с такой почтой уже существует' });
    }

    const hashPassword = await bcrypt.hash(password, 7);

    const newUser = await User.create({ name, email, password: hashPassword });
    const userDto = new UserDto(newUser);
    req.session.user = { id: userDto.id, email: userDto.email };

    return res.json({ message: 'Регистрация прошла успешно', user: userDto });
  } catch (error) {
    return res.json({ message: 'Регистрация прошла не удачно, попробуйте позже' });
  }
});

module.exports = router;
