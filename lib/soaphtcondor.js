"use strict";

var Collector = require('./soap/collector')
var Schedduler = require('./soap/schedduler')

var soap = require("soap");
 
var HTCondor = function (config){
   if (!(this instanceof HTCondor)) {
    return new HTCondor(config);
   }
   var self = this
   self.config = config;
}
 
 
HTCondor.prototype.createSchedduler = function (cb){
   soap.createClient(this.config.wsdl, {},
     function(err, client){
        if (err) {
            cb(err);
        } else {
        cb(null,new Schedduler(client));
        }
   },this.config.url);
}

HTCondor.prototype.createCollector = function (cb){
   soap.createClient(this.config.wsdl, {},
     function(err, client){
        if (err) {
            cb(err);
        } else {
        cb(null,new Collector(client));
        }
   },this.config.url);
}


module.exports = HTCondor;
