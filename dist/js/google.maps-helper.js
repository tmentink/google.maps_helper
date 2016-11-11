// ===========================================
// jQuery Shim
// ===========================================
!function(window) {
  "use strict";
  // if jQuery is already loaded then exit shim
  if (window.jQuery) {
    return;
  }
  // jQuery Base
  // =======================================
  var $ = {};
  // Extend
  // =======================================
  $.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    // Handle a deep copy situation
    if (typeof target === "boolean") {
      deep = target;
      // Skip the boolean and the target
      target = arguments[i] || {};
      i++;
    }
    // Handle case when target is a string or something (possible in deep copy)
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    // Extend jQuery itself if only one argument is passed
    if (i === length) {
      target = this;
      i--;
    }
    for (;i < length; i++) {
      // Only deal with non-null/undefined values
      if ((options = arguments[i]) != null) {
        // Extend the base object
        for (name in options) {
          src = target[name];
          copy = options[name];
          // Prevent never-ending loop
          if (target === copy) {
            continue;
          }
          // Recurse if we're merging plain objects or arrays
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            // Never move original objects, clone them
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    // Return the modified object
    return target;
  };
  // Add to Window
  // =======================================
  window.$ = $;
}(window);

// ===========================================
// Data
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Data Class
  // =======================================
  GMH.Data = {};
  GMH.Data.Map = {};
  GMH.Data.Marker = {};
  GMH.Data.Polygon = {};
  return GMH;
}(GMH || {});

// ===========================================
// Defaults
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Defaults Class
  // =======================================
  GMH.Defaults = {};
  // Map Defaults
  // =======================================
  GMH.Defaults.Map = {
    zoom: 6,
    center: {
      lat: 37.5,
      lng: -120
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  // Polygon Defaults
  // =======================================
  GMH.Defaults.Polygon = {
    strokeColor: "#000",
    strokeOpacity: .8,
    strokeWeight: 1,
    fillColor: "#1984AE",
    fillOpacity: .8
  };
  // Marker Defaults
  // =======================================
  GMH.Defaults.Marker = {};
  // Set Defaults
  // =======================================
  var setDefaults = function(type, userOptions) {
    return _changeDefaults("set", type, userOptions);
  };
  // Update Defaults
  // =======================================
  var updateDefaults = function(type, userOptions) {
    return _changeDefaults("update", type, userOptions);
  };
  // Change Defaults
  // =======================================
  var _changeDefaults = function(action, type, userOptions) {
    type = _getType(type);
    var newOptions = userOptions;
    // combine user and default options
    if (action == "update") {
      newOptions = $.extend({}, GMH.Defaults[type], userOptions);
    }
    // set new defaults
    GMH.Defaults[type] = newOptions;
  };
  // Get Type
  // =======================================
  // allow type to be case and plural insensitive
  var _getType = function(type) {
    type = type.toLowerCase();
    switch (type) {
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

     case "marker":
      type = "Marker";
      break;

     case "markers":
      type = "Marker";
      break;
    }
    return type;
  };
  // Public Methods
  // =======================================
  GMH.Defaults.set = setDefaults;
  GMH.Defaults.update = updateDefaults;
  return GMH;
}(GMH || {});

// ===========================================
// Utility
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Utility Class
  // =======================================
  if (typeof GMH.Utility == "undefined") {
    GMH.Utility = {};
  }
  // To LatLng
  // =======================================
  var toLatLng = function(str) {
    try {
      var points = str.split(",");
      // return a google maps latLng object
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
    } catch (ex) {
      console.log(ex);
      return {};
    }
  };
  // To LatLng Array
  // =======================================
  var toLatLngArray = function(str) {
    try {
      var latLngArray = [];
      // split the string into an array of coordinate paris
      var coordPairs = str.split("|");
      for (var i = 0, i_len = coordPairs.length; i < i_len; i++) {
        var points = coordPairs[i].split(",");
        // create a google maps latLng object
        var latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
        // add to latLngArray
        latLngArray.push(latLng);
      }
      return latLngArray;
    } catch (ex) {
      console.log(ex);
      return [];
    }
  };
  // Public Methods
  // =======================================
  GMH.Utility.toLatLng = toLatLng;
  GMH.Utility.toLatLngArray = toLatLngArray;
  return GMH;
}(GMH || {});

// ===========================================
// Map - Bounds
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Map Class
  // =======================================
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  // Public Methods
  // =======================================
  var setBounds = function(type, id) {
    return _execute(type, id);
  };
  // Execute
  // =======================================
  var _execute = function(type, id) {
    // check if an array of types is passed
    if (Array.isArray(type)) {
      return _executeMulti(type);
    }
    // allow type to be less sensitive
    type = _getType(type);
    // set map bounds and zoom to it's initial value
    if (type == "initial" || type == "init") {
      GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
      GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
      return;
    }
    // if id is null, get an array of all ids for the given type
    id = id == null ? _getIDs(type) : id;
    // get the bounds of the id
    var bounds = _getBounds(type, id);
    // set maps bounds 
    GMH.Data.Map.Obj.fitBounds(bounds);
    return GMH.Data.Map;
  };
  var _executeMulti = function(typeObjects) {
    var bounds = new google.maps.LatLngBounds();
    // loop through each type object
    for (var i = 0, i_len = typeObjects.length; i < i_len; i++) {
      // the only property in the object should be the type
      var type = Object.keys(typeObjects[i])[0];
      // get the id(s)
      var id = typeObjects[i][type];
      // allow type to be less sensitive
      type = _getType(type);
      // if id is null, get an array of all ids for the given type
      id = id == null ? _getIDs(type) : id;
      // merge the bounds
      bounds.union(_getBounds(type, id));
    }
    // set maps bounds
    GMH.Data.Map.Obj.fitBounds(bounds);
    return GMH.Data.Map;
  };
  // Actions
  // =======================================
  var _getBounds = function(type, id) {
    // check if an array of ids is passed
    if (Array.isArray(id)) {
      return _getBoundsMulti(type, id);
    }
    // return empty bounds if id doesn't exist
    if (GMH.Data[type][id] == null) {
      return new google.map.LatLngBounds();
    }
    return GMH.Data[type][id].getBounds();
  };
  var _getBoundsMulti = function(type, ids) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont' exist
      if (GMH.Data[type][id] == null) {
        continue;
      }
      // merge bounds
      bounds.union(GMH.Data[type][id].getBounds());
    }
    return bounds;
  };
  // Utility Functions
  // =======================================
  var _getType = function(type) {
    type = type.toLowerCase();
    switch (type) {
     case "polygon":
      type = "Polygon";
      break;

     case "polygons":
      type = "Polygon";
      break;

     case "marker":
      type = "Marker";
      break;

     case "markers":
      type = "Marker";
      break;
    }
    return type;
  };
  var _getIDs = function(type) {
    // get an array of all the ids for the given data type
    var ids = Object.keys(GMH.Data[type]);
    // remove _index from the array
    ids.splice(ids.indexOf("_index"), 1);
    return ids;
  };
  // Expose Public Methods
  // =======================================
  GMH.Map.setBounds = setBounds;
  return GMH;
}(GMH || {});

