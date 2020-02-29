const fs = require('fs');

const baseDir = __dirname.replace(/routes/, '');

function addMapping(router, mapping) {
    for (const url in mapping) {
        if (mapping[url]) {
            router.all(`/koa/${url}`, mapping[url]);
        } else {
            console.log(`Invalid URL: ${url}`);
        }
    }
}

function addControllers(router, dir) {
    const files = fs.readdirSync(`${baseDir}${dir}`);
    const js_files = files.filter(f => f.endsWith('.js'));

    for (const f of js_files) {
        console.log(`process controller: ${f}...`);

        const mapping = require(`${baseDir}${dir}/${f}`);

        addMapping(router, mapping);
    }
}

module.exports = function (dir = 'controllers') {
    const router = require('koa-router')();

    addControllers(router, dir);

    return router;
};
