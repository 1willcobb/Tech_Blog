const router = require('express').Router();
const { User, Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    //TODO -> add algorithmic way to display top 3 posts OR change this view every 10 seconds?

    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      limit: 3,
    });

    const blogs = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    res.render('homepage', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/feed', async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
    });

    const blogs = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    console.log(blogs);

    res.render('feed', {
      blogs,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/dashboard', async (req, res) => {
  try {
    res.render('dashboard', {
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/login', (req, res) => {
  if (req.session.logged_in) {
    res.redirect('/');
    return;
  }

  res.render('login');
});

module.exports = router;
