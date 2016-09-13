module.exports = function(Schedduler) {
  Schedduler.prototype.discoverJobRequirements = function(jobAd, cb) {
          this.client.discoverJobRequirements({
              jobAd: jobAd
          }, function(err, result) {
              if (err) {
                  cb(err);
                  return;
              }
              if(result.response.status.code !== "SUCCESS"){
                  cb(result.response.status.code)
                  return;
              }
              cb(result.response);
          });
  }
      //-------------------------

  // { transaction :: Transaction , constraint :: string } -> ClassAdStructArrayAndStatus
  // ClassAdStructArrayAndStatus = {status :: Status , classAdArray :: ClassAdStructArray}
  // ClassAdStructArray = {item :: ClassAdStruct}
  // ClassAdStruct = [{item :: ClassAdStructAttr}]
  // ClassAdStructAttr = {name ::string , type::ClassAdAttrType , value::string }
  // ClassAdAttrType = INTEGER-ATTR | FLOAT-ATTR | STRING-ATTR | EXPRESSION-ATTR | BOOLEAN-ATTR | UNDEFINED-ATTR | ERROR-ATTR
  Schedduler.prototype.getJobAd = function(tt,cl,jb, cb) {
      this.client.getJobAd({
          tt,
          clusterId: cl,
          jobId: jb
      }, function(err, result) {
        if (err) {
            cb(err);
            return;
        }
        if(result.response.status.code !== "SUCCESS"){
            cb(result.response.status.code)
            return;
        }
        cb(result.response.classAd);
      });
  }

  // { transaction :: Transaction , constraint :: string } -> ClassAdStructArrayAndStatus
  // ClassAdStructArrayAndStatus = {status :: Status , classAdArray :: ClassAdStructArray}
  // ClassAdStructArray = {item :: ClassAdStruct}
  // ClassAdStruct = [{item :: ClassAdStructAttr}]
  // ClassAdStructAttr = {name ::string , type::ClassAdAttrType , value::string }
  // ClassAdAttrType = INTEGER-ATTR | FLOAT-ATTR | STRING-ATTR | EXPRESSION-ATTR | BOOLEAN-ATTR | UNDEFINED-ATTR | ERROR-ATTR
  Schedduler.prototype.getJobAds = function(tt, cs, cb) {
      this.client.getJobAds({
          transaction: tt,
          constraint: cs
      }, function(err, result) {
          if (err) {
              cb(err);
              return;
          }
          if(result.response.status.code !== "SUCCESS"){
              cb(result.response.status.code)
              return;
          }
          cb(result.response.classAdArray);
      });
  }
}
