
// ===========================================
// Map - Reset
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    }   


    // Public Methods
    // =======================================
    var resetMap = function() {
      return _reset();
    }


    // Actions
    // =======================================
    var _reset = function() {
      // get initial options
      var options = GMH.Data.Map.initialOptions;
      
      // reset the bounds
      GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);

      // return the updated object
      return GMH.Map.update(options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.reset = resetMap;


    return GMH;
  })(GMH || {});

