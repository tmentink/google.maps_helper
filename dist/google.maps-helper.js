/* Google Maps Helper - v1.11 | MIT License
 * Copyright 2016 Trent Mentink
 * https://github.com/tmentink/google.maps_helper
 */
!function(window) {
  "use strict";
  if (window.jQuery) {
    return;
  }
  var $ = {};
  $.isWindow = function(obj) {
    return obj && obj === obj.window;
  };
  $.type = function(obj) {
    if (!obj) {
      return obj + "";
    }
    return typeof obj === "object" || typeof obj === "function" ? class2type[toString.call(obj)] || "object" : typeof obj;
  };
  $.isArray = Array.isArray || function(obj) {
    return $.type(obj) === "array";
  };
  $.isPlainObject = function(obj) {
    var key;
    if (!obj || $.type(obj) !== "object" || obj.nodeType || $.isWindow(obj)) {
      return false;
    }
    try {
      if (obj.constructor && !hasOwn.call(obj, "constructor") && !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
        return false;
      }
    } catch (e) {
      return false;
    }
    for (key in obj) {}
    return key === undefined || hasOwn.call(obj, key);
  };
  var class2type = {}, hasOwn = class2type.hasOwnProperty, toString = class2type.toString;
  var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
  for (var i = 0; i < types.length; i++) {
    class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
  }
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
          if (deep && copy && ($.isPlainObject(copy) || (copyIsArray = $.isArray(copy)))) {
            if (copyIsArray) {
              copyIsArray = false;
              clone = src && $.isArray(src) ? src : [];
            } else {
              clone = src && $.isPlainObject(src) ? src : {};
            }
            target[name] = $.extend(deep, clone, copy);
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
  if (typeof GMH.Object == "undefined") {
    GMH.Object = {};
  }
  var Map = function(obj) {
    this.Obj = obj;
  };
  Map.prototype = {
    ObjectType: "Map",
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
  GMH.Object.Map = Map;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Object == "undefined") {
    GMH.Object = {};
  }
  var Marker = function(id, obj) {
    this.ID = id;
    this.Obj = obj;
  };
  Marker.prototype = {
    ObjectType: "Marker",
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
  var MarkerArray = function() {
    this._i = 0;
  };
  MarkerArray.prototype = {
    ObjectType: "MarkerArray",
    IDs: function() {
      return GMH.Utility.getIDs(this);
    },
    not: function() {
      return GMH.Utility.copy(GMH.Data.Marker, this);
    },
    nextIndex: function() {
      this._i++;
      return this._i - 1;
    },
    hide: function() {
      return GMH.Marker.hide(this.IDs());
    },
    show: function() {
      return GMH.Marker.show(this.IDs());
    },
    toggle: function() {
      return GMH.Marker.toggle(this.IDs());
    },
    delete: function() {
      return GMH.Marker.delete(this.IDs());
    },
    getBounds: function() {
      return GMH.Marker.getBounds(this.IDs());
    },
    update: function(options) {
      return GMH.Marker.update(this.IDs(), options);
    },
    addListener: function(type, fn) {
      return GMH.Marker.addListener(this.IDs(), type, fn);
    },
    removeListenerType: function(type) {
      return GMH.Marker.removeListenerType(this.IDs(), type);
    },
    removeAllListeners: function() {
      return GMH.Marker.removeAllListeners(this.IDs());
    }
  };
  GMH.Object.Marker = Marker;
  GMH.Object.MarkerArray = MarkerArray;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Object == "undefined") {
    GMH.Object = {};
  }
  var Polygon = function(id, obj) {
    this.ID = id;
    this.Obj = obj;
  };
  Polygon.prototype = {
    ObjectType: "Polygon",
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
  var PolygonArray = function() {
    this._i = 0;
  };
  PolygonArray.prototype = {
    ObjectType: "PolygonArray",
    IDs: function() {
      return GMH.Utility.getIDs(this);
    },
    not: function() {
      return GMH.Utility.copy(GMH.Data.Polygon, this);
    },
    nextIndex: function() {
      this._i++;
      return this._i - 1;
    },
    hide: function() {
      return GMH.Polygon.hide(this.IDs());
    },
    show: function() {
      return GMH.Polygon.show(this.IDs());
    },
    toggle: function() {
      return GMH.Polygon.toggle(this.IDs());
    },
    delete: function() {
      return GMH.Polygon.delete(this.IDs());
    },
    getBounds: function() {
      return GMH.Polygon.getBounds(this.IDs());
    },
    update: function(options) {
      return GMH.Polygon.update(this.IDs(), options);
    },
    addListener: function(type, fn) {
      return GMH.Polygon.addListener(this.IDs(), type, fn);
    },
    removeListenerType: function(type) {
      return GMH.Polygon.removeListenerType(this.IDs(), type);
    },
    removeAllListeners: function() {
      return GMH.Polygon.removeAllListeners(this.IDs());
    }
  };
  GMH.Object.Polygon = Polygon;
  GMH.Object.PolygonArray = PolygonArray;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  GMH.Data = {};
  GMH.Data.Map = {};
  GMH.Data.Marker = new GMH.Object.MarkerArray();
  GMH.Data.Polygon = new GMH.Object.PolygonArray();
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
  GMH.Defaults.Marker = {};
  GMH.Defaults.Polygon = {
    strokeColor: "#000",
    strokeOpacity: .8,
    strokeWeight: 1,
    fillColor: "#1984AE",
    fillOpacity: .8
  };
  var setDefaults = function(type, userOptions) {
    return _execute("set", type, userOptions);
  };
  var updateDefaults = function(type, userOptions) {
    return _execute("update", type, userOptions);
  };
  var _execute = function(action, type, userOptions) {
    type = GMH.Utility.getObjectType(type);
    var newOptions = userOptions;
    if (action == "update") {
      newOptions = $.extend({}, GMH.Defaults[type], userOptions);
    }
    GMH.Defaults[type] = newOptions;
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
  var copy = function(source, exclude) {
    var src_copy = $.extend(true, {}, source);
    if ($.type(exclude) == "object") {
      exclude = Object.keys(exclude);
    } else if ($.type(exclude) == "string") {
      exclude = exclude.split(",");
    }
    var src_proto = Object.keys(Object.getPrototypeOf(source));
    var exclude = src_proto.concat(exclude);
    for (var i = 0, i_len = exclude.length; i < i_len; i++) {
      delete src_copy[exclude[i]];
    }
    var GMH_Obj = {};
    if (source.ObjectType) {
      GMH_Obj = new GMH.Object[source.ObjectType]();
    }
    return $.extend(GMH_Obj, src_copy);
  };
  var getIDs = function(obj) {
    var ids = Object.keys(obj);
    var _i = ids.indexOf("_i");
    if (_i !== -1) {
      ids.splice(_i, 1);
    }
    return ids;
  };
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
  var getObjectType = function(type) {
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
  var getEventType = function(type) {
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
  GMH.Utility.copy = copy;
  GMH.Utility.getIDs = getIDs;
  GMH.Utility.toLatLng = toLatLng;
  GMH.Utility.toLatLngArray = toLatLngArray;
  GMH.Utility.getObjectType = getObjectType;
  GMH.Utility.getEventType = getEventType;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var setBounds = function(type, id) {
    _execute(type, id);
    return GMH.Data.Map;
  };
  var _execute = function(type, id) {
    if ($.isArray(type)) {
      return _executeMulti(type);
    }
    type = GMH.Utility.getObjectType(type);
    if (type == "initial" || type == "init") {
      GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
      GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
      return;
    }
    id = id == null ? GMH.Utility.getIDs(GMH.Data[type]) : id;
    var bounds = _getBounds(type, id);
    GMH.Data.Map.Obj.fitBounds(bounds);
  };
  var _executeMulti = function(objects) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var type = Object.keys(objects[i])[0];
      var id = objects[i][type];
      type = GMH.Utility.getObjectType(type);
      id = id == null ? GMH.Utility.getIDs(GMH.Data[type]) : id;
      bounds.union(_getBounds(type, id));
    }
    GMH.Data.Map.Obj.fitBounds(bounds);
  };
  var _getBounds = function(type, id) {
    if ($.isArray(id)) {
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
  GMH.Map.setBounds = setBounds;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var init = function(container, userOptions) {
    var options = $.extend({}, GMH.Defaults.Map, userOptions);
    var googleMap = new google.maps.Map(document.getElementById(container), options);
    googleMap.GMH = {
      Parent: function() {
        return GMH.Data.Map;
      }
    };
    GMH.Data.Map = new GMH.Object.Map(googleMap);
    setTimeout(function() {
      GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
      GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
    }, 500);
    return GMH.Data.Map;
  };
  GMH.Map.init = init;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
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
  var _executeAdd = function(type, fn) {
    if ($.isArray(type)) {
      return _executeAddMulti(type);
    }
    _add(type, fn);
  };
  var _executeAddMulti = function(objects) {
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var type = Object.keys(objects[i])[0];
      var fn = objects[i][type];
      _add(type, fn);
    }
  };
  var _executeRemoveType = function(type) {
    if ($.type(type) == "string") {
      type = type.split(",");
    }
    for (var i = 0, i_len = types.length; i < i_len; i++) {
      var type = types[i];
      _removeType(type);
    }
  };
  var _add = function(type, func) {
    type = GMH.Utility.getEventType(type);
    google.maps.event.addListener(GMH.Data.Map.Obj, type, func);
  };
  var _removeType = function(type) {
    type = GMH.Utility.getEventType(type);
    google.maps.event.clearListeners(GMH.Data.Map.Obj, type);
  };
  var _removeAll = function() {
    google.maps.event.clearInstanceListeners(GMH.Data.Map.Obj);
  };
  GMH.Map.addListener = addListener;
  GMH.Map.removeListenerType = removeListenerType;
  GMH.Map.removeAllListeners = removeAllListeners;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Marker == "undefined") {
    GMH.Marker = {};
  }
  var addMarker = function(id, position, options) {
    return _execute(id, position, options);
  };
  var _execute = function(id, position, userOptions) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    id = id == null ? GMH.Data.Marker.nextIndex() : id;
    if (GMH.Data.Marker[id]) {
      throw "Error: ID already exists";
    }
    if (position == null) {
      throw "Error: Must supply a position";
    }
    return _add(id, position, userOptions);
  };
  var _executeMulti = function(objects) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var position = objects[i].position;
      var options = objects[i].options;
      id = id == null ? GMH.Data.Marker.nextIndex() : id;
      if (GMH.Data.Marker[id] || position == null) {
        continue;
      }
      var marker = _add(id, position, options);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
  };
  var _add = function(id, position, userOptions) {
    if ($.type(position) == "string") {
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
    GMH.Data.Marker[id] = new GMH.Object.Marker(id, googleMarker);
    return GMH.Data.Marker[id];
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
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a marker";
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
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a marker";
    }
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var marker = _delete(id);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
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
    if ($.isArray(id)) {
      return _executeMulti(action, id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a Marker";
    }
    return _switch(action, id);
  };
  var _executeMulti = function(action, ids) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var marker = _switch(action, id);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
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
    return _execute("add", id, type, fn);
  };
  var removeListenerType = function(id, type) {
    return _execute("removeType", id, type);
  };
  var removeAllListeners = function(id) {
    return _execute("removeAll", id);
  };
  var _execute = function(action, id, type, fn) {
    type = type ? GMH.Utility.getEventType(type) : null;
    if ($.isArray(id)) {
      return _executeAddMulti(action, id, type, fn);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a Marker";
    }
    return _switch(action, id, type, fn);
  };
  var _executeMulti = function(action, ids, type, fn) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var marker = _switch(action, id, type, fn);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
  };
  var _switch = function(action, id, type, fn) {
    switch (action) {
     case "add":
      return _add(id, type, fn);

     case "removeType":
      return _removeType(id, type);

     case "removeAll":
      return _removeAll(id);
    }
  };
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
    options = options == null ? GMH.Defaults.Marker : options;
    if ($.type(options.position) == "string") {
      options.position = GMH.Utility.toLatLng(options.position);
    }
    if ($.isArray(id)) {
      return _executeUpdateMulti(id, options);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a marker";
    }
    return _update(id, options);
  };
  var _executeUpdateMulti = function(ids, options) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var marker = _update(id, options);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
  };
  var _executeUpdatePosition = function(id, position) {
    if (position == null) {
      throw "Error: Must supply a position";
    }
    if ($.type(position) == "string") {
      position = GMH.Utility.toLatLng(position);
    }
    if ($.isArray(id)) {
      return _executeUpdatePositionMulti(id, position);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a Marker";
    }
    return _updatePosition(id, position);
  };
  var _executeUpdatePositionMulti = function(ids, position) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var marker = _updatePosition(id, position);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
  };
  var _update = function(id, options) {
    GMH.Data.Marker[id].Obj.setOptions(options);
    return GMH.Data.Marker[id];
  };
  var _updatePosition = function(id, position) {
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
  if (typeof GMH.Polygon == "undefined") {
    GMH.Polygon = {};
  }
  var addPolygon = function(id, path, options) {
    return _execute(id, path, options);
  };
  var _execute = function(id, path, userOptions) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    id = id == null ? GMH.Data.Polygon.nextIndex() : id;
    if (GMH.Data.Polygon[id] || id == "_i") {
      throw "Error: ID already exists";
    }
    if (path == null) {
      throw "Error: Must supply a path";
    }
    return _add(id, path, userOptions);
  };
  var _executeMulti = function(objects) {
    var polyArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var path = objects[i].path;
      var options = objects[i].options;
      id = id == null ? GMH.Data.Polygon.nextIndex() : id;
      if (GMH.Data.Polygon[id] || path == null) {
        continue;
      }
      var poly = _add(id, path, options);
      polyArray[poly.ID] = poly;
    }
    return polyArray;
  };
  var _add = function(id, path, userOptions) {
    if ($.type(path) == "string") {
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
    GMH.Data.Polygon[id] = new GMH.Object.Polygon(id, googlePolygon);
    return GMH.Data.Polygon[id];
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
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a polygon";
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
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a Polygon";
    }
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var polyArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var poly = _delete(id);
      polyArray[poly.ID] = poly;
    }
    return polyArray;
  };
  var _delete = function(id) {
    var polygon = GMH.Data.Polygon[id];
    polygon.Obj.setMap(null);
    delete GMH.Data.Polygon[id];
    return polygon;
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
    if ($.isArray(id)) {
      return _executeMulti(action, id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a Polygon";
    }
    return _switch(action, id);
  };
  var _executeMulti = function(action, ids) {
    var polyArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var poly = _switch(action, id);
      polyArray[poly.ID] = poly;
    }
    return polyArray;
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
    return _execute("add", id, type, fn);
  };
  var removeListenerType = function(id, type) {
    return _execute("removeType", id, type);
  };
  var removeAllListeners = function(id) {
    return _execute("removeAll", id);
  };
  var _execute = function(action, id, type, fn) {
    type = type ? GMH.Utility.getEventType(type) : null;
    if ($.isArray(id)) {
      return _executeMulti(action, id, type, fn);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a Polygon";
    }
    return _switch(action, id, type, fn);
  };
  var _executeMulti = function(action, ids, type, fn) {
    var polyArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var poly = _switch(action, id, type, fn);
      polyArray[poly.ID] = poly;
    }
    return polyArray;
  };
  var _switch = function(action, id, type, fn) {
    switch (action) {
     case "add":
      return _add(id, type, fn);

     case "removeType":
      return _removeType(id, type);

     case "removeAll":
      return _removeAll(id);
    }
  };
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
    options = options == null ? GMH.Defaults.Polygon : options;
    if ($.type(options.path) == "string") {
      options.path = GMH.Utility.toLatLngArray(options.path);
    }
    if ($.isArray(id)) {
      return _executeUpdateMulti(id, options);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a Polygon";
    }
    return _update(id, options);
  };
  var _executeUpdateMulti = function(ids, options) {
    var polyArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var poly = _update(id, options);
      polyArray[poly.ID] = poly;
    }
    return polyArray;
  };
  var _executeupdatePath = function(id, path) {
    if (path == null) {
      throw "Error: Must supply a path";
    }
    if ($.type(path) == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    if ($.isArray(id)) {
      return _executeupdatePathMulti(id, path);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a Polygon";
    }
    return _updatePath(id, path);
  };
  var _executeupdatePathMulti = function(ids) {
    var polyArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var poly = _updatePath(id, path);
      polyArray[poly.ID] = poly;
    }
    return polyArray;
  };
  var _update = function(id, options) {
    GMH.Data.Polygon[id].Obj.setOptions(options);
    return GMH.Data.Polygon[id];
  };
  var _updatePath = function(id, path) {
    GMH.Data.Polygon[id].Obj.setOptions({
      path: path
    });
    return GMH.Data.Polygon[id];
  };
  GMH.Polygon.update = updatePolygon;
  GMH.Polygon.updatePath = updatePath;
  return GMH;
}(GMH || {});