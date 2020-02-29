const { User } = require('../utils/model');
const { Op } = require('../utils/sequelize');
const { addToken } = require('../token');

const checkUser = async (ctx, next) => {
    const { name, email, loginTime } = ctx.request.body;

    let users = await User.findAll({ where: { [Op.or]: [{ name }, { email }] } });

    let result = {
        user: null
    };

    if (users.length > 0) {
        users = users.filter(user => user.name === name && user.email === email);

        if (users.length > 0) {
            result.user = users[0];
            result.token = addToken(result.user);
        }
    } else {
        result.user = await User.create({
            code: `u${new Date().getTime()}`,
            name,
            email,
            loginTime
        });
        result.token = addToken(result.user);
    }

    ctx.body = result;
};

module.exports = {
    'Login/checkUser': checkUser
};
