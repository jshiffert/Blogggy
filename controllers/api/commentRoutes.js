const router = require('express').Router();
const { Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    try {
        const commentData = await Comment.findAll();
        res.json(commentData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req,res) => {
    try {
        const commentData = await Comment.create({
            comment_text: req.body.comment_text,
            user_id: req.session.user_id,
            post_id: req.body.post_id
        })
        res.json(commentData);
    } catch (err) {
        res.status(400).json(err);
    }
});

module.exports = router;