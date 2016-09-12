module.exports = function(Schedduler) {
	Schedduler.prototype.newCluster = function (tt , callback){
		this.client.newCluster({
			transaction: tt
		}, function(err, result) {
			if (err) {
					callback(err, null);
					return;
			}
			if(result.response.status.code !== "SUCCESS"){
					callback(result.response.status.code, null)
					return;
			}
			cl = result.response.integer;
			callback(null,cl);
		});
	}

	Schedduler.prototype.removeCluster = function (tt, cl, reason, callback){
		this.client.removeCluster({
			transaction: tt,
			clusterId: cl,
			reason: "Ninguna"
		}, function(err, result) {
			if (err) {
					callback(err, null);
					return;
			}
			if(result.response.status.code !== "SUCCESS"){
					callback(result.response.status.code, null)
					return;
			}
			callback(null,result.response);
		});
	}
}
