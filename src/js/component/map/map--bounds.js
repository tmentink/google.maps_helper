
// ===========================================
// Map - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Object
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
      // check if array of types is passed
      if (Array.isArray(type)) {
        return _executeMultiTypes(type);
      }

      // allow type to be less sensitive
      type = _getType(type);
      
      // set map bounds and zoom to it's initial value
      if (type == "initial" || type == "init") {
        GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
        GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
        return;
      }

      // if id is null, get an array of all ids for the given type
      id = (id == null) ? _getIDs(type) : id;

      // get the bounds of the id
      var bounds = _getBounds(type, id);

      // set maps bounds 
      GMH.Data.Map.Obj.fitBounds(bounds);

      return GMH.Data.Map;
    }

    var _executeMultiTypes = function(typeObjects) {
      var bounds = new google.maps.LatLngBounds();

      // loop through each type object
      for (var i = 0, i_len = typeObjects.length; i < i_len; i++) {

        // the only property in the object should be the type
        var type = Object.keys(typeObjects[i])[0];

        // get the id(s)
        var id = typeObjects[i][type];

        // format the type
        type = _getType(type);

        // if id is null, get an array of all ids for the given type
        id = (id == null) ? _getIDs(type) : id;

        // merge the bounds
        bounds.union(_getBounds(type, id));
      }

      // set maps bounds
      GMH.Data.Map.Obj.fitBounds(bounds); 

      return GMH.Data.Map;
    }


    // Get Bounds
    // =======================================
    var _getBounds = function(type, id) {

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _getBoundsMulti(type, id);
      }

      // return empty bounds if id doesn't match
      if (GMH.Data[type][id] == null) { 
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
        if (GMH.Data[type][id] == null) {
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
      type = type.toLowerCase();

      switch(type) {
        case "polygon":
          type = "Polygons";
          break;

        case "polygons":
          type = "Polygons";
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



    
