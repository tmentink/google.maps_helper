
// ===========================================
// Map - Init
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Init Map
    // =======================================
    var initMap = function(container, userOptions) {
      try {
        // get default options
        var defaults = $.extend({}, {}, GMH.Defaults.Map); 

        // combine user and default options
        var options = $.extend({}, defaults, userOptions)
       
        // create new map and save reference
        GMH.Data.Map.Obj = new google.maps.Map(document.getElementById(container), options);

        // save bounds after map has finished initializing
        setTimeout(function() {
          GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
          GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
        }, 500);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Public Methods
    // =======================================
    GMH.Map.init = initMap;


    return GMH;
  })(GMH || {});





