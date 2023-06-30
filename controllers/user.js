const User = require('../models/User');

const router = require('express').Router();


//REGISTER
router.post('/', async (req, res) => {
    try {
        const newUser = new User(req.body);
        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err.message);
    }
})

//LOGIN
router.post('/login', async (req, res) => {
    try {
        const getUser = await User.findOne({
            username: req.body.username,
            password: req.body.password
        }).populate('programs');
        res.status(200).json(getUser);
    } catch (err) {
        res.status(500).json(err);
    }
})


module.exports = router;