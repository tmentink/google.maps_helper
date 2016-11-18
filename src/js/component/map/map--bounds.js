
// ===========================================
// Map - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Public Methods
    // =======================================
    var setBounds = function(type, id) {
      _execute(type, id);
      return GMH.Data.Map;
    };

    var getCenter = function() {
      return GMH.Data.Map.Obj.getCenter();
    };


    // Execute
    // =======================================
    var _execute = function(type, id) {
      
      // check if an array of types is passed
      if ($.isArray(type)) {
        return _executeMulti(type);
      }

      // allow type to be less sensitive
      type = GMH.Utility.getObjectType(type);
      
      // set map bounds and zoom to it's initial value
      if (type == "initial" || type == "init") {
        GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
        GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialOptions.zoom);
        return;
      }

      // if id is null, get an array of all ids for the given type
      id = (id == null) ? GMH.Utility.getIDs(GMH.Data[type]) : id;

      // get the bounds of the id
      var bounds = _getBounds(type, id);

      // set maps bounds 
      GMH.Data.Map.Obj.fitBounds(bounds);
    };
    
    var _executeMulti = function(objects) {
      var bounds = new google.maps.LatLngBounds();

      // loop through each type object
      for (var i = 0, i_len = objects.length; i < i_len; i++) {

        // the only property in the object should be the type
        var type = Object.keys(objects[i])[0];

        // get the id(s)
        var id = objects[i][type];

        // allow type to be less sensitive
        type = GMH.Utility.getObjectType(type);

        // if id is null, get an array of all ids for the given type
        id = (id == null) ? GMH.Utility.getIDs(GMH.Data[type]) : id;

        // merge the bounds
        bounds.union(_getBounds(type, id));
      }

      // set maps bounds
      GMH.Data.Map.Obj.fitBounds(bounds); 
    };


    // Actions
    // =======================================
    var _getBounds = function(type, id) {
      
      // check if an array of ids is passed
      if ($.isArray(id)) {
        return _getBoundsMulti(type, id);
      }

      // return empty bounds if id doesn't exist
      if (GMH.Data[type][id] == null) { 
        return new google.map.LatLngBounds(); 
      }

      return GMH.Data[type][id].getBounds();
    };
    
    var _getBoundsMulti = function(type, ids) {
      var bounds = new google.maps.LatLngBounds();
      
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
          
        // skip over ids that dont' exist
        if (GMH.Data[type][id] == null) {
          continue; 
        }

        // merge bounds
        bounds.union(GMH.Data[type][id].getBounds());
      }

      return bounds;
    };
    

    // Expose Public Methods
    // =======================================
    GMH.Map.setBounds = setBounds;
    GMH.Map.getCenter = getCenter;


    return GMH;
  })(GMH || {});

