
// ===========================================
// Polygon - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Polygon Namespace
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Public Methods
    // =======================================
    var getBounds = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a polygon";
      }

      return _getBounds(id);
    };

    var _executeMulti = function(ids) {
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
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
      var paths = GMH.Data.Polygon[id].Obj.getPaths();
      
      // loop through each path
      for (var i = 0, i_len = paths.length; i < i_len; i++) {
        var path = paths.getAt(i);

        // loop through all points in path
        for (var j = 0, j_len = path.getLength(); j < j_len; j++) {
          bounds.extend(path.getAt(j));
        }
      }

      return bounds;
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.getBounds = getBounds;


    return GMH;
  })(GMH || {});





