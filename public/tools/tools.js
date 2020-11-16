const csv = require('csv-parser')
const fs = require('fs')

const {UPLOAD_PATH,PROPERTIES_TO_TRIM,SEARCH_PATTERN_FOR_AVERAGE_PAGEVIEW} = require("../constant");
 

const setHeaders=({header,index})=>{
  /* 
    Here is to set the options of how to manage the header of each field in the CSV file,
    if the field if not needed, then just remove it. 
    if the field name is not easy to use, then rename it
    or just keep it.

    The property that are not needed are defined in constant.js 
  
  */
  return PROPERTIES_TO_TRIM.includes(header)? null: 
    header.includes(' ')? header.replace(' ','_') : header
 }


const  processData=  (filename,uid)=>{
    let results = [];     
    
    fs.createReadStream(UPLOAD_PATH+'/'+filename)
    .pipe(csv({ mapHeaders:({header,index})=>setHeaders({header,index})}))
    .on('data', (data) => results.push(data))
    .on('end', () => {          
      let tree={};
      // console.log(global.state)
      results.forEach((result)=>{
        const{Date,Traffic_Type,Users,Sessions,Pageviews} = result;
        
        if (Object.keys(tree).includes(Date)){
          if(Object.keys(tree[Date]).includes(Traffic_Type)){
            tree[Date][Traffic_Type].Users.push(Users);
            tree[Date][Traffic_Type].Sessions.push(Sessions);
            tree[Date][Traffic_Type].Pageviews.push(Pageviews);
            

          }
          else{
            let traffic={};
            traffic.Users=[Users]
            traffic.Sessions=[Sessions]
            traffic.Pageviews=[Pageviews]
            tree[Date][Traffic_Type]=traffic;
            
          }
        }
        else{
            let date={};
            let tra_type={};
            tra_type.Users=[Users];
            tra_type.Sessions=[Sessions]
            tra_type.Pageviews=[Pageviews]
            date[Traffic_Type]=tra_type;
            tree[Date]=date;   
                    
        }
       

      })

      global.state.forEach(
        (filedata)=>{
          if(filedata.fileid===uid){
            filedata.dataTree= tree;
          }
        }
      )  

      const i=JSON.stringify(tree);
      fs.writeFileSync("./basictree.json",i,(err)=>{
        console.log(err)
      })
      
      

      

  })
}



 

module.exports = {processData}