// ===========================================
// Map - Init
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // Map Object
  // =======================================
  var Map = function(obj) {
    this.Obj = obj;
  };
  Map.prototype = {
    setBounds: function(type, id) {
      return GMH.Map.setBounds(type, id);
    }
  };
  // GMH Map Class
  // =======================================
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  // Public Methods
  // =======================================
  var initMap = function(container, userOptions) {
    // combine user and default options
    var options = $.extend({}, GMH.Defaults.Map, userOptions);
    // create new google map
    var googleMap = new google.maps.Map(document.getElementById(container), options);
    // add GMH object to google map
    googleMap.GMH = {
      Parent: function() {
        return GMH.Data.Map;
      }
    };
    // create new map and save reference
    GMH.Data.Map = new Map(googleMap);
    // save bounds after map has finished initializing
    setTimeout(function() {
      GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
      GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
    }, 500);
    return GMH.Data.Map;
  };
  // Expose Public Methods
  // =======================================
  GMH.Map.init = initMap;
  return GMH;
}(GMH || {});

// ===========================================
// Marker - Add
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // Marker Object
  // =======================================
  var Marker = function(id, obj) {
    this.ID = id;
    this.Obj = obj;
  };
  Marker.prototype = {
    hide: function() {
      return GMH.Marker.hide(this.ID);
    },
    show: function() {
      return GMH.Marker.show(this.ID);
    },
    toggle: function() {
      return GMH.Marker.toggle(this.ID);
    },
    delete: function() {
      return GMH.Marker.delete(this.ID);
    },
    update: function(options) {
      return GMH.Marker.update(this.ID, options);
    },
    updatePosition: function(position) {
      return GMH.Marker.updatePosition(this.ID, position);
    },
    getBounds: function() {
      return GMH.Marker.getBounds(this.ID);
    },
    addListener: function(type, func) {
      return GMH.Marker.addListener(this.ID, type, func);
    },
    removeListenerType: function(type) {
      return GMH.Marker.removeListenerType(this.ID, type);
    },
    removeAllListeners: function() {
      return GMH.Marker.removeAllListeners(this.ID);
    }
  };
  // GMH Marker Class
  // =======================================
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  // Public Methods
  // =======================================
  var addMarker = function(id, position, options) {
    return _execute(id, position, options);
  };
  // Execute
  // =======================================
  var _execute = function(id, position, userOptions) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    // if left null, default id to next index
    id = id == null ? _getIndex() : id;
    // check if id already exists
    if (GMH.Data.Marker[id]) {
      console.log("ERROR: ID already exists");
      return;
    }
    // check if position is supplied
    if (position == null) {
      console.log("ERROR: Must supply a position");
      return;
    }
    // return the marker object
    return _add(id, position, userOptions);
  };
  var _executeMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var position = objects[i].position;
      var options = objects[i].options;
      // if left null, default id to next index
      id = id == null ? _getIndex() : id;
      // skip if id already exists or position is null
      if (GMH.Data.Marker[id] || position == null) {
        continue;
      }
      // add marker object to array
      objArray.push(_add(id, position, options));
    }
    return objArray;
  };
  // Actions
  // =======================================
  var _add = function(id, position, userOptions) {
    if (typeof position == "string") {
      position = GMH.Utility.toLatLng(position);
    }
    // combine user and default options
    var options = $.extend({}, GMH.Defaults.Marker, userOptions);
    // add map and position to options
    options.map = GMH.Data.Map.Obj;
    options.position = position;
    // create new google marker
    var googleMarker = new google.maps.Marker(options);
    // add GMH object to google marker
    googleMarker.GMH = {
      ID: id,
      Parent: function() {
        return GMH.Data.Marker[this.ID];
      }
    };
    // create new marker and save reference
    GMH.Data.Marker[id] = new Marker(id, googleMarker);
    // return marker object
    return GMH.Data.Marker[id];
  };
  // Utility Functions
  // =======================================
  // create an index variable for auto creating an id
  GMH.Data.Marker._index = 0;
  var _getIndex = function() {
    GMH.Data.Marker._index++;
    // return number prior to incrementing
    return GMH.Data.Marker._index - 1;
  };
  // Expose Public Methods
  // =======================================
  GMH.Marker.add = addMarker;
  return GMH;
}(GMH || {});

