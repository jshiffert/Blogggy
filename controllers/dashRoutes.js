const router = require('express').Router();

const { Post } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', withAuth, async (req, res) => {
    try{
        const postData = await Post.findAll({
            where: {
                user_id: req.session.user_id
            }
        });

        const posts = postData.map((project) => project.get({ plain: true }));
        
        res.render('dashboard', {
            posts,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/edit/:id', withAuth, async (req, res) => {
    try{
        const singlePost = await Post.findByPk(req.params.id);

        const post = singlePost.get({ plain: true });
        
        res.render('edit-post', {
            post,
            logged_in: req.session.logged_in,
        });
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get('/new', withAuth, (req,res) => {
    res.render('newpost', {
        logged_in: req.session.logged_in,
    });
});

module.exports = router;