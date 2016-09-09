var expect = require("chai").expect;
var HTCondor = require("../index.js");

describe('HTCondor', function(){
  var htcondor = htcondor = new HTCondor({url:"http://localhost:8080/", wsdl : "wsdl/condorCollector.wsdl"});
  var schedd;
  
  before(function(next) {
     htcondor.createSchedd(function(err, c){
       if(err){
        console.log("Error al crear Collector")
        return;
       }
       coll = c;
       next();
     });
  });
  
  
  it("should return HTCondor version string", function(next){
    schedd.getVersionString(function(err, str){
      if(err){
        next(err);
        return;
      }
      expect(str).to.equal(str);
      next();
    })
  });
  
});