// ===========================================
// Marker - Bounds
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Marker Class
  // =======================================
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  // Public Methods
  // =======================================
  var getBounds = function(id) {
    return _execute(id);
  };
  // Execute
  // =======================================
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    // check if id exists
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    return _getBounds(id);
  };
  var _executeMulti = function(ids) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      // merge the bounds
      bounds.union(_getBounds(id));
    }
    return bounds;
  };
  // Actions
  // =======================================
  var _getBounds = function(id) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(GMH.Data.Marker[id].Obj.getPosition());
    return bounds;
  };
  // Expose Public Methods
  // =======================================
  GMH.Marker.getBounds = getBounds;
  return GMH;
}(GMH || {});

// ===========================================
// Marker - Delete
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Marker Class
  // =======================================
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  // Public Methods
  // =======================================
  var deleteMarker = function(id) {
    return _execute(id);
  };
  // Execute
  // =======================================
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    // check if id exists
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    // return the deleted object
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var objArray = [];
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      // add object to array
      objArray.push(_delete(id));
    }
    return objArray;
  };
  // Actions
  // =======================================
  var _delete = function(id) {
    // get the object
    var marker = GMH.Data.Marker[id];
    // remove from map
    marker.Obj.setMap(null);
    // delete the id 
    delete GMH.Data.Marker[id];
    // return the object
    return marker;
  };
  // Expose Public Methods
  // =======================================
  GMH.Marker.delete = deleteMarker;
  return GMH;
}(GMH || {});

