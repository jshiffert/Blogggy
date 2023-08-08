const { Comment } = require('../models');

const commentData = [
    {
        comment_text: 'This is a fine blog post.',
        user_id: 3,
        post_id: 1
    },
    {
        comment_text: 'This is also a fine blog post.',
        user_id: 4,
        post_id: 2
    }
];

const seedComments = () => Comment.bulkCreate(commentData);

module.exports = seedComments;