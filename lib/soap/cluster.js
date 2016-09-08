newCluster = function (client, tt , callback){
	client.newCluster({
		transaction: tt
	}, function(err, result) {
		if (err) {
		    console.log("Error al iniciar cluster");
		    return;
		}
		cl = result.response.integer;
		console.dir(result);
		callback(null,cl);
		//});
	});
}

removeCluster = function (client, tt, cl, reason, callback){
	//
	client.removeCluster({
		transaction: tt,
		clusterId: cl,
		reason: "Ninguna"
	}, function(err, result) {
		if (err) {
		    console.log("Error al conectar");
		    return;
		}
		//console.dir(result.response);
	});
}
