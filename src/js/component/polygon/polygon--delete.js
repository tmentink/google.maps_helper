
// ===========================================
// Polygon - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Polygon Class
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
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        console.log("ERROR: ID does not reference a Polygon");
        return;
      }

      // return the deleted object
      return _delete(id);
    }
    var _executeMulti = function(ids) {
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add object to array
        objArray.push(_delete(id));
      }

      return objArray;
    }


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the object
      var Polygon = GMH.Data.Polygon[id];

      // remove from map
      Polygon.Obj.setMap(null);

      // delete the id 
      delete GMH.Data.Polygon[id];

      // return the object
      return Polygon;
    }


    // Expose Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});
