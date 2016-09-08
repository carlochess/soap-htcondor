// The two methods declareFile() and sendFile() work in tandem to transfer files to the condor_schedd daemon.



// The declareFile() method causes the condor_schedd daemon to create the file in its spool location, or indicate in its return value that the file already exists. This increases efficiency, as resending an existing file is a waste of resources.
	client.declareFile({transaction: tt, clusterId : cl,jobId : jb, name:"Ninguna", size: 0, hashType: 0, hash: ""/*MD5HASH*/}, function(err, result) {
		 if(err){
		 console.log("Error al conectar");
		 return;
		 }
		 //console.dir(result.response);
     });
     
// The sendFile() method sends base64 encoded data. sendFile() may be used to send an entire file, or chunks of files as desired. 
     client.sendFile({transaction: tt, clusterId : cl,jobId : jb, name:"Ninguna", offset: 0,data/*base64Binary*/: }, function(err, result) {
		 if(err){
		 console.log("Error al conectar");
		 return;
		 }
		 //console.dir(result.response);
     });
     
     // the getFile() method retrieves a file.
     client.getFile({transaction: tt, clusterId : cl,jobId : jb, name:"Ninguna", offset: 0,length: 0}, function(err, result) {
		 if(err){
		 console.log("Error al conectar");
		 return;
		 }
		 //console.dir(result.response);
     });
     
     //The job enters Old Age by the application's use of the closeSpool() method
     //  It causes the condor_schedd daemon to remove the job from the queue, and the job's spool files are no longer available
     client.closeSpool({transaction: tt, clusterId : cl,jobId : jb}, function(err, result) {
		 if(err){
		 console.log("Error al conectar");
		 return;
		 }
		 //console.dir(result.response);
     });
      The listSpool() method assists by providing a list of all the job's files in the spool location. 
     client.listSpool({transaction: tt, clusterId : cl,jobId : jb}, function(err, result) {
		 if(err){
		 console.log("Error al conectar");
		 return;
		 }
		 //console.dir(result.response.filesInfo);
		 // for(str f in filesInfo)
		 // 	getFile(f)
     });
     
