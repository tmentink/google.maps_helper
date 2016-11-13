
// ===========================================
// Marker - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }   


    // Public Methods
    // =======================================
    var getBounds = function(id) {
      return _execute(id);
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
      }

      return _getBounds(id);
    };
    
    var _executeMulti = function(ids) {
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // merge the bounds
        bounds.union(_getBounds(id));
      }

      return bounds;
    };


    // Actions
    // =======================================
    var _getBounds = function(id) {
      var bounds = new google.maps.LatLngBounds();

      bounds.extend(GMH.Data.Marker[id].Obj.getPosition());

      return bounds;
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.getBounds = getBounds;


    return GMH;
  })(GMH || {});

