
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
      if ($.isArray(id)) {
        return _executeAddMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _add(id, type, fn);
    };

    var _executeAddMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var type = objects[i].type;
        var fn = objects[i].fn;
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var poly = _add(id, type, fn);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    var _executeRemoveType = function(id, type) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);

      // check if array of ids is passed
      if ($.isArray(id)) {
        return _executeRemoveTypeMulti(id, type);
      }

      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _removeType(id, type);
    };

    var _executeRemoveTypeMulti = function(ids, type) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var poly = _removeType(id, type);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    var _executeRemoveAll = function(id) {

      // check if array of ids is passed
      if ($.isArray(id)) {
        return _executeRemoveAllMulti(id);
      }

      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _removeAll(id);
    };

    var _executeRemoveAllMulti = function(ids) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var poly = _removeAll(id);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    // Actions
    // =======================================
    var _add = function(id, type, func) {
      try {
        // allow type to be less sensitive
        type = GMH.Utility.getEventType(type);

        google.maps.event.addListener(GMH.Data.Polygon[id].Obj, type, func);

        return GMH.Data.Polygon[id];
      }
      catch (ex) {
        
      }
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

