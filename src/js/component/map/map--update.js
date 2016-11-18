
// ===========================================
// Map - Update
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
    var updateMap = function(options) {
      return _execute(options);
    }


    // Execute
    // =======================================
    var _execute = function(options) {
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Map : options;

      // convert center into latlng
      if ($.type(options.center) == "string") {
        options.center = GMH.Utility.toLatLng(options.center);
      }

      return _update(options);
    };


    // Actions
    // =======================================
    var _update = function(options) {
      GMH.Data.Map.Obj.setOptions(options);

      return GMH.Data.Map;
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.update = updateMap;
    

    return GMH;
  })(GMH || {});

 