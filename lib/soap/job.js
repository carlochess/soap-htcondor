createJobTemplate = function(client, cl, jb, owner, type, executable, arguments, requirements, callback) {
    client.createJobTemplate({
        clusterId: cl,
        jobId: jb,
        owner: owner,
        type: type,
        cmd: executable,
        args: arguments,
        requirements: requirements
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        console.log(":D");
        classAd = result.response.classAd;
        //console.dir(classAd);
        callback(null, classAd);
    });
}

// Enviar el job
// -> RequirementsAndStatus
submit = function(client, tt, cl, jb, classAd, callback) {
    client.submit({
        transaction: tt,
        clusterId: cl,
        jobId: jb,
        jobAd: classAd
    }, function(error, result) {
        if (error) {
            return;
        }
        console.dir(result);
        callback(null);
    });
}

newJob = function(client, tt, cl, callback) {
    client.newJob({
        transaction: tt,
        clusterId: cl
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        console.dir(result);
        jb = result.response.integer;
        callback(null, jb)
    });
}

removeJob = function(client, tt, cl, jb, reason, forceRemoval, callback) {
    client.removeJob({
        transaction: tt,
        clusterId: cl,
        jobId: jb,
        reason: "Ninguna",
        forceRemoval: true
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        //console.dir(result.response);
    });
}

holdJob = function(client, transaction, clusterId, jobId, reason, emailUser, emailAdmin, systemHold, callback) {
    client.holdJob({
        transaction: tt,
        clusterId: cl,
        jobId: jb,
        reason: "Ninguna",
        emailUser: true,
        emailAdmin: true,
        systemHold: true
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        //console.dir(result.response);
    });
}

releaseJob = function(client, transaction, clusterId, jobId, reason, emailUser, emailAdmin, callback) {
    client.releaseJob({
        transaction: tt,
        clusterId: cl,
        jobId: jb,
        reason: "Ninguna",
        emailUser: true,
        emailAdmin: true
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        //console.dir(result.response);
    });
}

requestReschedule = function(client, callback) {
    client.requestReschedule({}, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        console.dir(result);
        callback();
    });
}
