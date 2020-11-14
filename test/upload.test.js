var chai = require('chai')
  , chaiHttp = require('chai-http');
 
chai.use(chaiHttp);
const app = require('../app')

const expect = chai.expect



describe( 'stat testing api', ( ) => {


  it('first api test', ( done ) => {
        chai.request(app.listen())
        .post('/v1/api/file')
        .set('Accept', 'application/json')
        .field("enctype","multipart/form-data")
        .attach('file',"./test1.csv")
        .end(( err, res ) => {
            expect(err).to.be.null;     
            console.log(res.body );                      
            //expect(res.body).to.deep.equal({message: "success"});
            
        
            done();
        })
        
        
  })
})