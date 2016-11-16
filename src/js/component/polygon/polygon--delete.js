
// ===========================================
// Polygon - Delete
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
    var deletePolygon = function(id) {
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
        throw "Error: ID does not reference a Polygon";
      }

      // return the deleted object
      return _delete(id);
    };

    var _executeMulti = function(ids) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var poly = _delete(id);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the object
      var polygon = GMH.Data.Polygon[id];

      // remove from map
      polygon.Obj.setMap(null);

      // delete the id 
      delete GMH.Data.Polygon[id];

      // return the object
      return polygon;
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});

