const { Article } = require('../utils/model');

const queryPage = async (ctx, next) => {
    const { pageNumber = 1, pageSize = 15 } = ctx.request.body;

    const result = await Article.findAndCountAll({
        limit: pageSize,
        offset: (pageNumber - 1) * pageSize
    });

    ctx.body = {
        ...result
    };
};

const loadArticleById = async (ctx, next) => {
    const { id = '' } = ctx.request.body;

    const result = await Article.findByPk(id);

    ctx.body = {
        result
    };
};

module.exports = {
    'Article/queryPage': queryPage,
    'Article/loadArticleById': loadArticleById
};
