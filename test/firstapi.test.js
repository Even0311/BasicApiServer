var chai = require('chai')
  , chaiHttp = require('chai-http');
 
chai.use(chaiHttp);
const app = require('../app')

const expect = chai.expect



describe( 'stat testing api', ( ) => {


  it('first api test', ( done ) => {
        chai.request(app.listen())
        .get('/v1/api')
        .set('Accept', 'application/json')
        .end(( err, res ) => {
            

            expect(res).to.be.an('object')
            
            
            expect(res.body).to.deep.equal({message: "success"});
            
          
            //expect(res).to.be.a('json')
            done()
        })
  })
})