const router = require('express').Router();

router.get('/', async (req, res) => {
  try {
    req.session.destroy();
    res.clearCookie('sid');
    return res.sendStatus(200);
  } catch (error) {
    return res.json(error);
  }
});
module.exports = router;
