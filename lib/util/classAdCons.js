module.exports = {
  createStringAttribute : function(str, val) {
      return {
          name: str,
          type: "STRING-ATTR",
          value: val
      };
  },
  createIntAttribute : function(str, val) {
      return {
          name: str,
          type: "INTEGER-ATTR",
          value: val
      };
  },
  createExpressionAttribute : function(str, val) {
      return {
          name: str,
          type: "EXPRESSION-ATTR",
          value: val
      };
  },
  createBoolAttribute : function(str, val) {
      return {
          name: str,
          type: "BOOLEAN-ATTR",
          value: val
      };
  },
  combinar : function(classAdds, nuevos){
  	nuevos.forEach(function(classAdd){
  		var encontrado = false;
  		for(var i =0; i<classAdds.item.length; i++){
  			if(classAdd.name === classAdds.item[i].name){
  				classAdds.item[i].value = classAdd.value;
  				classAdds.item[i].type = classAdd.type;
  				var encontrado = true;
  			}
  		}
  		if(!encontrado){
  			classAdds.item.push(classAdd);
  		}
  	});
  	return classAdds;
  }
}
