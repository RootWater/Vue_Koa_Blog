const exp = require('../utils/sequelize');

module.exports = exp.defineModel('user', {
    code: {
        type: exp.STRING(100),
        unique: true
    },
    name: exp.STRING(100),
    email: {
        type: exp.STRING(100),
        unique: true
    },
    loginTime: exp.DATEONLY
});
