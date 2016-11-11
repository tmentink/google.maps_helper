
// ===========================================
// Marker - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Class
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }   


    // Public Methods
    // =======================================
    var addListener = function(id, type, fn) {
      return _executeAdd(id, type, fn);
    }

    var removeListenerType = function(id, type) {
      return _executeRemoveType(id, type);
    }

    var removeAllListeners = function(id) {
      return _executeRemoveAll(id);
    }


    // Execute
    // =======================================
    var _executeAdd = function(id, type, fn) {
      if (Array.isArray(id)) {
        return _executeAddMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        console.log("ERROR: ID does not reference a Marker");
        return;
      }

      return _add(id, type, fn);
    }
    var _executeAddMulti = function(objects) {
      var listenerArray = [];

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var type = objects[i].type;
        var fn = objects[i].fn;
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        listenerArray.push(_add(id, type, fn));
      }

      return listenerArray;
    }


    var _executeRemoveType = function(id, type) {
      // allow type to be less sensitive
      type = _getType(type);

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveTypeMulti(id, type)
      }

      if (GMH.Data.Marker[id] == undefined) {
        console.log("ERROR: ID does not reference a marker")
        return;
      }

      return _removeType(id, type);
    }
    var _executeRemoveTypeMulti = function(ids, type) {
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        _removeType(id, type); 
      }
    }


    var _executeRemoveAll = function(id) {

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveAllMulti(id)
      }

      if (GMH.Data.Marker[id] == undefined) {
        console.log("ERROR: ID does not reference a marker")
        return;
      }

      return _removeAll(id);
    }
    var _executeRemoveAllMulti = function(ids) {
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        _removeType(id); 
      }
    }


    // Actions
    // =======================================
    var _add = function(id, type, func) {
      try {
        // allow type to be less sensitive
        type = _getType(type);

        return google.maps.event.addListener(GMH.Data.Marker[id].Obj, type, func);
      }
      catch (ex) {
        
      }
    }

    var _removeType = function(id, type) {
      google.maps.event.clearListeners(GMH.Data.Marker[id].Obj, type);
    }

    var _removeAll = function(id) {
      google.maps.event.clearInstanceListeners(GMH.Data.Marker[id].Obj);
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

        case "animationchanged":
          type = "animation_changed";
          break;

        case "clickablechanged":
          type ="clickable_changed";
          break;

        case "cursorchanged":
          type = "cursor_changed";
          break;

        case "draggablechanged":
          type = "draggable_changed";
          break;

        case "flatchanged": 
          type = "flat_changed";
          break;

        case "iconchanged":
          type = "icon_changed";
          break;

        case "positionchanged":
          type = "position_changed";
          break;

        case "shapechanged":
          type = "shape_changed";
          break;

        case "titlechanged":
          type = "title_changed";
          break;

        case "visiblechanged":
          type = "visible_changed";
          break;

        case "zindexchanged":
          type = "zindex_changed";
          break;
      }

      return type;
    }


    // Expose Public Methods
    // =======================================
    GMH.Marker.addListener = addListener;
    GMH.Marker.removeListenerType = removeListenerType;
    GMH.Marker.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});

