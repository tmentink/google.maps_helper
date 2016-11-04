
// ===========================================
// Map
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Default Options
    // =======================================
    var _DEFAULTS = {
      map: {
        zoom: 6,
        center: { lat: 37.5, lng: -120 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    }


    // Google Maps Helper Object
    // =======================================
    GMH.Map = {};


    // Init Map
    // =======================================
    var initMap = function(container, userOptions) {
      try {
        // get default options
        var defaults = _DEFAULTS.map;

        // combine user and default options
        var options = $.extend({}, defaults, userOptions)
       
        // create new map and save reference
        GMH.Data.Map = new google.maps.Map(document.getElementById(container), options);

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
