const router = require('koa-router')()

//查
router.get('/api/list',async ctx =>{
    let { pagenum=1,limit=3 } = ctx.query
    let startIndex = (pagenum-1)*limit
    let data = await ctx.mysql.query(`select * from orderlist limit ${startIndex},${limit}`)
    ctx.body = data
})

//增
router.post('/api/add',async ctx =>{
    let {title,type,time} = ctx.request.body
    if(title&&type&&time){
        let user = await ctx.mysql.query('select * from orderlist where title=?',[title])
        if(user.length){
            ctx.body={code:0,msg:'此人已存在'}
        }else{
            try{
                await ctx.mysql.query('insert into orderlist (title,type,time) values (?,?,?)',[title,type,time])
                ctx.body={code:1,msg:'添加成功'}
            }catch(e){
                ctx.body={
                    code:0,msg:e
                }
            }
        }
    }else{
        ctx.body={code:2,msg:'参数缺失'}
    }
})

//删
router.get('/api/del',async ctx=>{
    let {id} = ctx.query
    if(id||id===0){
        try{
            await ctx.mysql.query('delete from orderlist where id=?',[id])
            ctx.body={code:1,msg:'删除成功'}
        }catch(e){
            ctx.body={code:0,msg:e}
        }
    }else{
        ctx.body={code:2,msg:'参数缺失'}
    }
})

//修改
router.post('/api/edit',async ctx =>{
    let {title,type,time,id}=ctx.request.body
    if(title&&type&&time){
        try{
            await ctx.mysql.query('update orderlist set title=?,type=?,time=? where id=?',[title,type,time,id])
            ctx.body={code:1,msg:'修改成功'}
        }catch(e){
           ctx.body={code:0,msg:e}
        }
    }else{
        ctx.body={code:2,msg:'参数缺失'}
    }
})

module.exports = router