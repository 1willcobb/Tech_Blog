const router = require('express').Router();
const { Blog } = require('../../models');

router.get('/', async (req, res) => {
  try {
    const blogData = await Blog.findAll();

    const blogs = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'server Error' });
  }
});

router.post('/', async (req, res) => {
  try {
    const new_blog = await Blog.create({
      ...req.body,
      author_id: req.session.user_id,
    });

    res.status(200).json({ message: 'success', new_blog });
  } catch (error) {
    console.error();
    res.status(500).json({ message: 'server Error' });
  }
});

module.exports = router;
