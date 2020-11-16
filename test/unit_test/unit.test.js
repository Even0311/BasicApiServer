const {recursionCalculateAverage,calculateRationOfRootNode,getTheMaxmiumSession,averageOfStringArray,
    getTheDayOfDate,getWeekList,sumOfStringArray}=require("../../public/tools/query_function")
  
  var expect = require('chai').expect;

  const {weekListFull,dataTreeShort,dataTreeFull,averagePageviewsShort,averagePageviewsFull,maximumWeeklyShort,maximumWeeklyFull,rationShort,rationFull}=require("./testData")
  const CONSTANTS=require("../../public/constant")


  describe(
      "This is the test for all the unit functions used to generate querys",
      ()=>{
          it(
            "averageOfStringArray",
            ()=>{
                expect(averageOfStringArray(['0'])).to.equal(0);
                expect(averageOfStringArray(['0','0','0'])).to.equal(0);
                expect(averageOfStringArray(['1','2','3'])).to.equal(2);
                expect(averageOfStringArray(['1','2','0'])).to.equal(1);
        
        
        
        
            }
          )

          it("recursionCalculateAverage",()=>
          {
            expect(recursionCalculateAverage(dataTreeShort,CONSTANTS.SEARCH_PATTERN_FOR_AVERAGE_PAGEVIEW,averageOfStringArray)).to.deep.equal(averagePageviewsShort);
            expect(recursionCalculateAverage(dataTreeFull,CONSTANTS.SEARCH_PATTERN_FOR_AVERAGE_PAGEVIEW,averageOfStringArray)).to.deep.equal(averagePageviewsFull);
          })

          it("return the sum of an array whose elements are all numbers represented in string",()=>
          {
            expect(sumOfStringArray(['0'])).to.equal(0)
            expect(sumOfStringArray(['0',1,2])).to.equal(3)
          })

          it("getTheDayOfDate,return the day of a week when given date",()=>
          {
              expect(getTheDayOfDate("20201117")).to.equal(2)
              expect(getTheDayOfDate("20201004")).to.equal(0)
              expect(getTheDayOfDate("2020904")).to.equal(5)
          })

          it("given an array of date, return every whole week starting with the first day of a week, which is sunday",()=>
          {
              expect(getWeekList(dataTreeShort)).to.deep.equal([]);
              expect(getWeekList(dataTreeFull)).to.deep.equal(weekListFull);

          })

          it("calculateRationOfRootNode",()=>
          {
              expect(calculateRationOfRootNode(dataTreeShort)).to.deep.equal(rationShort)
              expect(calculateRationOfRootNode(dataTreeFull)).to.deep.equal(rationFull)
          })

          it("getTheMaxmiumSession",()=>
          {
              expect(getTheMaxmiumSession(dataTreeShort,CONSTANTS.WEEKLY_NUMBERS_TO_CALCULATE)).to.deep.equal(maximumWeeklyShort)
              expect(getTheMaxmiumSession(dataTreeFull,CONSTANTS.WEEKLY_NUMBERS_TO_CALCULATE)).to.deep.equal(maximumWeeklyFull)
          })






      }
  )