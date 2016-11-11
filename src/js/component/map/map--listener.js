
// ===========================================
// Map - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Class
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    }   


    // Public Methods
    // =======================================
    var addListener = function(type, fn) {
      return _executeAdd(type, fn);
    }

    var removeListenerType = function(type) {
      return _executeRemoveType(type);
    }

    var removeAllListeners = function() {
      return _removeAll();
    }


    // Execute
    // =======================================
    var _executeAdd = function(type, fn) {
      if (Array.isArray(type)) {
        return _executeAddMulti(type);
      }

      return _add(type, fn);
    }
    var _executeAddMulti = function(objects) {
      var listenerArray = [];

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the type
        var type = Object.keys(objects[i])[0];

        // get the function
        var fn = objects[i][type];
        
        listenerArray.push(_add(type, fn));
      }

      return listenerArray;
    }


    var _executeRemoveType = function(type) {

      // check if array of types is passed
      if (Array.isArray(type)) {
        return _executeRemoveTypeMulti(type)
      }

      return _removeType(type);
    }
    var _executeRemoveTypeMulti = function(types) {
      for (var i = 0, i_len = types.length; i < i_len; i++) {
        var type = types[i];

        _removeType(type); 
      }
    }


    // Actions
    // =======================================
    var _add = function(type, func) {
      try {
        // allow type to be less sensitive
        type = _getType(type);

        return google.maps.event.addListener(GMH.Data.Map.Obj, type, func);
      }
      catch (ex) {
        
      }
    }

    var _removeType = function(type) {
      // allow type to be less sensitive
      type = _getType(type);

      google.maps.event.clearListeners(GMH.Data.Map.Obj, type);
    }

    var _removeAll = function() {
      google.maps.event.clearInstanceListeners(GMH.Data.Map.Obj);
    }


    // Utility Functions
    // =======================================

    var _getType = function(type) {
      // remove case and spaces
      type = type.toLowerCase().replace(/\s+/g, '');

      switch(type) {
        case "doubleclick":
          type = "dblclick";
          break;

        case "boundschanged":
          type = "bounds_changed";
          break;

        case "centerchanged":
          type = "center_changed";
          break;

        case "headingchanged":
          type = "heading_changed";
          break;

        case "maptypeidchanged":
          type = "maptypeid_changed";
          break;

        case "projectionchanged":
          type = "projection_changed";
          break;

        case "tiltchanged":
          type = "tilt_changed";
          break;

        case "zoomchanged":
          type = "zoom_changed";
          break;
      }

      return type;
    }


    // Expose Public Methods
    // =======================================
    GMH.Map.addListener = addListener;
    GMH.Map.removeListenerType = removeListenerType;
    GMH.Map.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});

