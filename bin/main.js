var HTCondor = require("../index.js")
var join = require("path").join

var job = {
    universe: "VANILLA",
    executable: "/bin/sleep",
    arguments: "31",
    notification: "never",
    owner: "rooot",
    type: "5",
    requirements: 'TRUE',
    shouldtransferfiles: "yes",
    when_to_transfer_output: "ON_EXIT",
    out: "example1.out",
    err: "example1.err",
    log: "example1.log",
    iwd: "/tmp",
    queue: 1
};

var dockerJob = {
    universe: "VANILLA",
    dockerimage: "haskell",
    executable: "/usr/bin/ruby",
    arguments: '-e "puts 2+2"',
    notification: "never",
    owner: "rooot",
    type: "5",
    requirements: 'TRUE',
    shouldtransferfiles: "no",
    when_to_transfer_output: "ON_EXIT",
    out: "example1.out",
    err: "example1.err",
    log: "example1.log",
    iwd: "/tmp",
    queue: 1
};

var dagJob = {
    dagLocation: join(__dirname, "..", "test", "dag", "dagman.dag"),
    owner: "rooot"
};


var htcondor = new HTCondor({url:"http://localhost:8080/", wsdl : join(__dirname, ".." , "wsdl", "condorSchedd.wsdl")});

htcondor.createSchedduler(function(err, schedd){
   if(err){
    console.log("Error al crear Schedd", err)
    return;
   }

   /*schedd.createJob(job, function(err, job){
       if(err){
         console.log("Error al enviar job",err)
         return
       }
       console.log(job)
   })*/

   schedd.createDagJob(dagJob, function(err, job){
       if(err){
         console.log("Error al enviar dag",err)
         return
       }
       console.log(job)
   })

   /*schedd.createDockerJob(dockerJob, function(err, job){
       if(err){
         console.log("Error al enviar dag",err)
         return
       }
       console.log(job)
   })*/
})
