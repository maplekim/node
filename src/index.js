const Koa = require('koa');
const Router = require('koa-router');
const serve = require('koa-static');
const passport = require('passport');

const app = new Koa();
const router = new Router();
app.use(serve(__dirname + '/static'));
app.use(router.routes());
app.use(router.allowedMethods());
app.use(passport.initialize());

router.get('/', (ctx) => {
    ctx.body = '홈';
});

router.get('/about', (ctx) => {
    ctx.body = '소개';
});

router.get('/about/:name', (ctx) => {
    const { name } = ctx.params;
    ctx.body = name + '의 소개';
});

app.listen(3400, () => {
    console.log(`server start port: 3400`);
});