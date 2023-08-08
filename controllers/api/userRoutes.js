const router = require('express').Router();
const { User } = require('../../models');

router.post('/login', async (req, res) => {
    try {
        // Search for email in database
        const userData = await User.findOne({
            where: {
                email: req.body.email
            }
        })
        
        //Continue here

    } catch (error) {
        console.log(error)
        res.status(500).json(error)
    }
})