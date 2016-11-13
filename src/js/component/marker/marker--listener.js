
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
      return _executeAdd(id, type, fn);
    };

    var removeListenerType = function(id, type) {
      return _executeRemoveType(id, type);
    };

    var removeAllListeners = function(id) {
      return _executeRemoveAll(id);
    };


    // Execute
    // =======================================
    var _executeAdd = function(id, type, fn) {
      if (Array.isArray(id)) {
        return _executeAddMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a Marker");
      }

      return _add(id, type, fn);
    };

    var _executeAddMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var type = objects[i].type;
        var fn = objects[i].fn;
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _add(id, type, fn);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeRemoveType = function(id, type) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveTypeMulti(id, type);
      }

      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
      }

      return _removeType(id, type);
    };

    var _executeRemoveTypeMulti = function(ids, type) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // add marker object to array
        var marker = _removeType(id, type);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeRemoveAll = function(id) {
      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveAllMulti(id);
      }

      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
      }

      return _removeAll(id);
    };

    var _executeRemoveAllMulti = function(ids) {
      var markerArray = new GMH.Object.MarkerArray();
      
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }
       
        // add marker object to array
        var marker = _removeAll(id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _add = function(id, type, fn) {
      try {
        // allow type to be less sensitive
        type = GMH.Utility.getEventType(type);

        google.maps.event.addListener(GMH.Data.Marker[id].Obj, type, fn);

        return GMH.Data.Marker[id];
      }
      catch (ex) {
        
      }
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

