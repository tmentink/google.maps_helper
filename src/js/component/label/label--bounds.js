
// ===========================================
// Label - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }   


    // Public Methods
    // =======================================
    var getBounds = function(id) {
      return _execute(id);
    };

    var getCenter = function(id) {
      return getBounds(id).getCenter();
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _getBounds(id);
    };
    
    var _executeMulti = function(ids) {
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
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

      bounds.extend(GMH.Data.Label[id].Obj.position);

      return bounds;
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.getBounds = getBounds;
    GMH.Label.getCenter = getCenter;


    return GMH;
  })(GMH || {});

