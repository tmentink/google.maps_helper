
// ===========================================
// Marker - Reset
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
    var resetMarker = function(id) {
      return _execute(id);
    }


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
      return _reset(id);
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
        var marker = _reset(id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _reset = function(id) {
      // get initial options
      var options = GMH.Data.Marker[id].initialOptions;
      
      // return the updated object
      return GMH.Marker.update(id, options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.reset = resetMarker;


    return GMH;
  })(GMH || {});

