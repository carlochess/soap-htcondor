# Soap-Htcondor
A wrapper for consuming HTCondor soap API [Check HTCondor manual](http://research.cs.wisc.edu/htcondor/manual/v8.4/6_1Web_Service.html)

## Installation
You can install  this package by running in the command line the following command:
```sh
$ npm install soap-htcondor --save
```

## HTCondor config

Update HTCondor config file to accept incoming SOAP requests at port 8080.

/etc/condor/config.d/condor_config.local
```
ENABLE_SOAP = TRUE
ALLOW_SOAP = *
QUEUE_ALL_USERS_TRUSTED = TRUE
SCHEDD_ARGS = -p 8080
SOAP_LEAVE_IN_QUEUE = ((JobStatus==4) && ((ServerTime - CompletionDate) < (60 * 60 * 24)))
HOSTALLOW_WRITE = *
#NETWORK_INTERFACE = eth1
```

Restart the HTCondor service

```sh
sudo service condor restart
```

And then, check if it works running:

```sh
condor_status -schedd -constraint "HasSOAPInterface=?=TRUE"
```

or

```sh
nc localhost 8080 <<EOF
POST / HTTP/1.1
User-Agent: whatever
Content-Type: text/xml; charset=utf-8
SOAPAction: ""

<?xml version="1.0" encoding="UTF-8"?>
<SOAP-ENV:Envelope
 xmlns:SOAP-ENV="http://schemas.xmlsoap.org/soap/envelope/"
 xmlns:SOAP-ENC="http://schemas.xmlsoap.org/soap/encoding/"
 xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
 xmlns:xsd="http://www.w3.org/2001/XMLSchema"
 xmlns:ns="urn:condor">
 <SOAP-ENV:Body SOAP-ENV:encodingStyle="http://schemas.xmlsoap.org/soap/encoding/">
     <ns:getVersionString />
 </SOAP-ENV:Body>
</SOAP-ENV:Envelope>
EOF
```

This package expose two Classes, Collector and Scheduler, the first one has every method
for query HTCondor about Jobs status, Machine stats or even platform and version of the program.

## Condor Collector
Query HTCondor for information like SubmittorAds, MasterAds, Platform and Version strings, etc

| Methods         |
|-----------------|
|getVersionString|
|getPlatformString|
|insertAd|
|queryStartdAds|
|queryScheddAds|
|queryMasterAds|
|querySubmittorAds|
|queryLicenseAds|
|queryStorageAds|
|queryAnyAds|

## Condor Schedduler
The scheduller has everything that you need for the manage of the HTCondor Jobs

| Methods         |
|-----------------|
|getVersionString|
|getPlatformString|
|beginTransaction|
|commitTransaction|
|abortTransaction|
|extendTransaction|
|newCluster|
|removeCluster|
|newJob|
|removeJob|
|holdJob|
|releaseJob|
|submit|
|getJobAds|
|getJobAd|
|declareFile|
|sendFile|
|getFile|
|closeSpool|
|listSpool|
|requestReschedule|
|discoverJobRequirements|
|createJobTemplate|

### Check HTCondor version

```javascript

var HTCondor = require("soap-htcondor")
var join = require("path").join

var htcondor = new HTCondor({url:"http://localhost:8080/", wsdl : join(__dirname, "wsdl", "condorCollector.wsdl")});

htcondor.createCollector(function(err, client){
  client.getVersionString({}, function(err, result) {
      if (err) {
          console.log("Error al conectar");
          return;
      }
      console.log(result);
  });
})

```

### Submiting a Job

```javascript
var HTCondor = require("soap-htcondor")
var join = require("path").join

var htcondor = new HTCondor({url:"http://localhost:8080/", wsdl : join(__dirname, "wsdl", "condorSchedd.wsdl")});

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

htcondor.createSchedduler(function(err, schedd){
   if(err){
    console.log("Error al crear Schedd", err)
    return;
   }

   schedd.createJob(job, function(err, job){
       if(err){
         console.log("Error al enviar job",err)
         return
       }
       console.log(job)
   })
})

```

### Submiting a Workflow

### Submiting a Docker Job

### Checking for a Job Status

###

## Testing
