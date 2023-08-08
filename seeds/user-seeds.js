const { User } = require('../models');

const userData = [
    {
        username: 'danil',
        password: 'danil123'
    },
    {
        username: 'roger',
        password: 'roger123'
    },
    {
        username: 'rafael',
        password: 'rafael123'
    },
    {
        username: 'novak',
        password: 'novak123'
    }
];

const seedUsers = () => User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
});

module.exports = seedUsers;