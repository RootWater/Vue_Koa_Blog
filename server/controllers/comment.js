const { QUERY, DELETE } = require('../utils/sql');
const { User, Comment } = require('../utils/model');
const { addToken, verify } = require('../token');

const comment = async (ctx, next) => {
    const token = ctx.header.authorization;
    let { pid, content, user, count } = ctx.request.body;

    if (token) {
        const res = verify(token);

        if (user && res && res.exp <= new Date() / 1000) {
            ctx.status = 500;
            ctx.body = {
                type: 'LoginException',
                msg: '当前用户登录失效，请重新登录！'
            };
        } else {
            if (count === 0) {
                count = await Comment.count({ where: { pid: '' } }) + 1;
            }

            let result = await Comment.create({
                comment_content: content,
                comment_count: count,
                pid,
                user
            });
            const commentUser = await User.findByPk(user) || {};

            result = {
                id: result.id,
                count: result.comment_count,
                content: result.comment_content,
                user: commentUser.id,
                userName: commentUser.name,
                userEmail: commentUser.email,
                createdOn: result.createdOn,
                pid: result.pid
            };

            ctx.body = {
                result,
                token: addToken(commentUser)
            };
        }
    } else {
        ctx.status = 500;
        ctx.body = {
            type: 'LoginException',
            msg: '当前用户登录失效，请重新登录！'
        };
    }
};

const loadComment = async (ctx, next) => {
    const { pageNumber = 1, pageSize = 15 } = ctx.request.body;
    const createSql = (append = 'c.pid = \'\'') => `SELECT c.id, comment_content as content, c.createdOn, comment_count as count, pid, u.id as user, u.name as userName, u.email as userEmail FROM comment as c left join user as u on c.user = u.id where ${append} order by c.comment_count desc limit ${(pageNumber - 1) * pageSize}, ${pageSize}`;

    let result = { count: await Comment.count({ where: { pid: '' } }) };

    result.rows = await QUERY(createSql());

    let temp = [];
    for (const row of result.rows) {
        let rows = await QUERY(createSql(`c.comment_count = ${row.count}`));
        temp.push(...rows);
    }

    result.rows.push(...temp);

    ctx.body = result;
};

const delComment = async (ctx, next) => {
    const { id } = ctx.request.body;

    const result = await Comment.destroy({ where: { id } });
    ctx.body = { result: result > 0 };
};

module.exports = {
    'Comment/comment': comment,
    'Comment/loadComment': loadComment,
    'Comment/delComment': delComment
};
