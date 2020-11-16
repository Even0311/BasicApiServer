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


  module.exports= {recursionCalculateAverage,calculateRationOfRootNode,getTheMaxmiumSession,averageOfStringArray,
    getTheDayOfDate,getWeekList,sumOfStringArray}