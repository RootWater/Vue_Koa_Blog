const exp = require('../utils/sequelize');

module.exports = exp.defineModel('article', {
    title: exp.STRING(50),
    desc: exp.STRING(200),
    imgName: exp.STRING(100),
    imgSrc: exp.STRING(500),
    content: exp.STRING(10000)
});
