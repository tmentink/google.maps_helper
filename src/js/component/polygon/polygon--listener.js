
// ===========================================
// Polygon - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Polygon Namespace
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Public Methods
    // =======================================
    var addListener = function(id, type, fn) {
      return _execute("add", id, type, fn);
    };

    var removeListenerType = function(id, type) {
      return _execute("removeType", id, type);
    };

    var removeAllListeners = function(id) {
      return _execute("removeAll", id);
    };


    // Execute
    // =======================================
    var _execute = function(action, id, type, fn) {
      // allow type to be less sensitive
      type = type ? GMH.Utility.getEventType(type) : null;

      if ($.isArray(id)) {
        return _executeMulti(action, id, type, fn);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }

      return _switch(action, id, type, fn);
    };

    var _executeMulti = function(action, ids, type, fn) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var poly = _switch(action, id, type, fn);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };

    var _switch = function(action, id, type, fn) {
      switch(action) {
        case "add":
          return _add(id, type, fn);

        case "removeType":
          return _removeType(id, type);

        case "removeAll":
          return _removeAll(id);
      }
    }


    // Actions
    // =======================================
    var _add = function(id, type, func) {
      google.maps.event.addListener(GMH.Data.Polygon[id].Obj, type, func);
      return GMH.Data.Polygon[id];
    };

    var _removeType = function(id, type) {
      google.maps.event.clearListeners(GMH.Data.Polygon[id].Obj, type);
      return GMH.Data.Polygon[id];
    };

    var _removeAll = function(id) {
      google.maps.event.clearInstanceListeners(GMH.Data.Polygon[id].Obj);
      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.addListener = addListener;
    GMH.Polygon.removeListenerType = removeListenerType;
    GMH.Polygon.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});

