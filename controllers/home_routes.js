const router = require('express').Router();
const { User, Blog } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
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
      order: [['created_at', 'DESC']],
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

router.get('/feed', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
        },
      ],
      order: [['created_at', 'DESC']],
    });

    const blogs = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    const processedBlogs = blogs.map((blog) => {
      return {
        ...blog,
        isOwner: blog.author_id === req.session.user_id,
      };
    });

    res.render('feed', {
      processedBlogs,
      logged_in: req.session.logged_in,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/dashboard', withAuth, async (req, res) => {
  try {
    const blogData = await Blog.findAll({
      include: [
        {
          model: User,
          attributes: ['username'],
          exclude: ['password'],
        },
      ],
      where: {
        author_id: req.session.user_id,
      },
      order: [['created_at', 'DESC']],
    });

    const blogs = blogData.map((blog) => {
      return blog.get({ plain: true });
    });

    const processedBlogs = blogs.map((blog) => {
      return {
        ...blog,
        isOwner: blog.author_id === req.session.user_id,
      };
    });

    res.render('dashboard', {
      processedBlogs,
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
