
// ===========================================
// Map - Init
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
    var init = function(container, userOptions) {

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Map, userOptions);
     
      // create new google map
      var googleMap = new google.maps.Map(document.getElementById(container), options);

      // add GMH object to google map
      googleMap.GMH = {
        Parent: function() { return GMH.Data.Map; }
      };

      // create new map and save reference
      GMH.Data.Map = new GMH.Object.Map(googleMap);

      // save bounds after map has finished initializing
      setTimeout(function() {
        GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
        GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
      }, 500);

      return GMH.Data.Map;
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.init = init;


    return GMH;
  })(GMH || {});

