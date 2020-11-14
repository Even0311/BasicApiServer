var router = require("koa-router")();
var api = require("./v1/api");
router.use(async(ctx,next)=>{
    console.log("v1-----"+ctx.request.header.host);
    ctx.state.__HOST__='http://'+ctx.request.header.host;
    await next();
})

router.use("/api",api);



module.exports=router.routes();