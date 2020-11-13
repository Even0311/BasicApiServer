var router = require("koa-router")();

let result=JSON.stringify({message:"failed"});
router.get("/",async (ctx,next)=>{
    ctx.body={"message":"success"}
})



module.exports=router.routes();