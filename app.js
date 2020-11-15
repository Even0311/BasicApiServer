var Koa = require("koa");
var router = require("koa-router")();
var jsonp = require('koa-jsonp');
var bodyParser = require('koa-bodyparser');
var render = require('koa-art-template');
var path = require("path");
var static = require('koa-static');



var app=new Koa();

global.state=[];
render(app, {
    root: path.join(__dirname, 'views'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production',
    dateFormat:dateFormat=function(value){
        return sd.format(value, 'YYYY-MM-DD HH:mm');
    } 
});


app.use(static(__dirname + '/public'));

//middleware for Post method
app.use(jsonp());
app.use(bodyParser());

app.use(static(__dirname + '/public'));

var v1 = require("./routes/v1") ;
var index = require("./routes/index") ;




router.use("/v1",v1);

//Here is the router of the main page
router.use(index);


app.use(router.routes());   
app.use(router.allowedMethods());


module.exports=app;

app.listen(3000);