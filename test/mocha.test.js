var expect = require('chai').expect;
var numbers = [1, 2, 3, 4, 5];

const sum=(...arr)=>{
  return arr.reduce((a,b)=>a+b)
}

describe("testing the developing environment", function() {

  
  it('test a sum got 15', function() {
    
    expect(sum(1, 2, 3, 4, 5)).to.equal(15);
  })
  
  
  
})