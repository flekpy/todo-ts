const router = require('express').Router({ mergeParams: true });
const { Tags, Todo, TodosTags } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const { title, description, selectTag } = req.body;
    // добавить юзер id
    const { dataValues } = await Todo.create({ title, description, user_id: 1 });

    const arrTags = selectTag.map(async (tag) => {
      const tagData = await
      TodosTags.create({ todo_id: dataValues.id, tag_id: Number(tag) }, { raw: true });
      const tagsTodoData = await Tags.findOne({ where: { id: Number(tag) }, raw: true });
      return tagsTodoData;
    });

    Promise.all(arrTags)
      .then((tagsData) => {
        dataValues.tags = tagsData;
        res.json(dataValues);
      });
  } catch (e) {
    res.json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
