# Soap-Htcondor
A wrapper for consuming HTCondor soap API

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
SCHEDD_ARGS = -p 8080
SOAP_LEAVE_IN_QUEUE = ((JobStatus==4) && ((ServerTime - CompletionDate) < (60 * 60 * 24)))
```

And then restart the service

```sh
sudo service condor restart
```

## Condor Collector
Query HTCondor for information like SubmittorAds, MasterAds, Platform and Version strings, etc
See http://www.wsdl-analyzer.com/service/service/1155440757?version=1

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

See http://www.wsdl-analyzer.com/service/service/100686?version=1

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


