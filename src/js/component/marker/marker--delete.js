
// ===========================================
// Marker - Delete
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
    var deleteMarker = function(id) {
      return _execute(id);
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a marker";
      }

      // return the deleted object
      return _delete(id);
    };

    var _executeMulti = function(ids) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _delete(id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


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
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.delete = deleteMarker;


    return GMH;
  })(GMH || {});

