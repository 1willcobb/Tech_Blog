const router = require('express').Router();
const { User } = require('../../models');

router.post('/', async (req, res) => {
    try {
        const userData = await User.create(req.body);
    
        req.session.save(() => {
          req.session.user_id = userData.id;
          req.session.logged_in = true;
    
          res.status(200).json(userData);
        });
      } catch (err) {
        res.status(400).json(err);
      }
})

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(()=>{
      res.status(204).send("Logged Out");
    });
  } else {
    res.status(404).send("Something went wrong");
  }
});

module.exports = router;