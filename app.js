var Koa = require("koa");
var router = require("koa-router")();
var jsonp = require('koa-jsonp');
var bodyParser = require('koa-bodyparser');



var app=new Koa();

app.use(jsonp());

//配置post提交数据的中间件
app.use(bodyParser());

var api = require("./routes/api") ;
var string = require("./routes/string") ;
router.use("/v1/api",api);
router.use(string);


app.use(router.routes());   
app.use(router.allowedMethods());


module.exports=app;

app.listen(3000);