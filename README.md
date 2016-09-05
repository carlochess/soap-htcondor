# Soap-Htcondor
A wrapper for consuming HTCondor soap API [Check HTCondor manual](http://research.cs.wisc.edu/htcondor/manual/v8.4/6_1Web_Service.html)

## Installation

```sh
$ npm install soap-htcondor --save
```

## HTCondor config

Update HTCondor config file to accept incoming SOAP requests

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

And then restart the service

```sh
sudo service condor restart
```

Check if it works

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

## Condor Collector
Query HTCondor for information like SubmittorAds, MasterAds, Platform and Version strings, etc
See [here.](http://www.wsdl-analyzer.com/service/service/1155440757?version=1)

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

See [here.](http://www.wsdl-analyzer.com/service/service/100686?version=1)

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
client.getPlatformString({}, function(err, result) {
    if (err) {
        console.log("Error al conectar");
        return;
    }
    console.log(result);
});
```

### Submiting a Job

```javascript
```

### Submiting a Workflow

### Submiting a Docker Job

### Checking for a Job Status

### 

## Testing


