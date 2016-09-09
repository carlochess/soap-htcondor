function Schedduler(client, options) {
    this.client = client;
    this.options = options;
}

//ClassAdType, ClassAdStruct -> status
// {type,ad}
Schedduler.prototype.xxx = function(params, cb) {
    this.client.insertAd(params, function(err, result) {
        if (err) {
            cb(err);
            return;
        }
        cb(result);
    });
}

module.exports = Schedduler;
