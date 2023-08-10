const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
  try {
    //TODO -> add algorithmic way to display top 3 posts OR change this view every 10 seconds?

    res.render('homepage', {
      logged_in: req.session.logged_in
    });
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
});

router.get('/feed', async (req, res) => {
  try {
    res.render('feed', {
      logged_in: req.session.logged_in
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
