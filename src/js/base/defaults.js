
// ===========================================
// Defaults
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Defaults Namespace
    // =======================================
    GMH.Defaults = {};
    

    // Object Defaults
    // =======================================
    GMH.Defaults.Map = {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false
    };

    GMH.Defaults.Label = {
      fontSize: 14,
      fontColor: "#000",
      strokeColor: '#FFF',
      strokeWeight: 1,
      align: "center"
    };

    GMH.Defaults.Marker = {};

    GMH.Defaults.Polygon = {
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#1984AE',
      fillOpacity: 0.8
    };


    // Public Methods
    // =======================================
    var setDefaults = function(type, userOptions) {
      return _execute("set", type, userOptions);
    };

    var updateDefaults = function(type, userOptions) {
      return _execute("update", type, userOptions);
    };


    // Execute
    // =======================================
    var _execute = function(action, type, userOptions) {    
      // allow type to be less sensitive
      type = GMH.Utility.getObjectType(type);
      
      var newOptions = userOptions;

      // combine user and default options
      if (action == "update") {
        newOptions = $.extend({}, GMH.Defaults[type], userOptions);
      }

      // set new defaults
      GMH.Defaults[type] = newOptions;
    };


    // Expose Public Methods
    // =======================================
    GMH.Defaults.set = setDefaults;
    GMH.Defaults.update = updateDefaults;


    return GMH;
  })(GMH || {});

