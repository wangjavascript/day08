const koa = require('koa')

const app = new koa()

const static = require('koa-static')

const path = require('path')

const bodyparser = require('koa-bodyparser')

const router = require('./router/index')
const query = require('./middleware/query')

app.use(static(path.join(process.cwd(),'public')))

app.use(bodyparser())
app.use(query())
app.use(router.routes())
app.use(router.allowedMethods())

app.listen(process.env.PORT || 3000,()=>{
    console.log('服务启动成功')
})