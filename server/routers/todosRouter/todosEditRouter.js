const router = require('express').Router({ mergeParams: true });
const { Tags, Todo, TodosTags } = require('../../db/models');

router.put('/', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, selectTag } = req.body;

    const updateTodo = await Todo.update(
      { title, description },
      {
        returning: true, plain: true, where: { id }, raw: true,
      },
    );
    const deleteAllTag = await TodosTags.destroy({
      returning: true,
      truncate: { cascade: true },
      where: { todo_id: id },
      raw: true,
    });

    const arrTags = selectTag.map(async (tagID) => {
      const { dataValues } = await TodosTags.create({ todo_id: id, tag_id: Number(tagID) });
      const tagData = await Tags.findOne({ where: { id: Number(tagID) }, raw: true });
      return tagData;
    });
    Promise.all(arrTags)
      .then((tagData) => {
        updateTodo[1].Tags = tagData;
        res.json(updateTodo[1]);
      });
  } catch (e) {
    console.log(e);
    res.json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
