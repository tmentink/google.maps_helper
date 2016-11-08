
// ===========================================
// Defaults
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    GMH.Defaults = {};
    

    // Map Defaults
    // =======================================
    GMH.Defaults.Map = {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    // Polygon Defaults
    // =======================================
    GMH.Defaults.Polygon = {
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#FF0000',
      fillOpacity: 0.5
    }


    // Set Defaults
    // =======================================
    var setDefaults = function(type, userOptions) {
      return _changeDefaults("set", type, userOptions);
    }


    // Update Defaults
    // =======================================
    var updateDefaults = function(type, userOptions) {
      return _changeDefaults("update", type, userOptions);
    }


    // Change Defaults
    // =======================================
    var _changeDefaults = function(action, type, userOptions) {
      try {
        type = _getType(type);
        
        var newOptions = userOptions;

        if (action == "update") {
          // get defaults
          var defaults = GMH.Defaults[type];

          // combine user and default options
          newOptions = $.extend({}, defaults, userOptions);
        }

        // set new defaults
        GMH.Defaults[type] = newOptions;
        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Get Type
    // =======================================
    // allow type to be case and plural insensitive
    var _getType = function(type) {
      switch(type.toLowerCase()) {
        case "map":
          type = "Map";
          break;

        case "maps":
          type = "Map";
          break;

        case "polygon":
          type = "Polygon";
          break;

        case "polygons":
          type = "Polygon";
          break;
      }

      return type;
    }



    // Public Methods
    // =======================================
    GMH.Defaults.set = setDefaults;
    GMH.Defaults.update = updateDefaults;


    return GMH;
  })(GMH || {});




