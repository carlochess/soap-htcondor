var expect = require("chai").expect;
var HTCondor = require("../index.js");

describe('HTCondor Collector', function(){
  var htcondor = new HTCondor({url:"http://172.28.128.3:8080/", wsdl : "wsdl/condorCollector.wsdl"});
  var coll;

  before(function(next) {
     htcondor.createCollector(function(err, c){
       if(err){
        console.log("Error al crear Collector")
        return;
       }
       coll = c;
       next();
     });
  });

  /*
  '$CondorVersion: 8.4.8 Jun 30 2016 BuildID: 373513 $'
  */
  it("should return HTCondor version string", function(next){
    coll.getVersionString(function(err, str){
      if(err){
        next(err);
        return;
      }
      expect(str.startsWith("$CondorVersion")).to.be.true;
      next();
    })
  });
  /*
  { status: { code: 'SUCCESS' },  message: '$CondorPlatform: x86_64_Ubuntu14 $' }
  */
  it("should return HTCondor platform string", function(next){
    coll.getPlatformString(function(err, str){
      if(err){
        next(err);
        return;
      }
      expect(str.startsWith("$CondorPlatform")).to.be.true;
      next();
    })
  });

});
