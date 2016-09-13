module.exports = function(Schedduler) {
  Schedduler.prototype.createJobTemplate = function(eee, cb) {
      this.client.createJobTemplate(eee, function(err, result) {
          if (err) {
              cb(err);
              return;
          }
          if(result.response.status.code !== "SUCCESS"){
              cb(result.response.status.code)
              return;
          }
          var classAd = result.response.classAd;
          cb(null, classAd);
      });
  }

  Schedduler.prototype.submit = function(tt, cl, jb, classAd, cb) {
      this.client.submit({
          transaction: tt,
          clusterId: cl,
          jobId: jb,
          jobAd: classAd
      }, function(error, result) {
          if (error) {
              cb(error);
              return;
          }
          if(result.response.status.code !== "SUCCESS"){
              cb(result.response.status)
              return;
          }
          cb(null, result);
      });
  }

  Schedduler.prototype.newJob = function(tt, cl, cb) {
      this.client.newJob({
          transaction: tt,
          clusterId: cl
      }, function(err, result) {
          //console.log(err)
          if (err) {
              cb(err);
              return;
          }
          if(result.response.status.code !== "SUCCESS"){
              cb(result.response.status.code)
              return;
          }
          jb = result.response.integer;
          cb(null, jb)
      });
  }

  Schedduler.prototype.removeJob = function(client, tt, cl, jb, reason, forceRemoval, cb) {
      this.client.removeJob({
          transaction: tt,
          clusterId: cl,
          jobId: jb,
          reason: "Ninguna",
          forceRemoval: true
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

  Schedduler.prototype.holdJob = function(transaction, clusterId, jobId, reason, emailUser, emailAdmin, systemHold, cb) {
      this.client.holdJob({
          transaction: tt,
          clusterId: cl,
          jobId: jb,
          reason: reason,
          emailUser: emailUser,
          emailAdmin: emailAdmin,
          systemHold: systemHold
      }, function(err, result) {
          if (err) {
              cb(err);
              return;
          }
          if(result.response.status.code !== "SUCCESS"){
              cb(result.response.status.code)
              return;
          }
          cb(result.response)
          //console.dir(result.response);
      });
  }

  Schedduler.prototype.releaseJob = function(transaction, clusterId, jobId, reason, emailUser, emailAdmin, cb) {
      this.client.releaseJob({
          transaction: tt,
          clusterId: cl,
          jobId: jb,
          reason: reason,
          emailUser: emailUser,
          emailAdmin: emailAdmin
      }, function(err, result) {
          if (err) {
              cb(err);
              return;
          }
          if(result.response.status.code !== "SUCCESS"){
              cb(result.response.status.code)
              return;
          }
          cb(null)
          //console.dir(result.response);
      });
  }

  Schedduler.prototype.requestReschedule = function(cb) {
      this.client.requestReschedule({}, function(err, result) {
          if (err) {
              cb(err);
              return;
          }
          console.log(result)
          if(result.response.code !== "SUCCESS"){
              cb(result.response.code)
              return;
          }
          cb();
      });
  }
}
