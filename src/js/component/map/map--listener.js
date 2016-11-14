
// ===========================================
// Map - Listener
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
    var addListener = function(type, fn) {
      _executeAdd(type, fn);
      return GMH.Data.Map;
    };

    var removeListenerType = function(type) {
      _executeRemoveType(type);
      return GMH.Data.Map;
    };

    var removeAllListeners = function() {
      _removeAll();
      return GMH.Data.Map;
    };


    // Execute
    // =======================================
    var _executeAdd = function(type, fn) {
      if ($.isArray(type)) {
        return _executeAddMulti(type);
      }

      // add the listener
      _add(type, fn);
    };

    var _executeAddMulti = function(objects) {
      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the type
        var type = Object.keys(objects[i])[0];

        // get the function
        var fn = objects[i][type];
        
        // add the listener
        _add(type, fn);
      }
    };


    var _executeRemoveType = function(type) {

      // check if array of types is passed
      if ($.isArray(type)) {
        return _executeRemoveTypeMulti(type);
      }

      _removeType(type);
    };

    var _executeRemoveTypeMulti = function(types) {
      for (var i = 0, i_len = types.length; i < i_len; i++) {
        var type = types[i];

        _removeType(type); 
      }
    };


    // Actions
    // =======================================
    var _add = function(type, func) {
      try {
        // allow type to be less sensitive
        type = GMH.Utility.getEventType(type);

        google.maps.event.addListener(GMH.Data.Map.Obj, type, func);
      }
      catch (ex) {
        
      }
    };

    var _removeType = function(type) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);

      google.maps.event.clearListeners(GMH.Data.Map.Obj, type);
    };

    var _removeAll = function() {
      google.maps.event.clearInstanceListeners(GMH.Data.Map.Obj);
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.addListener = addListener;
    GMH.Map.removeListenerType = removeListenerType;
    GMH.Map.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});

