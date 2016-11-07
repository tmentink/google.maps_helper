
// ===========================================
// Polygon - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Add Listener
    // =======================================
    var addListener = function(id, type, fn) {
      return _execute(id, type, fn);
    }


    // Execute
    // =======================================
    var _execute = function(id, type, fn) {
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

        return _addListener(id, type, fn);
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(polygons) {
      try {
        var results = [];

        // loop through each id
        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var type = polygons[i].type;
          var fn = polygons[i].fn;
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            results.push(false);
            continue; 
          }

          results.push(_addListener(id, type, fn));
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
    var _addListener = function(id, type, func) {
      try {
        google.maps.event.addListener(GMH.Data.Polygons[id].Obj, type, func);
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Public Methods
    // =======================================
    GMH.Polygon.addListener = addListener;


    return GMH;
  })(GMH || {});





