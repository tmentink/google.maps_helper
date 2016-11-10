
// ===========================================
// Polygon - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Polygon Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Add Listener
    // =======================================
    var addListener = function(id, type, fn) {
      return _executeAdd(id, type, fn);
    }


    // Remove Listener Type
    // =======================================
    var removeListenerType = function(id, type) {
      // allow type to be less sensitive
      type = _getType(type);

      if (Array.isArray(id)) {
        // loop through each id
        for (var i = 0, i_len = id.length; i < i_len; i++) {
          // check if id matches a polygon
          if (GMH.Data.Polygons[id] == undefined) {
            continue;
          }

          _removeType(id[i], type); 
        }
        return;
      }

      _removeType(id, type);
    }


    // Remove All Listeners
    // =======================================
    var removeAllListeners = function(id) {

      if (Array.isArray(id)) {
        // loop through each id
        for (var i = 0, i_len = id.length; i < i_len; i++) {
          // check if id matches a polygon
          if (GMH.Data.Polygons[id] == undefined) {
            continue;
          }

          _removeAll(id[i]); 
        }
        return;
      }

      _removeAll(id);
    }


    // Execute
    // =======================================
    var _executeAdd = function(id, type, fn) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeAddMulti(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // allow type to be less sensitive
      type = _getType(type);

      return _add(id, type, fn);
    }

    var _executeAddMulti = function(polygons) {
      var listenerArray = [];

      // loop through each object
      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        var id = polygons[i].id;
        var type = _getType(polygons[i].type);
        var fn = polygons[i].fn;
        
        // skip over ids that dont match an existing polygon
        if (GMH.Data.Polygons[id] == undefined) { 
          continue; 
        }

        listenerArray.push(_add(id, type, fn));
      }

      return listenerArray;
    }


    // Actions
    // =======================================
    var _add = function(id, type, func) {
      try {
        return google.maps.event.addListener(GMH.Data.Polygons[id].Obj, type, func);
      }
      catch (ex) {
        
      }
    }

    var _removeType = function(id, type) {
      google.maps.event.clearListeners(GMH.Data.Polygons[id].Obj, type);
    }

    var _removeAll = function(id) {
      google.maps.event.clearInstanceListeners(GMH.Data.Polygons[id].Obj);
    }


    // Get Type
    // =======================================
    var _getType = function(type) {
      // remove case and spaces
      type = type.toLowerCase().replace(/\s+/g, '');

      switch(type) {
        case "doubleclick":
          type = "dblclick";
          break;
      }

      return type;
    }


    // Public Methods
    // =======================================
    GMH.Polygon.addListener = addListener;
    GMH.Polygon.removeListenerType = removeListenerType;
    GMH.Polygon.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});





