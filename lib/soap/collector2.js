function Collector(cb) {
    soap.createClient(file + '/condorCollector.wsdl', options, function(err, client) {
        //console.dir(client);
        if (err) {
            console.log("Error al conectar");
            return;
        }
        cb(client);
    }, url);
}

//ClassAdType, ClassAdStruct -> status
insertAd = function(client, cb) {
    client.insertAd({
        type,
        ad
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        cb(result);
    });
}

//string -> ClassAdStructArray
queryStartdAds = function(client, cb) {
        client.queryStartdAds({
            constraint: ""
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
                return;
            }
        });
    }
    // string -> ClassAdStructArray
queryScheddAds = function(client, cb) {
        client.queryScheddAds({
            constraint: ""
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
                return;
            }
        });
    }
    // string -> ClassAdStructArray
queryMasterAds = function(client, cb) {
        client.queryMasterAds({
            constraint: ""
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
                return;
            }
        });
    }
    // string -> ClassAdStructArray
insertAd = function(client, cb) {
        client.querySubmittorAds({
            constraint: ""
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
                return;
            }
        });
    }
    // string -> ClassAdStructArray
queryLicenseAds = function(client, cb) {
        client.queryLicenseAds({
            constraint: ""
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
                return;
            }
        });
    }
    //  string -> ClassAdStructArray
queryStorageAds = function(client, cb) {
        client.queryStorageAds({
            constraint: ""
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
                return;
            }
        });
    }
    //  string -> ClassAdStructArray
queryAnyAds = function(client, cb) {
    client.queryAnyAds({
        constraint: ""
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
    });
}
