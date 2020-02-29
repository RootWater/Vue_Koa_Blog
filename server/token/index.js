const jwt = require('jsonwebtoken');
const serect = 'first-token';

const addToken = (userInfo) => {
    const token = jwt.sign({
        user: userInfo.code,
        id: userInfo.id
    }, serect, { expiresIn: '30m' });

    return token;
};

const verify = (token) => {
    return jwt.verify(token.replace(/Bearer +/, ''), serect);
};

module.exports = {
    addToken,
    verify
};
