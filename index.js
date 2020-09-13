const Koa = require('koa')
const Router = require('koa-router');
const process = require('shelljs')

const app = new Koa()
const router = new Router();


router.get('/', (ctx) => {
  ctx.body = 'user的首页' + __dirname;
});


router.get('/update', (ctx) => {
  try {
    process.exec('sudo cd /usr/local/myBlog && git fetch --all && git reset --hard origin/master && npm run go')
    ctx.body = 'update success'
  } catch (e) {
    ctx.body = e
  }
})

app.use(router.routes())
app.listen(3001)

// console.log('env: ', process.env.NODE_ENV)