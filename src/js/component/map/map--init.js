
// ===========================================
// Map - Init
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Map Object
    // =======================================
    var Map = function(obj) {
      this.Obj = obj;
    }

    Map.prototype = {
      setBounds: function(type, id) { return GMH.Map.setBounds(type, id) },
      addListener: function(type, fn) { return GMH.Map.addListener(type, fn) },
      removeListenerType: function(type) { return GMH.Map.removeListenerType(type) },
      removeAllListeners: function() { return GMH.Map.removeAllListeners() }
    }


    // GMH Map Class
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Public Methods
    // =======================================
    var initMap = function(container, userOptions) {

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Map, userOptions)
     
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


    // Expose Public Methods
    // =======================================
    GMH.Map.init = initMap;


    return GMH;
  })(GMH || {});

