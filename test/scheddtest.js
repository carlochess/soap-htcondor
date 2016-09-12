var expect = require("chai").expect;
var HTCondor = require("../index.js");

describe('HTCondor Schedduler', function(){
  var htcondor = new HTCondor({url:"http://172.28.128.3:8080/", wsdl : "wsdl/condorSchedd.wsdl"});
  var schedd;

  before(function(next) {
     htcondor.createSchedduler(function(err, c){
       if(err){
        console.log("Error al crear Schedd")
        return;
       }
       schedd = c;
       next();
     });
  });


  it("should return HTCondor  xxx", function(next){
    schedd.xxx({},function(err, str){
      if(err){
        next(err);
        return;
      }
      expect(str).to.equal(str);
      next();
    })
  });

});
