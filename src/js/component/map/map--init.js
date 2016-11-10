
// ===========================================
// Map - Init
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Data Map Object
    // =======================================
    var Map = function(obj) {
      this.Obj = obj;
    }

    Map.prototype = {
      setBounds: function(type, id) { return GMH.Map.setBounds(type, id) }
    }


    // GMH Map Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Init Map
    // =======================================
    var initMap = function(container, userOptions) {
      // get default options
      var defaults = $.extend({}, {}, GMH.Defaults.Map); 

      // combine user and default options
      var options = $.extend({}, defaults, userOptions)
     
      // create new google map
      var googleMap = new google.maps.Map(document.getElementById(container), options);

      // add GMH object to google map
      googleMap.GMH = {
        Parent: function() { return GMH.Data.Map; }
      }

      // create new map and save reference
      GMH.Data.Map = new Map(googleMap);

      // save bounds after map has finished initializing
      setTimeout(function() {
        GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
        GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
      }, 500);

      return GMH.Data.Map;
    }


    // Public Methods
    // =======================================
    GMH.Map.init = initMap;


    return GMH;
  })(GMH || {});





