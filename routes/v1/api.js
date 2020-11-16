const router = require("koa-router")();
const multer = require('koa-multer');
//const path = require('path');
const fs = require("fs");
const CONSTANTS=require("../../public/constant");
const {processData,recursionCalculateAverage,calculateRationOfRootNode, averageOfStringArray,getTheMaxmiumSession} = require("../../public/tools/tools");

// settings for file upload middleware 
var storage = multer.diskStorage({
    destination: async function (req, file, cb) {

        /*Setting the path for the file uploaded*/
        if(!fs.existsSync(CONSTANTS.UPLOAD_PATH)) {
             fs.mkdirSync(CONSTANTS.UPLOAD_PATH)
        }  

        cb(null, CONSTANTS.UPLOAD_PATH); 
              
          
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
    
    const unique_id = ctx.req.file.filename.split(".")[0];
    const unique_sauce = ctx.request.header.host +"/upload" +"/"+ ctx.req.file.filename
    
    ctx.body={
        
        unique_id,
        unique_sauce
    }
    global.state.push({fileid:unique_id,dataTree:null})
    
    processData(ctx.req.file.filename, unique_id);
    
})  

router.get("/file/:id", async(ctx)=>{
    const {id} = ctx.params;
    let AnswerJson={};
    global.state.forEach(
        (filedata)=>{
            if(id===filedata.fileid){
                if(filedata.dataTree===null){
                    AnswerJson={message:'Sorry the data is still processing, please wait for a while'}
                }
                else{
                    AnswerJson.averagePageviewsPerDayPerType= recursionCalculateAverage(filedata.dataTree,CONSTANTS.SEARCH_PATTERN_FOR_AVERAGE_PAGEVIEW,averageOfStringArray);
                    AnswerJson.rationOfUserSessions= calculateRationOfRootNode(filedata.dataTree);
                    AnswerJson.maxmiumSessionsPerWeek= getTheMaxmiumSession(filedata.dataTree,CONSTANTS.WEEKLY_NUMBERS_TO_CALCULATE)
                }
            }
        }
    )
    AnswerJson= JSON.stringify(AnswerJson);
    ctx.body=AnswerJson? AnswerJson: {message:"No file related to the id provided"};
})

module.exports=router.routes();