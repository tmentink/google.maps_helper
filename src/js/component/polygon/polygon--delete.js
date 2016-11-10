
// ===========================================
// Polygon - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Polygon Object
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
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // return the deleted polygon
      return _delete(id);
    }

    var _executeMulti = function(ids) {
      var polyArray = [];

      // loop through each id
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont match an existing polygon
        if (GMH.Data.Polygons[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        polyArray.push(_delete(id));
      }

      return polyArray;
    }


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the polygon object
      var poly = GMH.Data.Polygons[id];

      // remove polygon from map
      poly.Obj.setMap(null);

      // delete the id from Data.Polygons
      delete GMH.Data.Polygons[id];

      // return the polygon object
      return poly;
    }


    // Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});





