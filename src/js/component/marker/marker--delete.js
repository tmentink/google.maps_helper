
// ===========================================
// Marker - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Class
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }   


    // Public Methods
    // =======================================
    var deleteMarker = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        console.log("ERROR: ID does not reference a marker");
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
        if (GMH.Data.Marker[id] == undefined) { 
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
      var marker = GMH.Data.Marker[id];

      // remove from map
      marker.Obj.setMap(null);

      // delete the id 
      delete GMH.Data.Marker[id];

      // return the object
      return marker;
    }


    // Expose Public Methods
    // =======================================
    GMH.Marker.delete = deleteMarker;


    return GMH;
  })(GMH || {});

