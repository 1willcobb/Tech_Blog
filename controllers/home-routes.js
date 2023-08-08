const router = require('express').Router();
const { Blog } = require('../models');

router.get('/', async (req, res) => {
    try {
        res.render('homepage')
    } catch (error) {
        console.log(error);
        res.status(500).json(error)
    }
})



module.exports = router;