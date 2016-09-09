var createStringAttribute = function(str, val) {
    return {
        name: str,
        type: "STRING-ATTR",
        value: val
    };
}

var createIntAttribute = function(str, val) {
    return {
        name: str,
        type: "STRING-ATTR",
        value: val
    };
}

var createExpressionAttribute = function(str, val) {
    return {
        name: str,
        type: "EXPRESSION-ATTR",
        value: val
    };
}

var createIntAttribute = function(str, val) {
    return {
        name: str,
        type: "INTEGER-ATTR",
        value: val
    };
}


// classAdds
combinar = function(classAdds, nuevos) {
    nuevos.item.forEach(function(classAdd) {
        var encontrado = false;
        for (var i = 0; i < classAdds.item.length; i++) {
            if (classAdd.name === classAdds.item[i].name) {
                classAdds.item[i].value = classAdd.value;
                classAdds.item[i].type = classAdd.type;
                var encontrado = true;
            }
        }
        if (!encontrado) {
            classAdds.item.push(classAdd);
            console.log("ClassAd no encontado");
        }
    });
    return classAdds;
}

discoverJobRequirements = function(client,jobAd, cb) {
        client.discoverJobRequirements({
            jobAd: jobAd
        }, function(err, result) {
            if (err) {
                console.log("Error al conectar");
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
getJobAd = function(client,tt,cl,jb, cb) {
    client.getJobAd({
        transaction: tt,
        clusterId: cl,
        jobId: jb
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        var respuesta = result.response;
        cb(null, respuesta.classAdArray);
    });
}

// { transaction :: Transaction , constraint :: string } -> ClassAdStructArrayAndStatus
// ClassAdStructArrayAndStatus = {status :: Status , classAdArray :: ClassAdStructArray}
// ClassAdStructArray = {item :: ClassAdStruct}
// ClassAdStruct = [{item :: ClassAdStructAttr}]
// ClassAdStructAttr = {name ::string , type::ClassAdAttrType , value::string }
// ClassAdAttrType = INTEGER-ATTR | FLOAT-ATTR | STRING-ATTR | EXPRESSION-ATTR | BOOLEAN-ATTR | UNDEFINED-ATTR | ERROR-ATTR
getJobAds = function(client,tt, cs, cb) {
    client.getJobAds({
        transaction: tt,
        constraint: cs
    }, function(err, result) {
        if (err) {
            console.log("Error al conectar");
            return;
        }
        var respuesta = result.response;
        cb(null, respuesta);
    });
}
