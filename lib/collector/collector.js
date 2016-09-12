function Collector(client, options) {
    this.client = client;
    this.options = options;
}
Collector.prototype.constructor = Collector;

Collector.prototype.getPlatformString = function(cb) {
    this.client.getPlatformString({}, function(err, result) {
        if (err) {
            cb(err);
            return;
        }
        if(result.response.status.code !== "SUCCESS"){
            cb(result.response.status.code)
        }
        cb(null, result.response.message);
    });
}

// () -> StringAndStatus
// StringAndStatus = { status::Status , message::string
// Status = { code :: StatusCode , message :: string,  next :: Status }
// StatusCode = SUCCESS | FAIL | INVALIDTRANSACTION | UNKNOWNCLUSTER | UNKNOWNJOB | UNKNOWNFILE | INCOMPLETE | INVALIDOFFSET | ALREADYEXISTS deriving Enum
Collector.prototype.getVersionString = function(cb) {
    this.client.getVersionString({}, function(err, result) {
        if (err) {
            cb(err);
            return;
        }
        if(result.response.status.code !== "SUCCESS"){
            cb(result.response.status.code)
        }
        cb(null, result.response.message);
    });
}

// ClassAdType, ClassAdStruct -> status
/*
ClassAdType
    <xsd:enumeration value='STARTD-AD-TYPE' />
    <xsd:enumeration value='QUILL-AD-TYPE' />
    <xsd:enumeration value='SCHEDD-AD-TYPE' />
    <xsd:enumeration value='SUBMITTOR-AD-TYPE' />
    <xsd:enumeration value='LICENSE-AD-TYPE' />
    <xsd:enumeration value='MASTER-AD-TYPE' />
    <xsd:enumeration value='CKPTSRVR-AD-TYPE' />
    <xsd:enumeration value='COLLECTOR-AD-TYPE' />
    <xsd:enumeration value='STORAGE-AD-TYPE' />
    <xsd:enumeration value='NEGOTIATOR-AD-TYPE' />
    <xsd:enumeration value='HAD-AD-TYPE' />
    <xsd:enumeration value='GENERIC-AD-TYPE' />
ClassAdStruct
    tns:ClassAdStructAttr
        <xsd:element name='name' type='xsd:string' />
        <xsd:element name='type' xmlns:tns='urn:condor' type='tns:ClassAdAttrType' />
        <xsd:element name='value' type='xsd:string' />
*/
Collector.prototype.insertAd = function(params, cb) {
    this.client.insertAd(params, function(err, result) {
        if (err) {
            cb(err);
            return;
        }
        cb(null, result);
    });
}

//{constraint: ""}
Collector.prototype.queryStartdAds = function(params, cb) {
    this.client.queryStartdAds(params, function(err, result) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });
}
// string -> ClassAdStructArray
Collector.prototype.queryScheddAds = function(params, cb) {
        this.client.queryScheddAds(params, function(err, result) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });
}

// string -> ClassAdStructArray
Collector.prototype.queryMasterAds = function(params, cb) {
        this.client.queryMasterAds(params, function(err, result) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });
    }
// string -> ClassAdStructArray
Collector.prototype.insertAd = function(params, cb) {
        this.client.querySubmittorAds(params, function(err, result) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });
}
// string -> ClassAdStructArray
Collector.prototype.queryLicenseAds = function(params, cb) {
        this.client.queryLicenseAds(params, function(err, result) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });
}

//  string -> ClassAdStructArray
Collector.prototype.queryStorageAds = function(params, cb) {
        this.client.queryStorageAds(params, function(err, result) {
            if (err) {
                cb(err);
                return;
            }
            cb(null, result);
        });
}

//  string -> ClassAdStructArray
Collector.prototype.queryAnyAds = function(params, cb) {
    this.client.queryAnyAds(params, function(err, result) {
        if (err) {
                cb(err);
                return;
        }
        cb(null, result);
    });
}
module.exports = Collector;
