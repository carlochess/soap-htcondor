// Transacciones
// int -> {status :: Status ,  transaction :: Transaction}
    // Status = { code :: StatusCode , message :: string,  next :: Status }
    // StatusCode = SUCCESS | FAIL | INVALIDTRANSACTION | UNKNOWNCLUSTER | UNKNOWNJOB | UNKNOWNFILE | INCOMPLETE | INVALIDOFFSET | ALREADYEXISTS deriving Enum
    // Transaction = { id :: int, duration :: int }
beginTransaction = function(client, duration , callback){
	client.beginTransaction({duration: 60}, function (err, result) {
		if (err) {
			console.log("Error al iniciar transaccion", err);
		    return;
		}
		tt = result.response.transaction;
		console.dir(result);
		callback(null, tt);
	});
}

extendTransaction = function (client,tt , callback){
	client.extendTransaction({transaction: tt, duration : 60}, function(err, result) {
		 if(err){
			 console.log("Error al conectar");
			 return;
		 }
		 //console.dir(result.response);
		callback(null, result);
	});
}

commitTransaction = function (client,tt , callback){     
	client.commitTransaction({transaction: tt}, function (err, result) {
		if (err) {
			console.log("Error al conectar");
		    return;
		}
		console.dir(result);
		callback(null, result);
	});
}

abortTransaction = function (client, tt , callback){
	client.abortTransaction({transaction: tt}, function (err, result) {
		if (err) {
			console.log("Error al conectar");
			return;
		}
		//console.dir(tt);
		console.dir(result);
		callback(null, result);
	});
}
