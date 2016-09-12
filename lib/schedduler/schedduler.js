'use strict';

var async = require("async")
var cautil = require("../util/classAdCons")

function Schedduler(client, options) {
    this.client = client;
    this.options = options;
}

Schedduler.prototype.constructor = Schedduler;
require('./job')(Schedduler);
require('./files')(Schedduler);
require('./cluster')(Schedduler);
require('./transaction')(Schedduler);

Schedduler.prototype.xxx = function(params, cb) {
    cb(null, "Hola")
}

//-----------------------------------------


/*
universe: "vanilla",
executable: "sleep",
arguments: "10",
notification: "never",
//transfer_output_files: 'bogus',
requirements: '(Arch == "INTEL") || (Arch == "X86_64") && (machine == "some_ce")',
shouldtransferfiles: "yes",
when_to_transfer_output: "ON_EXIT",
out: "stdout.txt",
err: "stderr.txt",
log: "stderr.txt",
iwd: /tmp,
queue: 1
*/
Schedduler.prototype.createJob = function(config, cb) {
    var nuevas =  [
            cautil.createStringAttribute("Out",config.out),
            cautil.createStringAttribute("Err",config.err),
            cautil.createStringAttribute("Log",config.log),
            cautil.createStringAttribute("Iwd",config.iwd),
            cautil.createExpressionAttribute("JobUniverse", config.type),
            //cautil.createExpressionAttribute('Owner', config.owner),
    ]
    this._createJob(nuevas, config.owner, config.type, config.executable, config.arguments, config.requirements, cb)
}

Schedduler.prototype.createDagJob = function(config, cb) {
    var dagFileLocation=config.dagLocation;
    var dagOutputFileLocation = dagFileLocation + ".dagman.out";
    var dagLogFileLocation = dagFileLocation + ".dagman.log";
    var stdOutLocation = dagFileLocation + ".stdout";
    var stdErrLocation = dagFileLocation + ".stderr";
    var dagmanLockFile = dagFileLocation + ".lock";
    var workingDirectory = dagFileLocation.substring(0, dagFileLocation.lastIndexOf("/"));

    var owner = config.owner;
    var type = "SCHEDULER";
    var executable = "/usr/bin/condor_dagman";
    var argumentos = "-f -l . -Debug 3 -AutoRescue 1 -DoRescueFrom 0 " +
                           "-Allowversionmismatch " +
                           "-Lockfile " + dagmanLockFile + " " +
                           "-Dag " + dagFileLocation;
     var requirements = "TRUE";
    var nuevas = [
            cautil.createStringAttribute("Owner", owner),
            cautil.createStringAttribute("Iwd", workingDirectory),
            cautil.createIntAttribute("JobUniverse", 7), // Scheduler Universe
            cautil.createStringAttribute("Cmd", executable),
            //cautil.createIntAttribute("JobStatus", 1), // Idle
            cautil.createStringAttribute("Env",
                "_CONDOR_MAX_DAGMAN_LOG=0;" +
                "_CONDOR_DAGMAN_LOG=" + dagOutputFileLocation),
            cautil.createIntAttribute("JobNotification", 0), // Never
            cautil.createStringAttribute("UserLog", dagLogFileLocation),
            cautil.createStringAttribute("RemoveKillSig", "SIGUSR1"),
            cautil.createStringAttribute("Out", stdOutLocation),
            cautil.createStringAttribute("Err", stdErrLocation),
            //cautil.createStringAttribute("ShouldTransferFiles", "NO"), // Using shared FS
            cautil.createExpressionAttribute("Requirements", "TRUE"),
            cautil.createExpressionAttribute("OnExitRemove",
                "(ExitSignal =?= 11 || " +
                " (ExitCode =!= UNDEFINED && " +
                "  ExitCode >=0 && ExitCode <= 2))"),
            cautil.createStringAttribute("Arguments",argumentos),
            /*cautil.createIntAttribute("ClusterId", cl),
            cautil.createIntAttribute("ProcId", jb)*/
        ];
    this._createJob(nuevas, config.owner, config.type, config.executable, config.arguments, config.requirements, cb)
}
// config.DockerImage
Schedduler.prototype.createDockerJob = function(config, cb) {
    var nuevas = [
          cautil.createStringAttribute("Out",config.out),
          cautil.createStringAttribute("Err",config.err),
          cautil.createStringAttribute("Log",config.log),
          cautil.createStringAttribute("Iwd",config.iwd),
          /*cautil.createIntAttribute("ClusterId",cl)
          cautil.createIntAttribute("ProcId",jb)*/
          //cautil.createBoolAttribute("TransferExecutable",false)
          cautil.createBoolAttribute("OnExitRemove",true),
          cautil.createBoolAttribute("OnExitHold",false),
          cautil.createBoolAttribute("LeaveJobInQueue",false),
          /*cautil.createStringAttribute("Cmd","ghc"),
          cautil.createStringAttribute("Arguments","-e 'print (2+2)'")*/
          cautil.createBoolAttribute("WantDocker",true),
          cautil.createStringAttribute("DockerImage",config.DockerImage),
          cautil.createExpressionAttribute("Requirements",'TARGET.HasDocker'),
          cautil.createIntAttribute("JobUniverse",5)
    ]
    this._createJob(nuevas, config.owner, config.type, config.executable, config.arguments, config.requirements, cb)
}

Schedduler.prototype._createJob = function(nuevas, owner, type, executable, argumentos, requirements, lastcb) {
    var self = this;
    async.waterfall([
        function(cb){
            self.beginTransaction(60, cb)
        },
        function(tt, cb) {
            self.newCluster(tt,cb)
        },
        function(cl,cb) {
            self.newJob(tt,cl,cb)
        },
        function(jb,cb) {
            self.createJobTemplate({
                clusterId: cl,
                jobId: jb,
                owner: owner,
                type: type,
                cmd: executable,
                args: argumentos,
                requirements: requirements
            },cb);
        },
        function(classAd,cb) {
            nuevas.push(cautil.createIntAttribute("ClusterId", cl))
            nuevas.push(cautil.createIntAttribute("ProcId", jb))
            var cadd = cautil.combinar(classAd, nuevas);
            self.submit(tt,cl,jb,cadd,cb)
        },
        function(xx,cb) {
          console.log("comm")
            self.commitTransaction({
                transaction: tt
            },cb)
        },
        function(jb,cb) {
           console.log("Bbb")
            self.requestReschedule({})
        },
        function(jb,cb) {
            console.log("aaa")
            self.getJobAd({
                transaction: tt,
                clusterId: cl,
                jobId: jb
            },cb)
        },
        function(job,cb) {
            console.log("fff")
            lastcb(null, job)
        }
    ], function(err) {
        console.log(err)
        lastcb(err)
    })
}

module.exports = Schedduler;
