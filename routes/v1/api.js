const router = require("koa-router")();
const multer = require('koa-multer');
//const path = require('path');
const fs = require("fs");
const CONSTANTS=require("../../public/constant");

// settings for file upload middleware 
var storage = multer.diskStorage({
    destination: async function (req, file, cb) {

        /*Setting the path for the file uploaded*/
        if(!fs.existsSync(CONSTANTS.UPLOADPATH)) {
             fs.mkdirSync(CONSTANTS.UPLOADPATH)
        }  

        cb(null, CONSTANTS.UPLOADPATH); 
              
          
    },
    filename: function (req, file, cb) {   /*After the upload completing rename the file*/
        var fileFormat = (file.originalname).split(".");   
        /*Get the extention name, but should have better way*/
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
    
})
var upload = multer({ storage: storage });

router.get("/",async (ctx,next)=>{
    
    
    // ctx.body={"message":"success"}
    await ctx.render("index.html")
})
/* Here is the API endpoint to upload csv files, but please be careful that there are several requirements
for API consumers
 1. the paramater of upload.single() has to be the field name of the input elements. 
        for example <input type='file' name='file'>

 2.The enctype of the form has to be enctype="multipart/form-data"
*/
router.post("/file", upload.single('file'),async(ctx)=>{
    console.log("ctx.req====>"+ctx.req.file.filename);
    const unique_id = ctx.req.file.filename.split(".")[0];
    const unique_sauce = ctx.request.header.host +"/upload" +"/"+ ctx.req.file.filename
    
    ctx.body={
        
        unique_id,
        unique_sauce
    }
})                                                                                                                                                                                                                                

module.exports=router.routes();