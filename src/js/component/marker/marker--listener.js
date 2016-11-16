
// ===========================================
// Marker - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
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
        return _executeAddMulti(action, id, type ,fn);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a Marker";
      }

      return _switch(action, id, type, fn);
    };

    var _executeMulti = function(action, ids, type, fn) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _switch(action, id, type, fn);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
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
    var _add = function(id, type, fn) {
      google.maps.event.addListener(GMH.Data.Marker[id].Obj, type, fn);
      return GMH.Data.Marker[id];
    };

    var _removeType = function(id, type) {
      google.maps.event.clearListeners(GMH.Data.Marker[id].Obj, type);
      return GMH.Data.Marker[id];
    };

    var _removeAll = function(id) {
      google.maps.event.clearInstanceListeners(GMH.Data.Marker[id].Obj);
      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.addListener = addListener;
    GMH.Marker.removeListenerType = removeListenerType;
    GMH.Marker.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});