// ===========================================
// Marker - Display
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Marker Class
  // =======================================
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  // Public Methods
  // =======================================
  var toggleMarker = function(id) {
    return _execute("toggle", id);
  };
  var showMarker = function(id) {
    return _execute("show", id);
  };
  var hideMarker = function(id) {
    return _execute("hide", id);
  };
  // Execute
  // =======================================
  var _execute = function(action, id) {
    if (Array.isArray(id)) {
      return _executeMulti(action, id);
    }
    // check if id exists
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a Marker");
      return;
    }
    return _switch(action, id);
  };
  var _executeMulti = function(action, ids) {
    var objArray = [];
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      // add object to array
      objArray.push(_switch(action, id));
    }
    return objArray;
  };
  // determine which action to execute
  var _switch = function(action, id) {
    switch (action) {
     case "toggle":
      return _toggle(id);

     case "show":
      return _show(id);

     case "hide":
      return _hide(id);
    }
  };
  // Actions
  // =======================================
  var _toggle = function(id) {
    // get the current visibility
    var state = GMH.Data.Marker[id].Obj.getVisible();
    // toggle the visibility
    GMH.Data.Marker[id].Obj.setOptions({
      visible: !state
    });
    return GMH.Data.Marker[id];
  };
  var _show = function(id) {
    GMH.Data.Marker[id].Obj.setOptions({
      visible: true
    });
    return GMH.Data.Marker[id];
  };
  var _hide = function(id) {
    GMH.Data.Marker[id].Obj.setOptions({
      visible: false
    });
    return GMH.Data.Marker[id];
  };
  // Expose Public Methods
  // =======================================
  GMH.Marker.toggle = toggleMarker;
  GMH.Marker.show = showMarker;
  GMH.Marker.hide = hideMarker;
  return GMH;
}(GMH || {});

