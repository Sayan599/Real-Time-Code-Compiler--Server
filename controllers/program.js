const Program = require('../models/Program');
const User = require('../models/User');
const router = require('express').Router();

//Save Code
router.post('/', async (req, res) => {
    try {
        const user = await User.findById(req.body.uniqueId);

        const newCode = new Program({
            username: user.username,
            code: req.body.code,
            userId: user._id,
            title: req.body.title
        })
        const code = await newCode.save();
        await User.updateOne({ _id: user._id }, { $push: { programs: code._id } });
        res.status(200).json(code);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Update Code
router.put('/update/:id', async (req, res) => {
    //params => id
    //body => code,title
    try {
        const prog = await Program.find({ userId: req.params.id });
        const title = req.body.title;
        const uniqueId = req.body.Id;
        const code = prog.filter(p => (p.title === title));
        // const codeDb = await Program.findByIdAndUpdate(code[0]._id, { $set: { code: req.body.code } }, { new: true });
        const codeDb = await Program.findByIdAndUpdate(uniqueId, { $set: { code: req.body.code, title: req.body.title } }, { new: true });
        res.status(200).json(codeDb);
    } catch (err) {
        res.status(500).json(err);
    }
})

//Delete Code
router.delete('/delete/:id', async (req, res) => {
    try {
        const user = await Program.findById(req.params.id);
        console.log(user);
        await Program.findByIdAndDelete(req.params.id);
        const updatedUSer = await User.updateOne({ _id: user.userId }, {
            $pull: {
                programs: req.params.id
            }
        }, { new: true })
        res.status(200).json(updatedUSer);
    } catch (err) {
        res.status(500).json(err);
    }

})

router.get('/:id', async (req, res) => {
    try {
        const code = await Program.findById(req.params.id).populate('userId');
        res.status(200).json(code);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get all
router.post('/userprogs', async (req, res) => {
    try {
        const user = await User.findById(req.body.Id).populate('programs');
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err);
    }
});

//Get by UserId
router.get('/user/:id', async (req, res) => {
    try {
        const program = await Program.find({ userId: req.params.id });
        res.status(200).json(program[0]);
    } catch (err) {
        res.status(500).json(err);
    }
})





module.exports = router;