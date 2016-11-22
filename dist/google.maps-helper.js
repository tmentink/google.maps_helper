/* Google Maps Helper - v1.13 | MIT License
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
  var googleLabel = function(options) {
    this.set("fontFamily", "sans-serif");
    this.set("fontSize", 14);
    this.set("fontColor", "#000");
    this.set("strokeWeight", 2);
    this.set("strokeColor", "#FFF");
    this.set("align", "center");
    this.set("zIndex", 1e3);
    this.setValues(options);
  };
  googleLabel.prototype = new google.maps.OverlayView();
  googleLabel.prototype.changed = function(prop) {
    switch (prop) {
     case "fontFamily":
     case "fontSize":
     case "fontColor":
     case "strokeWeight":
     case "strokeColor":
     case "align":
     case "text":
      return this.drawCanvas_();

     case "maxZoom":
     case "minZoom":
     case "position":
      return this.draw();
    }
  };
  googleLabel.prototype.drawCanvas_ = function() {
    var canvas = this.canvas_;
    if (!canvas) return;
    var style = canvas.style;
    style.zIndex = this.get("zIndex");
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = this.get("strokeColor");
    ctx.fillStyle = this.get("fontColor");
    ctx.font = this.get("fontSize") + "px " + this.get("fontFamily");
    var strokeWeight = Number(this.get("strokeWeight"));
    var text = this.get("text").toString();
    if (text) {
      if (strokeWeight) {
        ctx.lineWidth = strokeWeight;
        ctx.strokeText(text, strokeWeight, strokeWeight);
      }
      ctx.fillText(text, strokeWeight, strokeWeight);
      var textMeasure = ctx.measureText(text);
      var textWidth = textMeasure.width + strokeWeight;
      style.marginLeft = this.getMarginLeft_(textWidth) + "px";
      style.marginTop = "-0.4em";
    }
  };
  googleLabel.prototype.onAdd = function() {
    var canvas = this.canvas_ = document.createElement("canvas");
    var style = canvas.style;
    style.position = "absolute";
    var ctx = canvas.getContext("2d");
    ctx.lineJoin = "round";
    ctx.textBaseline = "top";
    this.drawCanvas_();
    var panes = this.getPanes();
    if (panes) {
      panes.floatPane.appendChild(canvas);
    }
  };
  googleLabel.prototype.getMarginLeft_ = function(textWidth) {
    switch (this.get("align")) {
     case "left":
      return 0;

     case "right":
      return -textWidth;
    }
    return textWidth / -2;
  };
  googleLabel.prototype.draw = function() {
    var projection = this.getProjection();
    if (!projection) {
      return;
    }
    if (!this.canvas_) {
      return;
    }
    var latLng = this.get("position");
    if (!latLng) {
      return;
    }
    var pos = projection.fromLatLngToDivPixel(latLng);
    var style = this.canvas_.style;
    style["top"] = pos.y + "px";
    style["left"] = pos.x + "px";
    style["visibility"] = this.getVisible_();
  };
  googleLabel.prototype.getVisible_ = function() {
    var minZoom = this.get("minZoom");
    var maxZoom = this.get("maxZoom");
    if (minZoom === undefined && maxZoom === undefined) {
      return "";
    }
    var map = this.getMap();
    if (!map) {
      return "";
    }
    var mapZoom = map.getZoom();
    if (mapZoom < minZoom || mapZoom > maxZoom) {
      return "hidden";
    }
    return "";
  };
  googleLabel.prototype.onRemove = function() {
    var canvas = this.canvas_;
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas);
    }
  };
  GMH.Object.googleLabel = googleLabel;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Object == "undefined") {
    GMH.Object = {};
  }
  var Label = function(id, obj) {
    this.ID = id;
    this.Obj = obj;
  };
  Label.prototype = {
    ObjectType: "Label",
    not: function() {
      return GMH.Utility.copy(GMH.Data.Label, this.ID);
    },
    hide: function() {
      return GMH.Label.hide(this.ID);
    },
    show: function() {
      return GMH.Label.show(this.ID);
    },
    toggle: function() {
      return GMH.Label.toggle(this.ID);
    },
    delete: function() {
      return GMH.Label.delete(this.ID);
    },
    reset: function() {
      return GMH.Label.reset(this.ID);
    },
    update: function(options) {
      return GMH.Label.update(this.ID, options);
    },
    updatePosition: function(position) {
      return GMH.Label.updatePosition(this.ID, position);
    },
    getBounds: function() {
      return GMH.Label.getBounds(this.ID);
    },
    getCenter: function() {
      return GMH.Label.getCenter(this.ID);
    }
  };
  var LabelArray = function() {
    this._i = 0;
  };
  LabelArray.prototype = {
    ObjectType: "LabelArray",
    IDs: function() {
      return GMH.Utility.getIDs(this);
    },
    not: function() {
      return GMH.Utility.copy(GMH.Data.Label, this);
    },
    nextIndex: function() {
      this._i++;
      return this._i - 1;
    },
    hide: function() {
      return GMH.Label.hide(this.IDs());
    },
    show: function() {
      return GMH.Label.show(this.IDs());
    },
    toggle: function() {
      return GMH.Label.toggle(this.IDs());
    },
    delete: function() {
      return GMH.Label.delete(this.IDs());
    },
    reset: function() {
      return GMH.Label.reset(this.IDs());
    },
    update: function(options) {
      return GMH.Label.update(this.IDs(), options);
    },
    updatePosition: function(position) {
      return GMH.Label.updatePosition(this.IDs(), position);
    },
    getBounds: function() {
      return GMH.Label.getBounds(this.IDs());
    },
    getCenter: function() {
      return GMH.Label.getCenter(this.IDs());
    }
  };
  GMH.Object.Label = Label;
  GMH.Object.LabelArray = LabelArray;
  return GMH;
}(GMH || {});

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
    reset: function() {
      return GMH.Map.reset();
    },
    update: function(options) {
      return GMH.Map.update(options);
    },
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
    not: function() {
      return GMH.Utility.copy(GMH.Data.Marker, this.ID);
    },
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
    reset: function() {
      return GMH.Marker.reset(this.ID);
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
    getCenter: function() {
      return GMH.Marker.getCenter(this.ID);
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
    reset: function() {
      return GMH.Marker.reset(this.IDs());
    },
    update: function(options) {
      return GMH.Marker.update(this.IDs(), options);
    },
    updatePosition: function(position) {
      return GMH.Marker.updatePosition(this.IDs(), position);
    },
    getBounds: function() {
      return GMH.Marker.getBounds(this.IDs());
    },
    getCenter: function() {
      return GMH.Marker.getCenter(this.IDs());
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
    not: function() {
      return GMH.Utility.copy(GMH.Data.Polygon, this.ID);
    },
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
    reset: function() {
      return GMH.Polygon.reset(this.ID);
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
    getCenter: function() {
      return GMH.Polygon.getCenter(this.ID);
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
    reset: function() {
      return GMH.Polygon.reset(this.IDs());
    },
    update: function(options) {
      return GMH.Polygon.update(this.IDs(), options);
    },
    updatePath: function(path) {
      return GMH.Polygon.updatePath(this.IDs(), path);
    },
    getBounds: function() {
      return GMH.Polygon.getBounds(this.IDs());
    },
    getCenter: function() {
      return GMH.Polygon.getCenter(this.IDs());
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
  GMH.Data.Label = new GMH.Object.LabelArray();
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
    mapTypeId: google.maps.MapTypeId.ROADMAP,
    clickableIcons: false,
    mapTypeControl: false,
    streetViewControl: false
  };
  GMH.Defaults.Label = {
    fontSize: 14,
    fontColor: "#000",
    strokeColor: "#FFF",
    strokeWeight: 1,
    align: "center"
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

     case "label":
      type = "Label";
      break;

     case "labels":
      type = "Label";
      break;

     case "marker":
      type = "Marker";
      break;

     case "markers":
      type = "Marker";
      break;

     case "polygon":
      type = "Polygon";
      break;

     case "polygons":
      type = "Polygon";
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
  if (typeof GMH.Label == "undefined") {
    GMH.Label = {};
  }
  var addLabel = function(id, text, position, options) {
    return _execute(id, text, position, options);
  };
  var _execute = function(id, text, position, userOptions) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    id = id == null ? GMH.Data.Label.nextIndex() : id;
    if (GMH.Data.Label[id]) {
      throw "Error: ID already exists";
    }
    text = text == null ? id : text;
    if (position == null) {
      throw "Error: Must supply a position";
    }
    return _add(id, text, position, userOptions);
  };
  var _executeMulti = function(objects) {
    var labelArray = new GMH.Object.LabelArray();
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var text = objects[i].text;
      var position = objects[i].position;
      var options = objects[i].options;
      id = id == null ? GMH.Data.Label.nextIndex() : id;
      if (GMH.Data.Label[id] || position == null) {
        continue;
      }
      text = text == null ? id : text;
      var label = _add(id, text, position, options);
      labelArray[label.ID] = label;
    }
    return labelArray;
  };
  var _add = function(id, text, position, userOptions) {
    if ($.type(position) == "string") {
      position = GMH.Utility.toLatLng(position);
    }
    var options = $.extend({}, GMH.Defaults.Label, userOptions);
    options.map = GMH.Data.Map.Obj;
    options.text = text;
    options.position = position;
    var googleLabel = new GMH.Object.googleLabel(options);
    googleLabel.GMH = {
      ID: id,
      Parent: function() {
        return GMH.Data.Label[this.ID];
      }
    };
    GMH.Data.Label[id] = new GMH.Object.Label(id, googleLabel);
    GMH.Data.Label[id].initialOptions = options;
    return GMH.Data.Label[id];
  };
  GMH.Label.add = addLabel;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Label == "undefined") {
    GMH.Label = {};
  }
  var getBounds = function(id) {
    return _execute(id);
  };
  var getCenter = function(id) {
    return getBounds(id).getCenter();
  };
  var _execute = function(id) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Label[id] == undefined) {
      throw "Error: ID does not reference a label";
    }
    return _getBounds(id);
  };
  var _executeMulti = function(ids) {
    var bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Label[id] == undefined) {
        continue;
      }
      bounds.union(_getBounds(id));
    }
    return bounds;
  };
  var _getBounds = function(id) {
    var bounds = new google.maps.LatLngBounds();
    bounds.extend(GMH.Data.Label[id].Obj.position);
    return bounds;
  };
  GMH.Label.getBounds = getBounds;
  GMH.Label.getCenter = getCenter;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Label == "undefined") {
    GMH.Label = {};
  }
  var deleteLabel = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Label[id] == undefined) {
      throw "Error: ID does not reference a label";
    }
    return _delete(id);
  };
  var _executeMulti = function(ids) {
    var labelArray = new GMH.Object.LabelArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Label[id] == undefined) {
        continue;
      }
      var label = _delete(id);
      labelArray[label.ID] = label;
    }
    return labelArray;
  };
  var _delete = function(id) {
    var label = GMH.Data.Label[id];
    label.Obj.setMap(null);
    delete GMH.Data.Label[id];
    return label;
  };
  GMH.Label.delete = deleteLabel;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Label == "undefined") {
    GMH.Label = {};
  }
  var toggleLabel = function(id) {
    return _execute("toggle", id);
  };
  var showLabel = function(id) {
    return _execute("show", id);
  };
  var hideLabel = function(id) {
    return _execute("hide", id);
  };
  var _execute = function(action, id) {
    if ($.isArray(id)) {
      return _executeMulti(action, id);
    }
    if (GMH.Data.Label[id] == undefined) {
      throw "Error: ID does not reference a label";
    }
    return _switch(action, id);
  };
  var _executeMulti = function(action, ids) {
    var labelArray = new GMH.Object.LabelArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Label[id] == undefined) {
        continue;
      }
      var label = _switch(action, id);
      labelArray[label.ID] = label;
    }
    return labelArray;
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
    var map = GMH.Data.Label[id].Obj.map == null ? GMH.Data.Map.Obj : null;
    GMH.Data.Label[id].Obj.setMap(map);
    return GMH.Data.Label[id];
  };
  var _show = function(id) {
    GMH.Data.Label[id].Obj.setMap(GMH.Data.Map.Obj);
    return GMH.Data.Label[id];
  };
  var _hide = function(id) {
    GMH.Data.Label[id].Obj.setMap(null);
    return GMH.Data.Label[id];
  };
  GMH.Label.toggle = toggleLabel;
  GMH.Label.show = showLabel;
  GMH.Label.hide = hideLabel;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Label == "undefined") {
    GMH.Label = {};
  }
  var resetLabel = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Label[id] == undefined) {
      throw "Error: ID does not reference a label";
    }
    return _reset(id);
  };
  var _executeMulti = function(ids) {
    var labelArray = new GMH.Object.LabelArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Label[id] == undefined) {
        continue;
      }
      var label = _reset(id);
      labelArray[label.ID] = label;
    }
    return labelArray;
  };
  var _reset = function(id) {
    var options = GMH.Data.Label[id].initialOptions;
    return GMH.Label.update(id, options);
  };
  GMH.Label.reset = resetLabel;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Label == "undefined") {
    GMH.Label = {};
  }
  var updateLabel = function(id, options) {
    return _executeUpdate(id, options);
  };
  var updatePosition = function(id, position) {
    return _executeUpdatePosition(id, position);
  };
  var _executeUpdate = function(id, options) {
    options = options == null ? GMH.Defaults.Label : options;
    if ($.type(options.position) == "string") {
      options.position = GMH.Utility.toLatLng(options.position);
    }
    if ($.isArray(id)) {
      return _executeUpdateMulti(id, options);
    }
    if (GMH.Data.Label[id] == undefined) {
      throw "Error: ID does not reference a label";
    }
    return _update(id, options);
  };
  var _executeUpdateMulti = function(ids, options) {
    var labelArray = new GMH.Object.LabelArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Label[id] == undefined) {
        continue;
      }
      var label = _update(id, options);
      labelArray[label.ID] = label;
    }
    return labelArray;
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
    if (GMH.Data.Label[id] == undefined) {
      throw "Error: ID does not reference a label";
    }
    return _updatePosition(id, position);
  };
  var _executeUpdatePositionMulti = function(ids, position) {
    var labelArray = new GMH.Object.LabelArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Label[id] == undefined) {
        continue;
      }
      var label = _updatePosition(id, position);
      labelArray[label.ID] = label;
    }
    return labelArray;
  };
  var _update = function(id, options) {
    GMH.Data.Label[id].Obj.setOptions(options);
    return GMH.Data.Label[id];
  };
  var _updatePosition = function(id, position) {
    GMH.Data.Label[id].Obj.setOptions({
      position: position
    });
    return GMH.Data.Label[id];
  };
  GMH.Label.update = updateLabel;
  GMH.Label.updatePosition = updatePosition;
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
  var getCenter = function() {
    return GMH.Data.Map.Obj.getCenter();
  };
  var _execute = function(type, id) {
    if ($.isArray(type)) {
      return _executeMulti(type);
    }
    type = GMH.Utility.getObjectType(type);
    if (type == "initial" || type == "init") {
      GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
      GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialOptions.zoom);
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
  GMH.Map.getCenter = getCenter;
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
    GMH.Data.Map.initialOptions = options;
    setTimeout(function() {
      GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
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
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var resetMap = function() {
    return _reset();
  };
  var _reset = function() {
    var options = GMH.Data.Map.initialOptions;
    GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
    return GMH.Map.update(options);
  };
  GMH.Map.reset = resetMap;
  return GMH;
}(GMH || {});

var GMH = function(GMH) {
  "use strict";
  if (typeof GMH.Map == "undefined") {
    GMH.Map = {};
  }
  var updateMap = function(options) {
    return _execute(options);
  };
  var _execute = function(options) {
    options = options == null ? GMH.Defaults.Map : options;
    if ($.type(options.center) == "string") {
      options.center = GMH.Utility.toLatLng(options.center);
    }
    return _update(options);
  };
  var _update = function(options) {
    GMH.Data.Map.Obj.setOptions(options);
    return GMH.Data.Map;
  };
  GMH.Map.update = updateMap;
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
    GMH.Data.Marker[id].initialOptions = options;
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
  var getCenter = function(id) {
    return getBounds(id).getCenter();
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
  GMH.Marker.getCenter = getCenter;
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
      return _executeMulti(action, id, type, fn);
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
  var resetMarker = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Marker[id] == undefined) {
      throw "Error: ID does not reference a marker";
    }
    return _reset(id);
  };
  var _executeMulti = function(ids) {
    var markerArray = new GMH.Object.MarkerArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Marker[id] == undefined) {
        continue;
      }
      var marker = _reset(id);
      markerArray[marker.ID] = marker;
    }
    return markerArray;
  };
  var _reset = function(id) {
    var options = GMH.Data.Marker[id].initialOptions;
    return GMH.Marker.update(id, options);
  };
  GMH.Marker.reset = resetMarker;
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
    var polygonArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = objects.length; i < i_len; i++) {
      var id = objects[i].id;
      var path = objects[i].path;
      var options = objects[i].options;
      id = id == null ? GMH.Data.Polygon.nextIndex() : id;
      if (GMH.Data.Polygon[id] || path == null) {
        continue;
      }
      var polygon = _add(id, path, options);
      polygonArray[polygon.ID] = polygon;
    }
    return polygonArray;
  };
  var _add = function(id, path, userOptions) {
    if ($.type(path) == "string") {
      path = GMH.Utility.toLatLngArray(path);
    }
    var options = $.extend({}, GMH.Defaults.Polygon, userOptions);
    options.map = GMH.Data.Map.Obj;
    options.paths = path;
    var googlePolygon = new google.maps.Polygon(options);
    googlePolygon.GMH = {
      ID: id,
      Parent: function() {
        return GMH.Data.Polygon[this.ID];
      }
    };
    GMH.Data.Polygon[id] = new GMH.Object.Polygon(id, googlePolygon);
    GMH.Data.Polygon[id].initialOptions = options;
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
  var getCenter = function(id) {
    return getBounds(id).getCenter();
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
  GMH.Polygon.getCenter = getCenter;
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
    var polygonArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var polygon = _delete(id);
      polygonArray[polygon.ID] = polygon;
    }
    return polygonArray;
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
    var polygonArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var polygon = _switch(action, id);
      polygonArray[polygon.ID] = polygon;
    }
    return polygonArray;
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
    var polygonArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var polygon = _switch(action, id, type, fn);
      polygonArray[polygon.ID] = polygon;
    }
    return polygonArray;
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
  var resetPolygon = function(id) {
    return _execute(id);
  };
  var _execute = function(id) {
    if ($.isArray(id)) {
      return _executeMulti(id);
    }
    if (GMH.Data.Polygon[id] == undefined) {
      throw "Error: ID does not reference a Polygon";
    }
    return _reset(id);
  };
  var _executeMulti = function(ids) {
    var polygonArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var polygon = _reset(id);
      polygonArray[polygon.ID] = polygon;
    }
    return polygonArray;
  };
  var _reset = function(id) {
    var options = GMH.Data.Polygon[id].initialOptions;
    return GMH.Polygon.update(id, options);
  };
  GMH.Polygon.reset = resetPolygon;
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
    var polygonArray = new GMH.Object.PolygonArray();
    for (var i = 0, i_len = ids.length; i < i_len; i++) {
      var id = ids[i];
      if (GMH.Data.Polygon[id] == undefined) {
        continue;
      }
      var polygon = _update(id, options);
      polygonArray[polygon.ID] = polygon;
    }
    return polygonArray;
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
  var _executeupdatePathMulti = function(ids, path) {
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
      paths: path
    });
    return GMH.Data.Polygon[id];
  };
  GMH.Polygon.update = updatePolygon;
  GMH.Polygon.updatePath = updatePath;
  return GMH;
}(GMH || {});