// ===========================================
// Marker - Listener
// ===========================================
var GMH = function(GMH) {
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
      console.log("ERROR: ID does not reference a Marker");
      return;
    }
    return _add(id, type, fn);
  };
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
  };
  var _executeRemoveType = function(id, type) {
    // allow type to be less sensitive
    type = _getType(type);
    // check if array of ids is passed
    if (Array.isArray(id)) {
      return _executeRemoveTypeMulti(id, type);
    }
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    return _removeType(id, type);
  };
  var _executeRemoveTypeMulti = function(ids, type) {
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      _removeType(id, type);
    }
  };
  var _executeRemoveAll = function(id) {
    // check if array of ids is passed
    if (Array.isArray(id)) {
      return _executeRemoveAllMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    return _removeAll(id);
  };
  var _executeRemoveAllMulti = function(ids) {
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      _removeType(id);
    }
  };
  // Actions
  // =======================================
  var _add = function(id, type, func) {
    try {
      // allow type to be less sensitive
      type = _getType(type);
      return google.maps.event.addListener(GMH.Data.Marker[id].Obj, type, func);
    } catch (ex) {}
  };
  var _removeType = function(id, type) {
    google.maps.event.clearListeners(GMH.Data.Marker[id].Obj, type);
  };
  var _removeAll = function(id) {
    google.maps.event.clearInstanceListeners(GMH.Data.Marker[id].Obj);
  };
  // Utility Functions
  // =======================================
  var _getType = function(type) {
    // remove case and spaces
    type = type.toLowerCase().replace(/\s+/g, "");
    switch (type) {
     case "doubleclick":
      type = "dblclick";
      break;

     case "animationchanged":
      type = "animation_changed";
      break;

     case "clickablechanged":
      type = "clickable_changed";
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
  };
  // Expose Public Methods
  // =======================================
  GMH.Marker.addListener = addListener;
  GMH.Marker.removeListenerType = removeListenerType;
  GMH.Marker.removeAllListeners = removeAllListeners;
  return GMH;
}(GMH || {});

