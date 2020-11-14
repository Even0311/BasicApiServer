var router = require("koa-router")();


router.get("/",async (ctx)=>{
    
    ctx.set("Content-Type","application/json");
    
    ctx.body={status:"success",message:"hello"};
})

module.exports=router.routes();