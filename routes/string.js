var router = require("koa-router")();

let result= JSON.stringify({status:"success",message:"hello"});
router.get("/",async (ctx)=>{
    
    ctx.set("Content-Type","application/json");
    
    ctx.response.body=result;
})

module.exports=router.routes();