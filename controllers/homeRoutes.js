const router = require('express').Router();

const { Post, Comment, User } = require('../models');

router.get('/', async (req, res) => {
    try {
        const postData = await Post.findAll({
            include: [
                {
                    model: User,
                    attributes: { exclude: ['password']}
                },
                // {
                //     model: Comment,
                //     include: {
                //         model: User,
                //         attributes: { exclude: ['password']}
                //     }
                // },
            ],
        });

        const posts = postData.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            posts
        });
        // res.status(200).json(postData);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/login', (req, res) => {
    if (req.session.loggedIn) {
      res.redirect('/');
      return;
    }
    res.render('login');
});

router.get('/post/:id', async (req, res) => {
    try {
        const singlePost = await Post.findByPk(req.params.id, {
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
        const post = singlePost.map((project) => project.get({ plain: true }));

        res.render('homepage', {
            post
        });
        // res.status(200).json(singlePost)
    } catch (err) {
        res.status(500).json(err);
    }
})



module.exports = router;