module.exports = function(Schedduler) {
	// Transacciones
	// int -> {status :: Status ,  transaction :: Transaction}
	    // Status = { code :: StatusCode , message :: string,  next :: Status }
	    // StatusCode = SUCCESS | FAIL | INVALIDTRANSACTION | UNKNOWNCLUSTER | UNKNOWNJOB | UNKNOWNFILE | INCOMPLETE | INVALIDOFFSET | ALREADYEXISTS deriving Enum
	    // Transaction = { id :: int, duration :: int }
	Schedduler.prototype.beginTransaction = function(duration , callback){
		this.client.beginTransaction({duration: 60}, function (err, result) {
			if (err) {
					cb(err);
					return;
			}
			if(result.response.status.code !== "SUCCESS"){
					cb(result.response.status.code)
					return;
			}
			tt = result.response.transaction;
			callback(null, tt);
		});
	}

	Schedduler.prototype.extendTransaction = function (tt , callback){
		this.client.extendTransaction({transaction: tt, duration : 60}, function(err, result) {
			if (err) {
					cb(err);
					return;
			}
			if(result.response.status.code !== "SUCCESS"){
					cb(result.response.status.code)
					return;
			}
			callback(null, result);
		});
	}

	Schedduler.prototype.commitTransaction = function (tt , callback){
		this.client.commitTransaction({transaction: tt}, function (err, result) {
			if (err) {
					cb(err);
					return;
			}
			if(result.response.status.code !== "SUCCESS"){
					cb(result.response.status.code)
					return;
			}
			callback(null, result);
		});
	}

	Schedduler.prototype.abortTransaction = function (tt , callback){
		this.client.abortTransaction({transaction: tt}, function (err, result) {
			if (err) {
					cb(err);
					return;
			}
			if(result.response.status.code !== "SUCCESS"){
					cb(result.response.status.code)
					return;
			}
			callback(null, result);
		});
	}
}