// ===========================================
// Marker - Update
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Marker Class
  // =======================================
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  // Public Methods
  // =======================================
  var updateMarker = function(id, options) {
    return _executeUpdate(id, options);
  };
  var updatePosition = function(id, position) {
    return _executeUpdatePosition(id, position);
  };
  // Execute
  // =======================================
  var _executeUpdate = function(id, options) {
    if (Array.isArray(id)) {
      return _executeUpdateMulti(id);
    }
    // check if id exists
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    // if options is null, get default options
    options = options == null ? GMH.Defaults.Marker : options;
    return _update(id, options);
  };
  var _executeUpdateMulti = function(Markers) {
    var objArray = [];
    for (var i = 0, i_len = Markers.length; i < i_len; i++) {
      // the only property in the object should be the id
      var id = Object.keys(Markers[i])[0];
      // skip if id doesnt exists
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      // get the options
      var options = Markers[i][id];
      // if options are null, get default options
      options = options == null ? GMH.Defaults.Marker : options;
      // add object to array
      objArray.push(_update(id, options));
    }
    return objArray;
  };
  var _executeUpdatePosition = function(id, position) {
    if (Array.isArray(id)) {
      return _executeUpdatePositionMulti(id);
    }
    // check if id exists
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a Marker");
      return;
    }
    // check if position is supplied
    if (position == null) {
      console.log("ERROR: Must supply a position");
      return;
    }
    return _updatePosition(id, position);
  };
  var _executeUpdatePositionMulti = function(Markers) {
    var objArray = [];
    for (var i = 0, i_len = Markers.length; i < i_len; i++) {
      // the only property in the object should be the id
      var id = Object.keys(Markers[i])[0];
      // skip if id doesnt exists
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      // get the position
      var position = Markers[i][id];
      // skip over if position is null
      if (position == null) {
        continue;
      }
      // add object to array
      objArray.push(_updatePosition(id, position));
    }
    return objArray;
  };
  // Actions
  // =======================================
  var _update = function(id, options) {
    if (typeof options.position == "string") {
      options.position = GMH.Utility.toLatLng(options.position);
    }
    // update with new options
    GMH.Data.Marker[id].Obj.setOptions(options);
    return GMH.Data.Marker[id];
  };
  var _updatePosition = function(id, position) {
    if (typeof position == "string") {
      position = GMH.Utility.toLatLng(position);
    }
    // update the markers position
    GMH.Data.Marker[id].Obj.setOptions({
      position: position
    });
    return GMH.Data.Marker[id];
  };
  // Expose Public Methods
  // =======================================
  GMH.Marker.update = updateMarker;
  GMH.Marker.updatePosition = updatePosition;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Add
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // Polygon Object
  // =======================================
  var Polygon = function(id, obj) {
    this.ID = id;
    this.Obj = obj;
  };
  Polygon.prototype = {
    hide: function() {
      return GMH.Polygon.hide(this.ID);
    },
    show: function() {
      return GMH.Polygon.show(this.ID);
    },
    toggle: function() {
      return GMH.Polygon.toggle(this.ID);
    },
    delete: function() {
      return GMH.Polygon.delete(this.ID);
    },
    update: function(options) {
      return GMH.Polygon.update(this.ID, options);
    },
    updatePath: function(path) {
      return GMH.Polygon.updatePath(this.ID, path);
    },
    getBounds: function() {
      return GMH.Polygon.getBounds(this.ID);
    },
    addListener: function(type, func) {
      return GMH.Polygon.addListener(this.ID, type, func);
    },
    removeListenerType: function(type) {
      return GMH.Polygon.removeListenerType(this.ID, type);
    },
    removeAllListeners: function() {
      return GMH.Polygon.removeAllListeners(this.ID);
    }
  };
  // GMH Polygon Class
  // =======================================
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  // Public Methods
  // =======================================
  var addPolygon = function(id, path, options) {
    return _execute(id, path, options);
  };
  // Execute
  // =======================================
  var _execute = function(id, path, userOptions) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    // if left null, default id to next index
    id = id == null ? _getIndex() : id;
    // check if id already exists
    if (GMH.Data.Polygon[id]) {
      console.log("ERROR: ID already exists");
      return;
    }
    // check if path is supplied
    if (path == null) {
      console.log("ERROR: Must supply a path");
      return;
    }
    // return the polygon object
    return _add(id, path, userOptions);
  };
  var _executeMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var path = objects[i].path;
      var options = objects[i].options;
      // if left null, default id to next index
      id = id == null ? _getIndex() : id;
      // skip if id already exists or path is null
      if (GMH.Data.Polygon[id] || path == null) {
        continue;
      }
      // add polygon object to array
      objArray.push(_add(id, path, options));
    }
    return objArray;
  };
  // Actions
  // =======================================
  var _add = function(id, path, userOptions) {
    if (typeof path == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    // combine user and default options
    var options = $.extend({}, GMH.Defaults.Polygon, userOptions);
    // add map and path to options
    options.map = GMH.Data.Map.Obj;
    options.path = path;
    // create new google Polygon
    var googlePolygon = new google.maps.Polygon(options);
    // add GMH object to google polygon
    googlePolygon.GMH = {
      ID: id,
      Parent: function() {
        return GMH.Data.Polygon[this.ID];
      }
    };
    // create new polygon and save reference
    GMH.Data.Polygon[id] = new Polygon(id, googlePolygon);
    // return polygon object
    return GMH.Data.Polygon[id];
  };
  // Utility Functions
  // =======================================
  // create an index variable for auto creating an id
  GMH.Data.Polygon._index = 0;
  var _getIndex = function() {
    GMH.Data.Polygon._index++;
    // return number prior to incrementing
    return GMH.Data.Polygon._index - 1;
  };
  // Expose Public Methods
  // =======================================
  GMH.Polygon.add = addPolygon;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Bounds
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Polygon Class
  // =======================================
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  // Public Methods
  // =======================================
  var getBounds = function(id) {
    return _execute(id);
  };
  // Execute
  // =======================================
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    // check if id exists
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a polygon");
      return;
    }
    return _getBounds(id);
  };
  var _executeMulti = function(ids) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      // merge the bounds
      bounds.union(_getBounds(id));
    }
    return bounds;
  };
  // Actions
  // =======================================
  var _getBounds = function(id) {
    var bounds = new google.maps.LatLngBounds();
    var paths = GMH.Data.Polygon[id].Obj.getPaths();
    // loop through each path
    for (var i = 0, i_len = paths.length; i < i_len; i++) {
      var path = paths.getAt(i);
      // loop through all points in path
      for (var j = 0, j_len = path.getLength(); j < j_len; j++) {
        bounds.extend(path.getAt(j));
      }
    }
    return bounds;
  };
  // Expose Public Methods
  // =======================================
  GMH.Polygon.getBounds = getBounds;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Delete
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Polygon Class
  // =======================================
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  // Public Methods
  // =======================================
  var deletePolygon = function(id) {
    return _execute(id);
  };
  // Execute
  // =======================================
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    // check if id exists
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    // return the deleted object
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var objArray = [];
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      // add object to array
      objArray.push(_delete(id));
    }
    return objArray;
  };
  // Actions
  // =======================================
  var _delete = function(id) {
    // get the object
    var Polygon = GMH.Data.Polygon[id];
    // remove from map
    Polygon.Obj.setMap(null);
    // delete the id 
    delete GMH.Data.Polygon[id];
    // return the object
    return Polygon;
  };
  // Expose Public Methods
  // =======================================
  GMH.Polygon.delete = deletePolygon;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Display
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Polygon Class
  // =======================================
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  // Public Methods
  // =======================================
  var togglePolygon = function(id) {
    return _execute("toggle", id);
  };
  var showPolygon = function(id) {
    return _execute("show", id);
  };
  var hidePolygon = function(id) {
    return _execute("hide", id);
  };
  // Execute
  // =======================================
  var _execute = function(action, id) {
    if (Array.isArray(id)) {
      return _executeMulti(action, id);
    }
    // check if id exists
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    return _switch(action, id);
  };
  var _executeMulti = function(action, ids) {
    var objArray = [];
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      // add object to array
      objArray.push(_switch(action, id));
    }
    return objArray;
  };
  // determine which action to execute
  var _switch = function(action, id) {
    switch (action) {
     case "toggle":
      return _toggle(id);

     case "show":
      return _show(id);

     case "hide":
      return _hide(id);
    }
  };
  // Actions
  // =======================================
  var _toggle = function(id) {
    // get the current visibility
    var state = GMH.Data.Polygon[id].Obj.getVisible();
    // toggle the visibility
    GMH.Data.Polygon[id].Obj.setOptions({
      visible: !state
    });
    return GMH.Data.Polygon[id];
  };
  var _show = function(id) {
    GMH.Data.Polygon[id].Obj.setOptions({
      visible: true
    });
    return GMH.Data.Polygon[id];
  };
  var _hide = function(id) {
    GMH.Data.Polygon[id].Obj.setOptions({
      visible: false
    });
    return GMH.Data.Polygon[id];
  };
  // Expose Public Methods
  // =======================================
  GMH.Polygon.toggle = togglePolygon;
  GMH.Polygon.show = showPolygon;
  GMH.Polygon.hide = hidePolygon;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Listener
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Polygon Class
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
    if (Array.isArray(id)) {
      return _executeAddMulti(id);
    }
    // check if id exists
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    return _add(id, type, fn);
  };
  var _executeAddMulti = function(objects) {
    var listenerArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var type = objects[i].type;
      var fn = objects[i].fn;
      // skip over ids that dont exist
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      listenerArray.push(_add(id, type, fn));
    }
    return listenerArray;
  };
  var _executeRemoveType = function(id, type) {
    // allow type to be less sensitive
    type = _getType(type);
    // check if array of ids is passed
    if (Array.isArray(id)) {
      return _executeRemoveTypeMulti(id, type);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    return _removeType(id, type);
  };
  var _executeRemoveTypeMulti = function(ids, type) {
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      _removeType(id, type);
    }
  };
  var _executeRemoveAll = function(id) {
    // check if array of ids is passed
    if (Array.isArray(id)) {
      return _executeRemoveAllMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    return _removeAll(id);
  };
  var _executeRemoveAllMulti = function(ids) {
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      // skip over ids that dont exist
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      _removeType(id);
    }
  };
  // Actions
  // =======================================
  var _add = function(id, type, func) {
    try {
      // allow type to be less sensitive
      type = _getType(type);
      return google.maps.event.addListener(GMH.Data.Polygon[id].Obj, type, func);
    } catch (ex) {}
  };
  var _removeType = function(id, type) {
    google.maps.event.clearListeners(GMH.Data.Polygon[id].Obj, type);
  };
  var _removeAll = function(id) {
    google.maps.event.clearInstanceListeners(GMH.Data.Polygon[id].Obj);
  };
  // Utility Functions
  // =======================================
  var _getType = function(type) {
    // remove case and spaces
    type = type.toLowerCase().replace(/\s+/g, "");
    switch (type) {
     case "doubleclick":
      type = "dblclick";
      break;
    }
    return type;
  };
  // Expose Public Methods
  // =======================================
  GMH.Polygon.addListener = addListener;
  GMH.Polygon.removeListenerType = removeListenerType;
  GMH.Polygon.removeAllListeners = removeAllListeners;
  return GMH;
}(GMH || {});

