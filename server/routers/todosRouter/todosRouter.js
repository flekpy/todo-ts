const router = require('express').Router({ mergeParams: true });
const { Tags, Todo, TodosTags } = require('../../db/models');

router.post('/', async (req, res) => {
  try {
    const userId = req.params.id;
    const { title, description, selectTag } = req.body;
    // добавить юзер id
    const { dataValues } = await Todo.create({ title, description, user_id: userId });

    const arrTags = selectTag.map(async (tag) => {
      const tagData = await
      TodosTags.create({ todo_id: dataValues.id, tag_id: Number(tag) }, { raw: true });
      const tagsTodoData = await Tags.findOne({ where: { id: Number(tag) }, raw: true });
      return tagsTodoData;
    });

    Promise.all(arrTags)
      .then((tagsData) => {
        dataValues.Tags = tagsData;
        res.json(dataValues);
      });
  } catch (e) {
    res.json({ message: 'Ошибка сервера' });
  }
});

router.get('/', async (req, res) => {
  try {
    const userId = req.params.id;
    const allTodosUser = await Todo.findAll(
      {
        include: [{ model: Tags }],
        where: { user_id: userId },
      },
    );

    res.json(allTodosUser);
  } catch (error) {
    res.json({ message: 'Ошибка сервера' });
  }
});

router.put('/', async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);
    console.log(req.body);
    const { completed } = req.body;
    console.log(id, 'req params put');
    if (Number(id)) {
      const statusTodo = await Todo.update(
        { completed },
        { returning: true, where: { id }, raw: true },
      );
      console.log(statusTodo, 'туду обновленная');
      if (statusTodo[1][0].completed === true
        || statusTodo[1][0].completed === false) {
        res.json(id);
      }
    }
  } catch (e) {
    console.log(e);
    res.json({ message: 'Ошибка сервера' });
  }
});

router.delete('/', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodoTag = await TodosTags.destroy(
      {
        returning: true,
        truncate: { cascade: true },
        where: { todo_id: id },
        raw: true,
      },
    );

    const deleteTodo = await Todo.destroy(
      {
        returning: true,
        where: { id },
        raw: true,
      },
    );

    if (deleteTodo === 1) {
      res.json(id);
    }
  } catch (e) {
    console.log(e);
    res.json({ message: 'Ошибка сервера' });
  }
});

module.exports = router;
