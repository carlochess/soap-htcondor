var HTCondor = require("../index.js")
var join = require("path").join

var job = {
    universe: "vanilla",
    executable: "/bin/sleep",
    arguments: "31",
    notification: "never",
    owner: "vagrant",
    type: "5",
    //transfer_output_files: 'bogus',
    requirements: 'TRUE',
    shouldtransferfiles: "yes",
    when_to_transfer_output: "ON_EXIT",
    out: "example1.out",
    err: "example1.err",
    log: "example1.log",
    iwd: "/tmp",
    queue: 1
};

var htcondor = new HTCondor({url:"http://172.28.128.3:8080/", wsdl : join(".." , "wsdl", "condorSchedd.wsdl")});

htcondor.createSchedduler(function(err, schedd){
   if(err){
    console.log("Error al crear Schedd", err)
    return;
   }

   schedd.createJob(job, function(err, job){
       if(err){
         console.log(err)
         return
       }
       //console.log(job)
   })

   /*schedd.createDagJob(job, function(err, job){
       console.log(job)
   })*/
})
