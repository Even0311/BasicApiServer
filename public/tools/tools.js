const csv = require('csv-parser')
const fs = require('fs')

const {UPLOAD_PATH,PROPERTIES_TO_TRIM,SEARCH_PATTERN_FOR_AVERAGE_PAGEVIEW} = require("../../public/constant");
 




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

      

  })
}
const averageOfStringArray=((arrayToCalculate)=>{
  let Sum=0;
  let averageNumber=0;
  try{
    if(arrayToCalculate.length !==0){
      arrayToCalculate.forEach(
        (element)=>{
          Sum+= parseFloat(element);
        }
      )
      averageNumber = Sum/arrayToCalculate.length 
    }
    return averageNumber.toString();

  }
  catch(e){
    if(arrayToCalculate.length===0){
      return 0
    }
    else{
      throw e;
    }
  }
})

const setPagePerDayPerType=(tree)=>{
  
}

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



var recursionCalculateAverage=(node,pattern,cb)=>{
  let result={};
  let children=Object.keys(node);
  children.forEach(
      (child)=>{
          result[child] =  help_RecursionCalculateAverage(node[child],pattern,cb,{})
      }
  )
  return result;
}

var help_RecursionCalculateAverage=(node,pattern,cb,obj)=>{
  let children=Object.keys(node);
  if(children.length){
      if(children.includes(pattern)){
          return cb(node[pattern]);
      }
      else{
          children.forEach(
              (child)=>{
                  obj[child]=help_RecursionCalculateAverage(node[child],pattern,cb,{})
              }
          )
      }
  }
  return obj;

}

var calculateRationOfRootNode=(RootNode)=>{
  let resultJson={};
  let children=Object.keys(RootNode);
  // children.forEach(
  //   (child)=>{
  //     resultJson[child]=calculateRationOfDateNode(RootNode[child]);
  //   }
  // )
  children.map(
    (child)=>{
      resultJson[child]=calculateRationOfDateNode(RootNode[child]);
    }
  )
  return resultJson;
}
var calculateRationOfDateNode=(Node)=>{
  let children=Object.keys(Node);
  let sumOfUsers=0;
  let sumOfSessions=0;
  children.forEach(
    (child)=>{
      sumOfUsers+= Node[child].Users.map((userString)=>parseFloat(userString)).reduce((accumulator, currentValue) => accumulator + currentValue)
      
      sumOfSessions+= Node[child].Sessions.map((userString)=>parseFloat(userString)).reduce((accumulator, currentValue) => accumulator + currentValue)
    }
  )
  return  sumOfSessions==0? 0 : sumOfUsers/sumOfSessions

}





const getTheDayOfDate=(date)=>{
  // cannot confirm what does the string look like in case of months before Oct
  // for example, how to represent Sep, 09 or 9
  let year, month, day=0
  try{
    if(date.length===7){
      year= parseInt(date.slice(0,4));
      month= parseInt(date[4]);
      day= parseInt(date.slice(5,6));
      
   }
   else if(date.length===8){
      year= parseInt(date.slice(0,4));
      month= parseInt(date.slice(4,6));
      day= parseInt(date.slice(6,8));
   }
  }catch(error){
    throw error
  }
 
  
  // The month means the index of the month array from 0 
  return new Date(year,--month,day).getDay();
}

const getWeekList=(Node)=>{
  let children=Object.keys(Node);

  let weekList=[];
  if(children.length){
    
    let correctIndex=0;

    
    children.forEach(
      (child)=>{
        if(correctIndex === getTheDayOfDate(child)){
            
          if(correctIndex===0){
            week=[];
            week.push(child);
            
            correctIndex++

          }
          
          else if(correctIndex===6){
            week.push(child);
            
            correctIndex=0;
            weekList.push(week)
           
          }
          else {
              week.push(child)
               
              correctIndex++
              
            }
        
        
        }
      })
    
  }
  return weekList;
}

const getTheMaxmiumSession=(Node,Pattern="Sessions")=>{
  weekList=getWeekList(Node);
  let resultObj={}
  weekList.forEach(
    (element)=>{
      let timePeriod= element[0]+'-'+element[6];
      
      resultObj[timePeriod]= _getTheMaxmiumSessionPerWeek(element,Node,Pattern);
    }
  )
  return resultObj
}

const _getTheMaxmiumSessionPerWeek=(element,Node,Pattern)=>{
   let resultObj={};
   element.forEach(
     (eachDay)=>{
       let differentTrafficTypes=Object.keys(Node[eachDay]);
       differentTrafficTypes.forEach(
         (type)=>{
            if(resultObj[type]){
              resultObj[type]= resultObj[type]< sumOfStringArray(Node[eachDay][type][Pattern])? sumOfStringArray(Node[eachDay][type][Pattern]) : resultObj[type]
            }
            else{
              resultObj[type]= sumOfStringArray(Node[eachDay][type][Pattern])
            }
         }
       )
     }
   )
   return resultObj;

   
}

const sumOfStringArray=(array)=>{
  let sum=0;
  array.map(
    (ele)=>{
      sum += parseInt(ele);
    }
  )
  return sum
}


 

module.exports = {processData, averageOfStringArray,getTheDayOfDate,recursionCalculateAverage,calculateRationOfRootNode,getWeekList,getTheMaxmiumSession}