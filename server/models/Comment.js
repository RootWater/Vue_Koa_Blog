const exp = require('../utils/sequelize');

module.exports = exp.defineModel('comment', {
    comment_content: exp.STRING(500),
    comment_count: exp.INTEGER,
    pid: exp.STRING(100),
    user: exp.STRING(100)
});
