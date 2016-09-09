// HTCondor.js
var soap = require("soap");
 
function HTCondor(config){
   if (!(this instanceof HTCondor)) {
    return new HTCondor(config);
   }
   var self = this
   self.config = config;
}
 
 
HTCondor.prototype.createSchedduler = function (cb){
   soap.createClient(config.wsdl, {},
     function(err, client){
        if (err) {
            cb(err);
        } else {
        cb(null,new Schedd(client));
        }
   },config.url);
}

HTCondor.prototype.createCollector = function (cb){
   soap.createClient(config.wsdl, {},
     function(err, client){
        if (err) {
            cb(err);
        } else {
        cb(null,new Collector(client));
        }
   },config.url);
}

// main.js

var htcondor = new HTCondor({url:"http://localhost:8080/", wsdl : "wsdl/condorSchedd.wsdl"});

htcondor.createSchedduler(function(err, schedd){
   if(err){
    console.log("Error al crear Schedd")
    return;
   }
   
   schedd.createJob({}, function(err, job){
       console.log(job)
   })
})

htcondor.createCollector(function(err, coll){
   if(err){
    console.log("Error al crear Collec")
    return;
   }
   
   coll.createJob({}, function(err, job){
       console.log(job)
   })
})
