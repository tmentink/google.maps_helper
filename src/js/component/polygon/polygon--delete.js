
// ===========================================
// Polygon - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Delete Polygon
    // =======================================
    var deletePolygon = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
          return false;
        }

        _delete(id);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(ids) {
      try {
        var results = [];

        // loop through each id
        for (var i = 0, i_len = ids.length; i < i_len; i++) {
          var id = ids[i];
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            results.push(false);
            continue; 
          }

          results.push(true);
          _delete(id);
        }

        return results;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Actions
    // =======================================
    var _delete = function(id) {
      // remove polygon from map then delete it from Polygons object
      GMH.Data.Polygons[id].Obj.setMap(null);
      delete GMH.Data.Polygons[id];
    }


    // Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});





