/* Google Maps Helper - v1.0 | License: MIT
 * Copyright 2016 Trent Mentink
 * https://github.com/tmentink/google.maps_helper
 */
!function(window) {
  "use strict";
  if (window.jQuery) {
    return;
  }
  var $ = {};
  $.extend = function() {
    var options, name, src, copy, copyIsArray, clone, target = arguments[0] || {}, i = 1, length = arguments.length, deep = false;
    if (typeof target === "boolean") {
      deep = target;
      target = arguments[i] || {};
      i++;
    }
    if (typeof target !== "object" && !jQuery.isFunction(target)) {
      target = {};
    }
    if (i === length) {
      target = this;
      i--;
    }
    for (;i < length; i++) {
      if ((options = arguments[i]) != null) {
        for (name in options) {
          src = target[name];
          copy = options[name];
          if (target === copy) {
            continue;
          }
          if (deep && copy && (jQuery.isPlainObject(copy) || (copyIsArray = jQuery.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && jQuery.isArray(src) ? src : [];
            } else {
              clone = src && jQuery.isPlainObject(src) ? src : {};
            }
            target[name] = jQuery.extend(deep, clone, copy);
          } else if (copy !== undefined) {
            target[name] = copy;
          }
        }
      }
    }
    return target;
  };
  window.$ = $;
}(window);

var GMH = function(GMH) {
  "use strict";
  GMH.Data = {};
  GMH.Data.Map = {};
  GMH.Data.Marker = {};
  GMH.Data.Polygon = {};
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  GMH.Defaults = {};
  GMH.Defaults.Map = {
    zoom: 6,
    center: {
      lat: 37.5,
      lng: -120
    },
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  GMH.Defaults.Polygon = {
    strokeColor: "#000",
    strokeOpacity: .8,
    strokeWeight: 1,
    fillColor: "#1984AE",
    fillOpacity: .8
  };
  GMH.Defaults.Marker = {};
  var setDefaults = function(type, userOptions) {
    return _changeDefaults("set", type, userOptions);
  };
  var updateDefaults = function(type, userOptions) {
    return _changeDefaults("update", type, userOptions);
  };
  var _changeDefaults = function(action, type, userOptions) {
    type = _getType(type);
    var newOptions = userOptions;
    if (action == "update") {
      newOptions = $.extend({}, GMH.Defaults[type], userOptions);
    }
    GMH.Defaults[type] = newOptions;
  };
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
  GMH.Defaults.set = setDefaults;
  GMH.Defaults.update = updateDefaults;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Utility == "undefined") {
    GMH.Utility = {};
  }
  var toLatLng = function(str) {
    try {
      var points = str.split(",");
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
    } catch (ex) {
      console.log(ex);
      return {};
    }
  };
  var toLatLngArray = function(str) {
    try {
      var latLngArray = [];
      var coordPairs = str.split("|");
      for (var i = 0, i_len = coordPairs.length; i < i_len; i++) {
        var points = coordPairs[i].split(",");
        var latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
        latLngArray.push(latLng);
      }
      return latLngArray;
    } catch (ex) {
      console.log(ex);
      return [];
    }
  };
  GMH.Utility.toLatLng = toLatLng;
  GMH.Utility.toLatLngArray = toLatLngArray;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var setBounds = function(type, id) {
    return _execute(type, id);
  };
  var _execute = function(type, id) {
    if (Array.isArray(type)) {
      return _executeMulti(type);
    }
    type = _getType(type);
    if (type == "initial" || type == "init") {
      GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
      GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
      return;
    }
    id = id == null ? _getIDs(type) : id;
    var bounds = _getBounds(type, id);
    GMH.Data.Map.Obj.fitBounds(bounds);
    return GMH.Data.Map;
  };
  var _executeMulti = function(typeObjects) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = typeObjects.length; i < i_len; i++) {
      var type = Object.keys(typeObjects[i])[0];
      var id = typeObjects[i][type];
      type = _getType(type);
      id = id == null ? _getIDs(type) : id;
      bounds.union(_getBounds(type, id));
    }
    GMH.Data.Map.Obj.fitBounds(bounds);
    return GMH.Data.Map;
  };
  var _getBounds = function(type, id) {
    if (Array.isArray(id)) {
      return _getBoundsMulti(type, id);
    }
    if (GMH.Data[type][id] == null) {
      return new google.map.LatLngBounds();
    }
    return GMH.Data[type][id].getBounds();
  };
  var _getBoundsMulti = function(type, ids) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data[type][id] == null) {
        continue;
      }
      bounds.union(GMH.Data[type][id].getBounds());
    }
    return bounds;
  };
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
    var ids = Object.keys(GMH.Data[type]);
    ids.splice(ids.indexOf("_index"), 1);
    return ids;
  };
  GMH.Map.setBounds = setBounds;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  var Map = function(obj) {
    this.Obj = obj;
  };
  Map.prototype = {
    setBounds: function(type, id) {
      return GMH.Map.setBounds(type, id);
    },
    addListener: function(type, fn) {
      return GMH.Map.addListener(type, fn);
    },
    removeListenerType: function(type) {
      return GMH.Map.removeListenerType(type);
    },
    removeAllListeners: function() {
      return GMH.Map.removeAllListeners();
    }
  };
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var initMap = function(container, userOptions) {
    var options = $.extend({}, GMH.Defaults.Map, userOptions);
    var googleMap = new google.maps.Map(document.getElementById(container), options);
    googleMap.GMH = {
      Parent: function() {
        return GMH.Data.Map;
      }
    };
    GMH.Data.Map = new Map(googleMap);
    setTimeout(function() {
      GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
      GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
    }, 500);
    return GMH.Data.Map;
  };
  GMH.Map.init = initMap;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var addListener = function(type, fn) {
    return _executeAdd(type, fn);
  };
  var removeListenerType = function(type) {
    return _executeRemoveType(type);
  };
  var removeAllListeners = function() {
    return _removeAll();
  };
  var _executeAdd = function(type, fn) {
    if (Array.isArray(type)) {
      return _executeAddMulti(type);
    }
    return _add(type, fn);
  };
  var _executeAddMulti = function(objects) {
    var listenerArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var type = Object.keys(objects[i])[0];
      var fn = objects[i][type];
      listenerArray.push(_add(type, fn));
    }
    return listenerArray;
  };
  var _executeRemoveType = function(type) {
    if (Array.isArray(type)) {
      return _executeRemoveTypeMulti(type);
    }
    return _removeType(type);
  };
  var _executeRemoveTypeMulti = function(types) {
    for (var i = 0, i_len = types.length; i < i_len; i++) {
      var type = types[i];
      _removeType(type);
    }
  };
  var _add = function(type, func) {
    try {
      type = _getType(type);
      return google.maps.event.addListener(GMH.Data.Map.Obj, type, func);
    } catch (ex) {}
  };
  var _removeType = function(type) {
    type = _getType(type);
    google.maps.event.clearListeners(GMH.Data.Map.Obj, type);
  };
  var _removeAll = function() {
    google.maps.event.clearInstanceListeners(GMH.Data.Map.Obj);
  };
  var _getType = function(type) {
    type = type.toLowerCase().replace(/\s+/g, "");
    switch (type) {
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
  };
  GMH.Map.addListener = addListener;
  GMH.Map.removeListenerType = removeListenerType;
  GMH.Map.removeAllListeners = removeAllListeners;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
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
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var addMarker = function(id, position, options) {
    return _execute(id, position, options);
  };
  var _execute = function(id, position, userOptions) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    id = id == null ? _getIndex() : id;
    if (GMH.Data.Marker[id]) {
      console.log("ERROR: ID already exists");
      return;
    }
    if (position == null) {
      console.log("ERROR: Must supply a position");
      return;
    }
    return _add(id, position, userOptions);
  };
  var _executeMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var position = objects[i].position;
      var options = objects[i].options;
      id = id == null ? _getIndex() : id;
      if (GMH.Data.Marker[id] || position == null) {
        continue;
      }
      objArray.push(_add(id, position, options));
    }
    return objArray;
  };
  var _add = function(id, position, userOptions) {
    if (typeof position == "string") {
      position = GMH.Utility.toLatLng(position);
    }
    var options = $.extend({}, GMH.Defaults.Marker, userOptions);
    options.map = GMH.Data.Map.Obj;
    options.position = position;
    var googleMarker = new google.maps.Marker(options);
    googleMarker.GMH = {
      ID: id,
      Parent: function() {
        return GMH.Data.Marker[this.ID];
      }
    };
    GMH.Data.Marker[id] = new Marker(id, googleMarker);
    return GMH.Data.Marker[id];
  };
  GMH.Data.Marker._index = 0;
  var _getIndex = function() {
    GMH.Data.Marker._index++;
    return GMH.Data.Marker._index - 1;
  };
  GMH.Marker.add = addMarker;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var getBounds = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
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
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      bounds.union(_getBounds(id));
    }
    return bounds;
  };
  var _getBounds = function(id) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(GMH.Data.Marker[id].Obj.getPosition());
    return bounds;
  };
  GMH.Marker.getBounds = getBounds;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var deleteMarker = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var objArray = [];
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      objArray.push(_delete(id));
    }
    return objArray;
  };
  var _delete = function(id) {
    var marker = GMH.Data.Marker[id];
    marker.Obj.setMap(null);
    delete GMH.Data.Marker[id];
    return marker;
  };
  GMH.Marker.delete = deleteMarker;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var toggleMarker = function(id) {
    return _execute("toggle", id);
  };
  var showMarker = function(id) {
    return _execute("show", id);
  };
  var hideMarker = function(id) {
    return _execute("hide", id);
  };
  var _execute = function(action, id) {
    if (Array.isArray(id)) {
      return _executeMulti(action, id);
    }
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
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      objArray.push(_switch(action, id));
    }
    return objArray;
  };
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
  var _toggle = function(id) {
    var state = GMH.Data.Marker[id].Obj.getVisible();
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
  GMH.Marker.toggle = toggleMarker;
  GMH.Marker.show = showMarker;
  GMH.Marker.hide = hideMarker;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var addListener = function(id, type, fn) {
    return _executeAdd(id, type, fn);
  };
  var removeListenerType = function(id, type) {
    return _executeRemoveType(id, type);
  };
  var removeAllListeners = function(id) {
    return _executeRemoveAll(id);
  };
  var _executeAdd = function(id, type, fn) {
    if (Array.isArray(id)) {
      return _executeAddMulti(id);
    }
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
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      listenerArray.push(_add(id, type, fn));
    }
    return listenerArray;
  };
  var _executeRemoveType = function(id, type) {
    type = _getType(type);
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
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      _removeType(id, type);
    }
  };
  var _executeRemoveAll = function(id) {
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
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      _removeType(id);
    }
  };
  var _add = function(id, type, func) {
    try {
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
  var _getType = function(type) {
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
  GMH.Marker.addListener = addListener;
  GMH.Marker.removeListenerType = removeListenerType;
  GMH.Marker.removeAllListeners = removeAllListeners;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var updateMarker = function(id, options) {
    return _executeUpdate(id, options);
  };
  var updatePosition = function(id, position) {
    return _executeUpdatePosition(id, position);
  };
  var _executeUpdate = function(id, options) {
    if (Array.isArray(id)) {
      return _executeUpdateMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a marker");
      return;
    }
    options = options == null ? GMH.Defaults.Marker : options;
    return _update(id, options);
  };
  var _executeUpdateMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = Object.keys(objects[i])[0];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var options = objects[i][id];
      options = options == null ? GMH.Defaults.Marker : options;
      objArray.push(_update(id, options));
    }
    return objArray;
  };
  var _executeUpdatePosition = function(id, position) {
    if (Array.isArray(id)) {
      return _executeUpdatePositionMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      console.log("ERROR: ID does not reference a Marker");
      return;
    }
    if (position == null) {
      console.log("ERROR: Must supply a position");
      return;
    }
    return _updatePosition(id, position);
  };
  var _executeUpdatePositionMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = Object.keys(objects[i])[0];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var position = objects[i][id];
      if (position == null) {
        continue;
      }
      objArray.push(_updatePosition(id, position));
    }
    return objArray;
  };
  var _update = function(id, options) {
    if (typeof options.position == "string") {
      options.position = GMH.Utility.toLatLng(options.position);
    }
    GMH.Data.Marker[id].Obj.setOptions(options);
    return GMH.Data.Marker[id];
  };
  var _updatePosition = function(id, position) {
    if (typeof position == "string") {
      position = GMH.Utility.toLatLng(position);
    }
    GMH.Data.Marker[id].Obj.setOptions({
      position: position
    });
    return GMH.Data.Marker[id];
  };
  GMH.Marker.update = updateMarker;
  GMH.Marker.updatePosition = updatePosition;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
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
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var addPolygon = function(id, path, options) {
    return _execute(id, path, options);
  };
  var _execute = function(id, path, userOptions) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    id = id == null ? _getIndex() : id;
    if (GMH.Data.Polygon[id]) {
      console.log("ERROR: ID already exists");
      return;
    }
    if (path == null) {
      console.log("ERROR: Must supply a path");
      return;
    }
    return _add(id, path, userOptions);
  };
  var _executeMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var path = objects[i].path;
      var options = objects[i].options;
      id = id == null ? _getIndex() : id;
      if (GMH.Data.Polygon[id] || path == null) {
        continue;
      }
      objArray.push(_add(id, path, options));
    }
    return objArray;
  };
  var _add = function(id, path, userOptions) {
    if (typeof path == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    var options = $.extend({}, GMH.Defaults.Polygon, userOptions);
    options.map = GMH.Data.Map.Obj;
    options.path = path;
    var googlePolygon = new google.maps.Polygon(options);
    googlePolygon.GMH = {
      ID: id,
      Parent: function() {
        return GMH.Data.Polygon[this.ID];
      }
    };
    GMH.Data.Polygon[id] = new Polygon(id, googlePolygon);
    return GMH.Data.Polygon[id];
  };
  GMH.Data.Polygon._index = 0;
  var _getIndex = function() {
    GMH.Data.Polygon._index++;
    return GMH.Data.Polygon._index - 1;
  };
  GMH.Polygon.add = addPolygon;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var getBounds = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
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
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      bounds.union(_getBounds(id));
    }
    return bounds;
  };
  var _getBounds = function(id) {
    var bounds = new google.maps.LatLngBounds();
    var paths = GMH.Data.Polygon[id].Obj.getPaths();
    for (var i = 0, i_len = paths.length; i < i_len; i++) {
      var path = paths.getAt(i);
      for (var j = 0, j_len = path.getLength(); j < j_len; j++) {
        bounds.extend(path.getAt(j));
      }
    }
    return bounds;
  };
  GMH.Polygon.getBounds = getBounds;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var deletePolygon = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if (Array.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var objArray = [];
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      objArray.push(_delete(id));
    }
    return objArray;
  };
  var _delete = function(id) {
    var Polygon = GMH.Data.Polygon[id];
    Polygon.Obj.setMap(null);
    delete GMH.Data.Polygon[id];
    return Polygon;
  };
  GMH.Polygon.delete = deletePolygon;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var togglePolygon = function(id) {
    return _execute("toggle", id);
  };
  var showPolygon = function(id) {
    return _execute("show", id);
  };
  var hidePolygon = function(id) {
    return _execute("hide", id);
  };
  var _execute = function(action, id) {
    if (Array.isArray(id)) {
      return _executeMulti(action, id);
    }
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
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      objArray.push(_switch(action, id));
    }
    return objArray;
  };
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
  var _toggle = function(id) {
    var state = GMH.Data.Polygon[id].Obj.getVisible();
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
  GMH.Polygon.toggle = togglePolygon;
  GMH.Polygon.show = showPolygon;
  GMH.Polygon.hide = hidePolygon;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var addListener = function(id, type, fn) {
    return _executeAdd(id, type, fn);
  };
  var removeListenerType = function(id, type) {
    return _executeRemoveType(id, type);
  };
  var removeAllListeners = function(id) {
    return _executeRemoveAll(id);
  };
  var _executeAdd = function(id, type, fn) {
    if (Array.isArray(id)) {
      return _executeAddMulti(id);
    }
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
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      listenerArray.push(_add(id, type, fn));
    }
    return listenerArray;
  };
  var _executeRemoveType = function(id, type) {
    type = _getType(type);
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
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      _removeType(id, type);
    }
  };
  var _executeRemoveAll = function(id) {
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
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      _removeType(id);
    }
  };
  var _add = function(id, type, func) {
    try {
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
  var _getType = function(type) {
    type = type.toLowerCase().replace(/\s+/g, "");
    switch (type) {
     case "doubleclick":
      type = "dblclick";
      break;
    }
    return type;
  };
  GMH.Polygon.addListener = addListener;
  GMH.Polygon.removeListenerType = removeListenerType;
  GMH.Polygon.removeAllListeners = removeAllListeners;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var updatePolygon = function(id, options) {
    return _executeUpdate(id, options);
  };
  var updatePath = function(id, path) {
    return _executeupdatePath(id, path);
  };
  var _executeUpdate = function(id, options) {
    if (Array.isArray(id)) {
      return _executeUpdateMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    options = options == null ? GMH.Defaults.Polygon : options;
    return _update(id, options);
  };
  var _executeUpdateMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = Object.keys(objects[i])[0];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var options = objects[i][id];
      options = options == null ? GMH.Defaults.Polygon : options;
      objArray.push(_update(id, options));
    }
    return objArray;
  };
  var _executeupdatePath = function(id, path) {
    if (Array.isArray(id)) {
      return _executeupdatePathMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      console.log("ERROR: ID does not reference a Polygon");
      return;
    }
    if (path == null) {
      console.log("ERROR: Must supply a path");
      return;
    }
    return _updatePath(id, path);
  };
  var _executeupdatePathMulti = function(objects) {
    var objArray = [];
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = Object.keys(objects[i])[0];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var path = objects[i][id];
      if (path == null) {
        continue;
      }
      objArray.push(_updatePath(id, path));
    }
    return objArray;
  };
  var _update = function(id, options) {
    if (typeof options.path == "string") {
      options.path = GMH.Utility.toLatLngArray(options.path);
    }
    GMH.Data.Polygon[id].Obj.setOptions(options);
    return GMH.Data.Polygon[id];
  };
  var _updatePath = function(id, path) {
    if (typeof path == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    GMH.Data.Polygon[id].Obj.setOptions({
      path: path
    });
    return GMH.Data.Polygon[id];
  };
  GMH.Polygon.update = updatePolygon;
  GMH.Polygon.updatePath = updatePath;
  return GMH;
}(GMH || {});