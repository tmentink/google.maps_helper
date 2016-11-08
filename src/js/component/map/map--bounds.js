
// ===========================================
// Map - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Set Bounds
    // =======================================
    var setBounds = function(type, id) {
      return _execute(type, id);
    }


    // Execute
    // =======================================
    var _execute = function(type, id) {
      try {
        // check if array of types is passed
        if (Array.isArray(type)) {
          return _executeMultiTypes(type);
        }

        type = _getType(type);
        
        // set map bounds and zoom to it's initial value
        if (type == "initial") {
          GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
          GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
          return true;
        }

        // get the bounds for all the ids in the given type
        if (typeof id == "undefined") {
          var bounds = _getBoundsMulti(type, _getIDs(type));
          GMH.Data.Map.Obj.fitBounds(bounds);
          return true;
        }

        // get the bounds of the id
        var bounds = _getBounds(type, id);

        // set maps bounds 
        GMH.Data.Map.Obj.fitBounds(bounds);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMultiTypes = function(types) {
      try {
        var bounds = new google.maps.LatLngBounds();

        // loop through each type object
        for (var i = 0, i_len = types.length; i < i_len; i++) {
          var type = _getType(types[i].type);
          var id = types[i].id ? types[i].id : types[i].ids;

          bounds.union(_getBounds(type, id));
        }

        // set maps bounds
        GMH.Data.Map.Obj.fitBounds(bounds); 
   
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Get Bounds
    // =======================================
    var _getBounds = function(type, id) {

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _getBoundsMulti(type, id);
      }

      // return empty bounds if id doesn't match
      if (GMH.Data[type][id] == undefined) { 
        return new google.map.LatLngBounds(); 
      }

      // return the bounds of the id
      return GMH.Data[type][id].Obj.getBounds();
    }

    var _getBoundsMulti = function(type, ids) {
      var bounds = new google.maps.LatLngBounds();
      
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
          
        // skip over ids that aren't found
        if (GMH.Data[type][id] == undefined) { 
          continue; 
        }

        // merge bounds
        bounds.union(GMH.Data[type][id].Obj.getBounds());
      }

      return bounds;
    }
    

    // Get Type
    // =======================================
    // allow type to be case and plural insensitive
    var _getType = function(type) {
      switch(type.toLowerCase()) {
        case "polygon":
          type = "Polygons";
          break;

        case "polygons":
          type = "Polygons";
          break;

        case "initial":
          type = "initial";
          break;

        case "init":
          type = "initial";
          break;
      }

      return type;
    }


    // Get Ids
    // =======================================
    // get an array of all the ids for the given data type
    var _getIDs = function(type) {
      var ids = {};
      ids = Object.keys(GMH.Data[type]);

      // remove _index from the array
      ids.splice(ids.indexOf("_index"), 1);

      return ids;
    }


    // Public Methods
    // =======================================
    GMH.Map.setBounds = setBounds;


    return GMH;
  })(GMH || {});



    
