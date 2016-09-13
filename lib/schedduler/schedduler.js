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
require('./classads')(Schedduler);

Schedduler.prototype.xxx = function(params, cb) {
    cb(null, "Hola")
}

//-----------------------------------------


// config.DockerImage
Schedduler.prototype.createDockerJob = function(config, cb) {
    var nuevas = [
          cautil.createStringAttribute("Out",config.out),
          cautil.createStringAttribute("Err",config.err),
          cautil.createStringAttribute("Log",config.log),
          cautil.createStringAttribute("Iwd",config.iwd),
          cautil.createBoolAttribute("WantDocker",true),
          cautil.createStringAttribute("DockerImage",config.dockerimage),
          cautil.createExpressionAttribute("Requirements",'TARGET.HasDocker'),
          cautil.createIntAttribute("JobUniverse",5)
    ]
    this._createJob(nuevas, config.owner, config.universe, config.executable, config.arguments, config.requirements, cb)
}

Schedduler.prototype.createJob = function(config, cb) {
    var nuevas =  [
            cautil.createStringAttribute("Out",config.out),
            cautil.createStringAttribute("Err",config.err),
            cautil.createStringAttribute("Log",config.log),
            cautil.createStringAttribute("Iwd",config.iwd)
    ]
    this._createJob(nuevas, config.owner, config.universe, config.executable, config.arguments, config.requirements, cb)
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
    this._createJob(nuevas, config.owner, type, executable, argumentos, requirements, cb)
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
            self.commitTransaction({
                transaction: tt
            },cb)
        },
        function(res,cb) {
            self.requestReschedule(cb)
        },
        function(cb) {
            self.getJobAd(tt,cl,jb,cb)
        },
        function(job,cb) {
            cb(null, job)
        }
    ], function(err) {
        if(err){
            lastcb(err)
            return
        }
        lastcb(null, err)
    })
}

module.exports = Schedduler;