// ===========================================
// Polygon - Update
// ===========================================
var GMH = function(GMH) {
  "use strict";
  // GMH Polygon Class
  // =======================================
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  // Public Methods
  // =======================================
  var updatePolygon = function(id, options) {
    return _executeUpdate(id, options);
  };
  var updatePath = function(id, path) {
    return _executeupdatePath(id, path);
  };
  // Execute
  // =======================================
  var _executeUpdate = function(id, options) {
    if (Array.isArray(id)) {
      return _executeUpdateMulti(id);
    }
    // check if id exists
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    // if options is null, get default options
    options = options == null ? GMH.Defaults.Polygon : options;
    return _update(id, options);
  };
  var _executeUpdateMulti = function(Polygons) {
    var objArray = [];
    for (var i = 0, i_len = Polygons.length; i < i_len; i++) {
      // the only property in the object should be the id
      var id = Object.keys(Polygons[i])[0];
      // skip if id doesnt exists
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      // get the options
      var options = Polygons[i][id];
      // if options are null, get default options
      options = options == null ? GMH.Defaults.Polygon : options;
      // add object to array
      objArray.push(_update(id, options));
    }
    return objArray;
  };
  var _executeupdatePath = function(id, path) {
    if (Array.isArray(id)) {
      return _executeupdatePathMulti(id);
    }
    // check if id exists
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    // check if path is supplied
    if (path == null) {
      console.log("ERROR: Must supply a path");
      return;
    }
    return _updatePath(id, path);
  };
  var _executeupdatePathMulti = function(Polygons) {
    var objArray = [];
    for (var i = 0, i_len = Polygons.length; i < i_len; i++) {
      // the only property in the object should be the id
      var id = Object.keys(Polygons[i])[0];
      // skip if id doesnt exists
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      // get the path
      var path = Polygons[i][id];
      // skip over if path is null
      if (path == null) {
        continue;
      }
      // add object to array
      objArray.push(_updatePath(id, path));
    }
    return objArray;
  };
  // Actions
  // =======================================
  var _update = function(id, options) {
    if (typeof options.path == "string") {
      options.path = GMH.Utility.toLatLngArray(options.path);
    }
    // update with new options
    GMH.Data.Polygon[id].Obj.setOptions(options);
    return GMH.Data.Polygon[id];
  };
  var _updatePath = function(id, path) {
    if (typeof path == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    // update the polygons path
    GMH.Data.Polygon[id].Obj.setOptions({
      path: path
    });
    return GMH.Data.Polygon[id];
  };
  // Expose Public Methods
  // =======================================
  GMH.Polygon.update = updatePolygon;
  GMH.Polygon.updatePath = updatePath;
  return GMH;
}(GMH || {});