const router = require('express').Router();
const { Blog } = require('../../models');

router.post('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    console.log(blogData);
    res.status(200).json(blogData);
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

module.exports = router;
