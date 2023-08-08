const { Post } = require('../models');

const postData = [
    {
        title: 'Blog Post One',
        content: 'This is the first blog post.',
        date: 'July 21, 2023',
        user_id: 1
    },
    {
        title: 'Blog Post Two',
        content: 'This is the second blog post.',
        date: 'August 2, 2023',
        user_id: 2
    },
];

const seedPosts = () => Post.bulkCreate(postData);

module.exports = seedPosts;