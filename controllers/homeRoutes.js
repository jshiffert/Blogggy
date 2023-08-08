const router = require('express').Router();

const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: { exclude: ['password']}
                    }
                },
                {
                    model: User,
                    attributes: { exclude: ['password']}
                }
            ],
        });

        
        res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;