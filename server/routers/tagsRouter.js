const router = require('express').Router({ mergeParams: true });
const { Tags } = require('../db/models');

router.get('/', async (req, res) => {
  try {
    const allTags = await Tags.findAll({ raw: true });
    res.json(allTags);
  } catch (e) {
    res.json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
