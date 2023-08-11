const router = require('express').Router();
const { Post, User, Comment } = require('../../models');
const withAuth = require('../../utils/auth');

router.get('/', async (req,res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password']}
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: { exclude: ['password']}
                    }
                },
            ],
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req,res) => {
    try {
        const postData = await Post.findByPk(req.params.id, {
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password']}
                },
                {
                    model: Comment,
                    include: {
                        model: User,
                        attributes: { exclude: ['password']}
                    }
                },
            ],
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.post('/', withAuth, async (req,res) => {
    try {
        req.body.date = new Date();
        const postData = await Post.create({
            title: req.body.title,
            content: req.body.content,
            date: req.body.date,
            user_id: req.session.user_id
        });
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.put('/:id', withAuth, async (req,res) => {
    try {
        const postData = await Post.update(
            {
                title: req.body.title,
                content: req.body.content
            },
            {
                where: {
                    id: req.params.id
                }
            }
        );
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id.' });
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.delete('/:id', withAuth, (req,res) => {
    try {
        const postData = Post.destroy({
            where: {
                id: req.params.id,
            }
        });
        if (!postData[0]) {
            res.status(404).json({ message: 'No post with this id.' });
            return;
        }
        res.json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;