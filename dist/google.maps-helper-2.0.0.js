/*!
 * Google Maps Helper v2.0.0 (https://github.com/tmentink/google.maps_helper)
 * Copyright 2017 Trent Mentink
 * Licensed under MIT
 */
!function(window) {
  "use strict";
  if (window.jQuery) {
    return;
  }
  var class2type = {
    "[object Boolean]": "boolean",
    "[object Number]": "number",
    "[object String]": "string",
    "[object Function]": "function",
    "[object Array]": "array",
    "[object Date]": "date",
    "[object RegExp]": "regexp",
    "[object Object]": "object",
    "[object Error]": "error"
  };
  var hasOwn = class2type.hasOwnProperty;
  var toString = class2type.toString;
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
  window.jQuery = $;
}(window);

var __extends = this && this.__extends || function() {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function(d, b) {
    d.__proto__ = b;
  } || function(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
  };
  return function(d, b) {
    extendStatics(d, b);
    function __() {
      this.constructor = d;
    }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var GMH;

(function(GMH) {
  var Config;
  (function(Config) {
    Config.Default = {
      Label: {
        fontSize: 14,
        fontColor: "#000",
        strokeColor: "#FFF",
        strokeWeight: 1,
        align: "center"
      },
      Map: {
        zoom: 6,
        center: {
          lat: 37.5,
          lng: -120
        },
        mapTypeId: google.maps.MapTypeId.ROADMAP,
        clickableIcons: false,
        mapTypeControl: false,
        streetViewControl: false
      },
      Marker: {},
      Polygon: {
        strokeColor: "#000",
        strokeOpacity: .8,
        strokeWeight: 1,
        fillColor: "#0275D8",
        fillOpacity: .8
      }
    };
    Config.Delimiter = {
      LatLng: ",",
      LatLngPair: "|"
    };
  })(Config = GMH.Config || (GMH.Config = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Constants;
    (function(Constants) {
      Constants.Default = {
        Map: {
          zoom: 6,
          center: {
            lat: 37.5,
            lng: -120
          }
        }
      };
      Constants.Event = {
        Type: {
          ANIMATION_CHANGED: "animation_changed",
          BOUNDS_CHANGED: "bounds_changed",
          CENTER_CHANGED: "center_changed",
          CLICK: "click",
          CLICKABLE_CHANGED: "clickable_changed",
          CURSOR_CHANGED: "cursor_changed",
          DOUBLE_CLICK: "dblclick",
          DRAG: "drag",
          DRAG_END: "dragend",
          DRAG_START: "dragstart",
          DRAGGABLE_CHANGED: "draggable_changed",
          FLAT_CHANGED: "flat_changed",
          HEADING_CHANGED: "heading_changed",
          ICON_CHANGED: "icon_changed",
          IDLE: "idle",
          MAP_TYPE_ID_CHANGED: "maptypeid_changed",
          MOUSE_DOWN: "mousedown",
          MOUSE_MOVE: "mousemove",
          MOUSE_OUT: "mouseout",
          MOUSE_OVER: "mouseover",
          MOUSE_UP: "mouseup",
          POSITION_CHANGED: "position_changed",
          PROJECTION_CHANGED: "projection_changed",
          RESIZE: "resize",
          RIGHT_CLICK: "rightclick",
          SHAPE_CHANGED: "shape_changed",
          TILES_LOADED: "tilesloaded",
          TILT_CHANGED: "tilt_changed",
          TITLE_CHANGED: "title_changed",
          VISIBLE_CHANGED: "visible_changed",
          ZINDEX_CHANGED: "zindex_changed",
          ZOOM_CHANGED: "zoom_changed"
        }
      };
      Constants.Object = {
        Properties: {
          CHILD_TYPE: "ChildType",
          TYPE: "Type"
        },
        Type: {
          LABEL: "Label",
          LABEL_ARRAY: "LabelArray",
          MAP: "Map",
          MARKER: "Marker",
          MARKER_ARRAY: "MarkerArray",
          POLYGON: "Polygon",
          POLYGON_ARRAY: "PolygonArray"
        }
      };
    })(Constants = __gmh__.Constants || (__gmh__.Constants = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _GMH = GMH.__gmh__;
      var BaseObjectArray = function() {
        function BaseObjectArray(type, childType) {
          this.ChildType = childType;
          this.Type = type;
        }
        BaseObjectArray.prototype.getBounds = function() {
          return _GMH[this.ChildType].getBounds(this.getIDs());
        };
        BaseObjectArray.prototype.getCenter = function() {
          return _GMH[this.ChildType].getCenter(this.getIDs());
        };
        BaseObjectArray.prototype.getGoogleObjects = function() {
          return GMH.Util.getGoogleObjects(this);
        };
        BaseObjectArray.prototype.getIDs = function() {
          return GMH.Util.getIDs(this);
        };
        BaseObjectArray.prototype.hide = function() {
          return _GMH[this.ChildType].hide(this.getIDs());
        };
        BaseObjectArray.prototype.not = function() {
          return GMH.Util.copy(__gmh__.Data[this.ChildType], this.getIDs());
        };
        BaseObjectArray.prototype.remove = function() {
          return _GMH[this.ChildType].remove(this.getIDs());
        };
        BaseObjectArray.prototype.reset = function() {
          return _GMH[this.ChildType].reset(this.getIDs());
        };
        BaseObjectArray.prototype.show = function() {
          return _GMH[this.ChildType].show(this.getIDs());
        };
        BaseObjectArray.prototype.toggle = function() {
          return _GMH[this.ChildType].toggle(this.getIDs());
        };
        BaseObjectArray.prototype.update = function(options) {
          return _GMH[this.ChildType].update(this.getIDs(), options);
        };
        return BaseObjectArray;
      }();
      Obj.BaseObjectArray = BaseObjectArray;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Util;
  (function(Util) {
    var _C = GMH.__gmh__.Constants;
    var _Obj = GMH.__gmh__.Obj;
    var EventTypeAlias = {
      animationchanged: _C.Event.Type.ANIMATION_CHANGED,
      boundschanged: _C.Event.Type.BOUNDS_CHANGED,
      centerchanged: _C.Event.Type.CENTER_CHANGED,
      click: _C.Event.Type.CLICK,
      clickablechanged: _C.Event.Type.CLICKABLE_CHANGED,
      cursorchanged: _C.Event.Type.CURSOR_CHANGED,
      doubleclick: _C.Event.Type.DOUBLE_CLICK,
      drag: _C.Event.Type.DRAG,
      dragend: _C.Event.Type.DRAG_END,
      dragstart: _C.Event.Type.DRAG_START,
      draggablechanged: _C.Event.Type.DRAGGABLE_CHANGED,
      flatchanged: _C.Event.Type.FLAT_CHANGED,
      headingchanged: _C.Event.Type.HEADING_CHANGED,
      iconchanged: _C.Event.Type.ICON_CHANGED,
      idle: _C.Event.Type.IDLE,
      maptypeidchanged: _C.Event.Type.MAP_TYPE_ID_CHANGED,
      mousedown: _C.Event.Type.MOUSE_DOWN,
      mousemove: _C.Event.Type.MOUSE_MOVE,
      mouseout: _C.Event.Type.MOUSE_OUT,
      mouseover: _C.Event.Type.MOUSE_OVER,
      mouseup: _C.Event.Type.MOUSE_UP,
      positionchanged: _C.Event.Type.POSITION_CHANGED,
      projectionchanged: _C.Event.Type.PROJECTION_CHANGED,
      resize: _C.Event.Type.RESIZE,
      rightclick: _C.Event.Type.RIGHT_CLICK,
      shapechanged: _C.Event.Type.SHAPE_CHANGED,
      tilesloaded: _C.Event.Type.TILES_LOADED,
      tiltchanged: _C.Event.Type.TILT_CHANGED,
      titlechanged: _C.Event.Type.TITLE_CHANGED,
      visiblechanged: _C.Event.Type.VISIBLE_CHANGED,
      zindexchanged: _C.Event.Type.ZINDEX_CHANGED,
      zoomchanged: _C.Event.Type.ZOOM_CHANGED
    };
    var ObjectTypeAlias = {
      label: _C.Object.Type.LABEL,
      labels: _C.Object.Type.LABEL,
      map: _C.Object.Type.MAP,
      maps: _C.Object.Type.MAP,
      marker: _C.Object.Type.MARKER,
      markers: _C.Object.Type.MARKER,
      polygon: _C.Object.Type.POLYGON,
      polygons: _C.Object.Type.POLYGON
    };
    function copy(source, exclude) {
      var src_copy = jQuery.extend(true, {}, source);
      if (jQuery.type(exclude) == "object") {
        exclude = Object.keys(exclude);
      } else if (jQuery.type(exclude) == "string") {
        exclude = exclude.split(",");
      }
      var src_proto = Object.keys(Object.getPrototypeOf(source));
      var base_proto = Object.keys(Object.getPrototypeOf(new _Obj.BaseObjectArray("", "")));
      exclude = src_proto.concat(exclude);
      exclude = base_proto.concat(exclude);
      for (var i = 0, i_end = exclude.length; i < i_end; i++) {
        delete src_copy[exclude[i]];
      }
      var GMH_Obj = source.Type ? new _Obj[source.Type]() : {};
      return jQuery.extend(GMH_Obj, src_copy);
    }
    Util.copy = copy;
    function getEventType(event) {
      event = event.toLowerCase().replace(/\s+/g, "");
      return EventTypeAlias[event] || event;
    }
    Util.getEventType = getEventType;
    function getGoogleObjects(objectArray) {
      var ids = getIDs(objectArray);
      var googleObjects = ids.map(function(id) {
        return objectArray[id].Obj;
      });
      return googleObjects;
    }
    Util.getGoogleObjects = getGoogleObjects;
    function getIDs(objectArray) {
      var ids = Object.keys(objectArray);
      for (var prop in _C.Object.Properties) {
        var index = ids.indexOf(_C.Object.Properties[prop]);
        if (index !== -1) {
          ids.splice(index, 1);
        }
      }
      return ids;
    }
    Util.getIDs = getIDs;
    function getObjectType(type) {
      type = type.toLowerCase().replace(/\s+/g, "");
      return ObjectTypeAlias[type] || type;
    }
    Util.getObjectType = getObjectType;
    function toArray(value) {
      if (jQuery.type(value) == "number") {
        value = value.toString().split();
      } else if (jQuery.type(value) == "string") {
        value = value.split();
      } else if (jQuery.type(value) == "array") {
        value = value.toString().split(",");
      }
      return value;
    }
    Util.toArray = toArray;
    function toLatLng(str) {
      var Delimiter = {
        LatLng: GMH.Config.Delimiter.LatLng || ","
      };
      var points = str.split(Delimiter.LatLng);
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
    }
    Util.toLatLng = toLatLng;
    function toLatLngArray(str) {
      var Delimiter = {
        LatLng: GMH.Config.Delimiter.LatLng || ",",
        LatLngPair: GMH.Config.Delimiter.LatLngPair || "|"
      };
      var latLngArray = [];
      var coordPairs = str.split(Delimiter.LatLngPair);
      for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
        var points = coordPairs[i].split(Delimiter.LatLng);
        var latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
        latLngArray.push(latLng);
      }
      return latLngArray;
    }
    Util.toLatLngArray = toLatLngArray;
  })(Util = GMH.Util || (GMH.Util = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Label;
    (function(Label) {
      function updatePosition(id, position) {
        if (jQuery.type(position) == "string") {
          position = GMH.Util.toLatLngArray(position);
        }
        return _updatePosition(id, position);
      }
      Label.updatePosition = updatePosition;
      function _updatePosition(id, position) {
        if (jQuery.isArray(id)) {
          return _multiUpdatePosition(id, position);
        }
        if (_validParameters(id, position)) {
          return _updateLabelPosition(id, position);
        }
      }
      function _multiUpdatePosition(ids, position) {
        var labelArray = new __gmh__.Obj.LabelArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (_validParameters(id, position)) {
            labelArray[id] = _updateLabelPosition(id, position);
          }
        }
        return labelArray;
      }
      function _updateLabelPosition(id, position) {
        __gmh__.Data.Label[id].Obj.setOptions({
          position: position
        });
        return __gmh__.Data.Label[id];
      }
      function _validParameters(id, position) {
        if (!__gmh__.Data.Label[id]) {
          throw "Error: ID does not exist";
        }
        if (!position) {
          throw "Error: Must supply a position";
        }
        return true;
      }
    })(Label = __gmh__.Label || (__gmh__.Label = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Label = GMH.__gmh__.Label;
      var LabelArray = function(_super) {
        __extends(LabelArray, _super);
        function LabelArray() {
          return _super.call(this, __gmh__.Constants.Object.Type.LABEL_ARRAY, __gmh__.Constants.Object.Type.LABEL) || this;
        }
        LabelArray.prototype.updatePosition = function(position) {
          return _Label.updatePosition(this.getIDs(), position);
        };
        return LabelArray;
      }(Obj.BaseObjectArray);
      Obj.LabelArray = LabelArray;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      var Action = {
        ADD: "add",
        REMOVE_ALL: "remove_all",
        REMOVE_TYPE: "remove_type"
      };
      var Execute = {
        add: function(id, type, fn) {
          return _add(id, type, fn);
        },
        remove_all: function(id, type, fn) {
          return _removeAll(id);
        },
        remove_type: function(id, type, fn) {
          return _removeType(id, type);
        }
      };
      function addListener(id, type, fn) {
        type = GMH.Util.getEventType(type);
        return _listener(id, type, fn, Action.ADD);
      }
      Marker.addListener = addListener;
      function removeAllListeners(id) {
        return _listener(id, null, null, Action.REMOVE_ALL);
      }
      Marker.removeAllListeners = removeAllListeners;
      function removeListenerType(id, type) {
        type = GMH.Util.getEventType(type);
        return _listener(id, type, null, Action.REMOVE_TYPE);
      }
      Marker.removeListenerType = removeListenerType;
      function _listener(id, type, fn, action) {
        if (jQuery.isArray(id)) {
          return _multiListener(id, type, fn, action);
        }
        if (__gmh__.Data.Marker[id]) {
          return Execute[action](id, type, fn);
        }
      }
      function _multiListener(ids, type, fn, action) {
        var markerArray = new __gmh__.Obj.MarkerArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Marker[id]) {
            markerArray[id] = Execute[action](id, type, fn);
          }
        }
        return markerArray;
      }
      function _add(id, type, fn) {
        google.maps.event.addListener(__gmh__.Data.Marker[id].Obj, type, fn);
        return __gmh__.Data.Marker[id];
      }
      function _removeType(id, type) {
        google.maps.event.clearListeners(__gmh__.Data.Marker[id].Obj, type);
        return __gmh__.Data.Marker[id];
      }
      function _removeAll(id) {
        google.maps.event.clearInstanceListeners(__gmh__.Data.Marker[id].Obj);
        return __gmh__.Data.Marker[id];
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      function updatePosition(id, position) {
        if (jQuery.type(position) == "string") {
          position = GMH.Util.toLatLngArray(position);
        }
        return _updatePosition(id, position);
      }
      Marker.updatePosition = updatePosition;
      function _updatePosition(id, position) {
        if (jQuery.isArray(id)) {
          return _multiUpdatePosition(id, position);
        }
        if (_validParameters(id, position)) {
          return _updateMarkerPosition(id, position);
        }
      }
      function _multiUpdatePosition(ids, position) {
        var markerArray = new __gmh__.Obj.MarkerArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (_validParameters(id, position)) {
            markerArray[id] = _updateMarkerPosition(id, position);
          }
        }
        return markerArray;
      }
      function _updateMarkerPosition(id, position) {
        __gmh__.Data.Marker[id].Obj.setOptions({
          position: position
        });
        return __gmh__.Data.Marker[id];
      }
      function _validParameters(id, position) {
        if (!__gmh__.Data.Marker[id]) {
          throw "Error: ID does not exist";
        }
        if (!position) {
          throw "Error: Must supply a position";
        }
        return true;
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Marker = GMH.__gmh__.Marker;
      var MarkerArray = function(_super) {
        __extends(MarkerArray, _super);
        function MarkerArray() {
          return _super.call(this, __gmh__.Constants.Object.Type.MARKER_ARRAY, __gmh__.Constants.Object.Type.MARKER) || this;
        }
        MarkerArray.prototype.addListener = function(type, fn) {
          return _Marker.addListener(this.getIDs(), type, fn);
        };
        MarkerArray.prototype.removeAllListeners = function() {
          return _Marker.removeAllListeners(this.getIDs());
        };
        MarkerArray.prototype.removeListenerType = function(type) {
          return _Marker.removeListenerType(this.getIDs(), type);
        };
        MarkerArray.prototype.updatePosition = function(position) {
          return _Marker.updatePosition(this.getIDs(), position);
        };
        return MarkerArray;
      }(Obj.BaseObjectArray);
      Obj.MarkerArray = MarkerArray;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      var Action = {
        ADD: "add",
        REMOVE_ALL: "remove_all",
        REMOVE_TYPE: "remove_type"
      };
      var Execute = {
        add: function(id, type, fn) {
          return _add(id, type, fn);
        },
        remove_all: function(id, type, fn) {
          return _removeAll(id);
        },
        remove_type: function(id, type, fn) {
          return _removeType(id, type);
        }
      };
      function addListener(id, type, fn) {
        type = GMH.Util.getEventType(type);
        return _listener(id, type, fn, Action.ADD);
      }
      Polygon.addListener = addListener;
      function removeAllListeners(id) {
        return _listener(id, null, null, Action.REMOVE_ALL);
      }
      Polygon.removeAllListeners = removeAllListeners;
      function removeListenerType(id, type) {
        type = GMH.Util.getEventType(type);
        return _listener(id, type, null, Action.REMOVE_TYPE);
      }
      Polygon.removeListenerType = removeListenerType;
      function _listener(id, type, fn, action) {
        if (jQuery.isArray(id)) {
          return _multiListener(id, type, fn, action);
        }
        if (__gmh__.Data.Polygon[id]) {
          return Execute[action](id, type, fn);
        }
      }
      function _multiListener(ids, type, fn, action) {
        var polygonArray = new __gmh__.Obj.PolygonArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Polygon[id]) {
            polygonArray[id] = Execute[action](id, type, fn);
          }
        }
        return polygonArray;
      }
      function _add(id, type, fn) {
        google.maps.event.addListener(__gmh__.Data.Polygon[id].Obj, type, fn);
        return __gmh__.Data.Polygon[id];
      }
      function _removeType(id, type) {
        google.maps.event.clearListeners(__gmh__.Data.Polygon[id].Obj, type);
        return __gmh__.Data.Polygon[id];
      }
      function _removeAll(id) {
        google.maps.event.clearInstanceListeners(__gmh__.Data.Polygon[id].Obj);
        return __gmh__.Data.Polygon[id];
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      function updatePath(id, path) {
        if (jQuery.type(path) == "string") {
          path = GMH.Util.toLatLngArray(path);
        }
        return _updatePath(id, path);
      }
      Polygon.updatePath = updatePath;
      function _updatePath(id, path) {
        if (jQuery.isArray(id)) {
          return _multiUpdatePath(id, path);
        }
        if (_validParameters(id, path)) {
          return _updatePolygonPath(id, path);
        }
      }
      function _multiUpdatePath(ids, path) {
        var polygonArray = new __gmh__.Obj.PolygonArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (_validParameters(id, path)) {
            polygonArray[id] = _updatePolygonPath(id, path);
          }
        }
        return polygonArray;
      }
      function _updatePolygonPath(id, path) {
        __gmh__.Data.Polygon[id].Obj.setOptions({
          paths: path
        });
        return __gmh__.Data.Polygon[id];
      }
      function _validParameters(id, path) {
        if (!__gmh__.Data.Polygon[id]) {
          throw "Error: ID does not exist";
        }
        if (!path) {
          throw "Error: Must supply a path";
        }
        return true;
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Polygon = GMH.__gmh__.Polygon;
      var PolygonArray = function(_super) {
        __extends(PolygonArray, _super);
        function PolygonArray() {
          return _super.call(this, __gmh__.Constants.Object.Type.POLYGON_ARRAY, __gmh__.Constants.Object.Type.POLYGON) || this;
        }
        PolygonArray.prototype.addListener = function(type, fn) {
          return _Polygon.addListener(this.getIDs(), type, fn);
        };
        PolygonArray.prototype.removeAllListeners = function() {
          return _Polygon.removeAllListeners(this.getIDs());
        };
        PolygonArray.prototype.removeListenerType = function(type) {
          return _Polygon.removeListenerType(this.getIDs(), type);
        };
        PolygonArray.prototype.updatePath = function(path) {
          return _Polygon.updatePath(this.getIDs(), path);
        };
        return PolygonArray;
      }(Obj.BaseObjectArray);
      Obj.PolygonArray = PolygonArray;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Data;
    (function(Data) {
      Data.Map = undefined;
      Data.Label = new __gmh__.Obj.LabelArray();
      Data.Marker = new __gmh__.Obj.MarkerArray();
      Data.Polygon = new __gmh__.Obj.PolygonArray();
    })(Data = __gmh__.Data || (__gmh__.Data = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Label;
    (function(Label) {
      function getBounds(ids) {
        ids = GMH.Util.toArray(ids);
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Label[id]) {
            bounds.union(_getLabelsBounds(id));
          }
        }
        return bounds;
      }
      Label.getBounds = getBounds;
      function getCenter(id) {
        return getBounds(id).getCenter();
      }
      Label.getCenter = getCenter;
      function _getLabelsBounds(id) {
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(__gmh__.Data.Label[id].Obj.position);
        return bounds;
      }
    })(Label = __gmh__.Label || (__gmh__.Label = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Label;
    (function(Label) {
      var Action = {
        HIDE: "hide",
        SHOW: "show",
        TOGGLE: "toggle"
      };
      var Visibility = {
        hide: function(id) {
          return null;
        },
        show: function(id) {
          return __gmh__.Data.Map.Obj;
        },
        toggle: function(id) {
          return __gmh__.Data.Label[id].Obj.map == null ? __gmh__.Data.Map.Obj : null;
        }
      };
      function hide(id) {
        return _display(id, Action.HIDE);
      }
      Label.hide = hide;
      function show(id) {
        return _display(id, Action.SHOW);
      }
      Label.show = show;
      function toggle(id) {
        return _display(id, Action.TOGGLE);
      }
      Label.toggle = toggle;
      function _display(id, action) {
        if (jQuery.isArray(id)) {
          return _multiDisplay(id, action);
        }
        if (__gmh__.Data.Label[id]) {
          return _setLabelVisibility(id, action);
        }
      }
      function _multiDisplay(ids, action) {
        var labelArray = new __gmh__.Obj.LabelArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Label[id]) {
            labelArray[id] = _setLabelVisibility(id, action);
          }
        }
        return labelArray;
      }
      function _setLabelVisibility(id, action) {
        __gmh__.Data.Label[id].Obj.setMap(Visibility[action](id));
        return __gmh__.Data.Label[id];
      }
    })(Label = __gmh__.Label || (__gmh__.Label = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Label;
    (function(Label_1) {
      function remove(id) {
        return _remove(id);
      }
      Label_1.remove = remove;
      function _remove(id) {
        if (jQuery.isArray(id)) {
          return _multiRemove(id);
        }
        if (__gmh__.Data.Label[id]) {
          return _removeLabel(id);
        }
      }
      function _multiRemove(ids) {
        var labelArray = new __gmh__.Obj.LabelArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Label[id]) {
            labelArray[id] = _removeLabel(id);
          }
        }
        return labelArray;
      }
      function _removeLabel(id) {
        var Label = __gmh__.Data.Label[id];
        Label.Obj.setMap(null);
        delete __gmh__.Data.Label[id];
        return Label;
      }
    })(Label = __gmh__.Label || (__gmh__.Label = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Label;
    (function(Label) {
      function reset(id) {
        return _reset(id);
      }
      Label.reset = reset;
      function _reset(id) {
        if (jQuery.isArray(id)) {
          return _multiReset(id);
        }
        if (__gmh__.Data.Label[id]) {
          return _resetLabel(id);
        }
      }
      function _multiReset(ids) {
        var labelArray = new __gmh__.Obj.LabelArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Label[id]) {
            labelArray[id] = _resetLabel(id);
          }
        }
        return labelArray;
      }
      function _resetLabel(id) {
        return Label.update(id, __gmh__.Data.Label[id].Init.Options);
      }
    })(Label = __gmh__.Label || (__gmh__.Label = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Label;
    (function(Label) {
      function update(id, userOptions) {
        return _update(id, _getOptions(userOptions));
      }
      Label.update = update;
      function _update(id, options) {
        if (jQuery.isArray(id)) {
          return _multiUpdate(id, options);
        }
        if (__gmh__.Data.Label[id]) {
          return _updateLabel(id, options);
        }
      }
      function _multiUpdate(ids, options) {
        var labelArray = new __gmh__.Obj.LabelArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Label[id]) {
            labelArray[id] = _updateLabel(id, options);
          }
        }
        return labelArray;
      }
      function _updateLabel(id, options) {
        __gmh__.Data.Label[id].Obj.setOptions(options);
        return __gmh__.Data.Label[id];
      }
      function _getOptions(options) {
        var defaults = GMH.Config.Default.Label || {};
        options = options == null ? defaults : options;
        if (jQuery.type(options.position) == "string") {
          options.position = GMH.Util.toLatLng(options.position);
        }
        return options;
      }
    })(Label = __gmh__.Label || (__gmh__.Label = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _GMH = GMH.__gmh__;
      var BaseObject = function() {
        function BaseObject(id, options, obj, type) {
          this.ID = id;
          this.Init = {
            Options: options
          };
          this.Obj = obj;
          this.Obj["GMH"] = {
            ID: id,
            Parent: function() {
              return __gmh__.Data[type][id];
            }
          };
          this.Type = type;
        }
        BaseObject.prototype.getBounds = function() {
          return _GMH[this.Type].getBounds(this.ID);
        };
        BaseObject.prototype.getCenter = function() {
          return _GMH[this.Type].getCenter(this.ID);
        };
        BaseObject.prototype.hide = function() {
          return _GMH[this.Type].hide(this.ID);
        };
        BaseObject.prototype.not = function() {
          return GMH.Util.copy(__gmh__.Data[this.Type], this.ID);
        };
        BaseObject.prototype.remove = function() {
          return _GMH[this.Type].remove(this.ID);
        };
        BaseObject.prototype.reset = function() {
          return _GMH[this.Type].reset(this.ID);
        };
        BaseObject.prototype.show = function() {
          return _GMH[this.Type].show(this.ID);
        };
        BaseObject.prototype.toggle = function() {
          return _GMH[this.Type].toggle(this.ID);
        };
        BaseObject.prototype.update = function(options) {
          return _GMH[this.Type].update(this.ID, options);
        };
        return BaseObject;
      }();
      Obj.BaseObject = BaseObject;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Label = GMH.__gmh__.Label;
      var Label = function(_super) {
        __extends(Label, _super);
        function Label(id, options) {
          var _this = this;
          var obj = new Obj.googleLabel(options);
          _this = _super.call(this, id, options, obj, __gmh__.Constants.Object.Type.LABEL) || this;
          return _this;
        }
        Label.prototype.updatePosition = function(position) {
          return _Label.updatePosition(this.ID, position);
        };
        return Label;
      }(Obj.BaseObject);
      Obj.Label = Label;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var _D = GMH.__gmh__.Data;
  var _Obj = GMH.__gmh__.Obj;
  function addLabel(id, text, position, userOptions) {
    return _add(id, text, position, userOptions);
  }
  GMH.addLabel = addLabel;
  function _add(id, text, position, userOptions) {
    if (jQuery.isArray(id)) {
      return _multiAdd(id);
    }
    if (_validParameters(id, position)) {
      return _addLabel(id, text, position, userOptions);
    }
  }
  function _multiAdd(objects) {
    var labelArray = new _Obj.LabelArray();
    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      var id = objects[i].id;
      var text = objects[i].text;
      var position = objects[i].position;
      var userOptions = objects[i].options;
      if (_validParameters(id, position)) {
        labelArray[id] = _addLabel(id, text, position, userOptions);
      }
    }
    return labelArray;
  }
  function _addLabel(id, text, position, userOptions) {
    if (jQuery.type(position) == "string") {
      position = GMH.Util.toLatLng(position);
    }
    var defaults = GMH.Config.Default.Label || {};
    var options = jQuery.extend({}, defaults, userOptions);
    options.map = _D.Map.Obj;
    options.text = _getText(id, text);
    options.position = position;
    _D.Label[id] = new _Obj.Label(id, options);
    return _D.Label[id];
  }
  function _getText(id, text) {
    return text == null ? id : text;
  }
  function _validParameters(id, position) {
    if (_D.Label[id]) {
      throw "Error: ID already exists";
    }
    if (!position) {
      throw "Error: Must supply a position";
    }
    return true;
  }
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Map;
    (function(Map) {
      function setBounds(type, ids) {
        if (jQuery.type(type) == "object") {
          _multiType(type);
        } else {
          _singleType(type, ids);
        }
        return __gmh__.Data.Map;
      }
      Map.setBounds = setBounds;
      function getCenter() {
        return __gmh__.Data.Map.Obj.getCenter();
      }
      Map.getCenter = getCenter;
      function _singleType(type, ids) {
        type = GMH.Util.getObjectType(type);
        if (type == "initial" || type == "init") {
          __gmh__.Data.Map.Obj.fitBounds(__gmh__.Data.Map.Init.Bounds);
          __gmh__.Data.Map.Obj.setZoom(__gmh__.Data.Map.Init.Options.zoom);
          return;
        }
        var bounds = _getBounds(type, _getIDs(type, ids));
        __gmh__.Data.Map.Obj.fitBounds(bounds);
      }
      function _multiType(obj) {
        var bounds = new google.maps.LatLngBounds();
        var types = Object.keys(obj);
        for (var i = 0, i_end = types.length; i < i_end; i++) {
          var type = types[i];
          var ids = obj[type];
          type = GMH.Util.getObjectType(type);
          bounds.union(_getBounds(type, _getIDs(type, ids)));
        }
        __gmh__.Data.Map.Obj.fitBounds(bounds);
      }
      function _getBounds(type, ids) {
        ids = GMH.Util.toArray(ids);
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data[type][id]) {
            bounds.union(__gmh__.Data[type][id].getBounds());
          }
        }
        return bounds;
      }
      function _getIDs(type, ids) {
        return ids == null ? GMH.Util.getIDs(__gmh__.Data[type]) : ids;
      }
    })(Map = __gmh__.Map || (__gmh__.Map = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var _C = GMH.__gmh__.Constants;
  var _D = GMH.__gmh__.Data;
  var _Obj = GMH.__gmh__.Obj;
  function initMap(containerID, userOptions) {
    var defaults = GMH.Config.Default.Map || _C.Default.Map;
    var options = jQuery.extend({}, defaults, userOptions);
    _D.Map = new _Obj.Map(containerID, options);
    return _D.Map;
  }
  GMH.initMap = initMap;
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Map;
    (function(Map) {
      function addListener(type, fn) {
        _addListener(type, fn);
        return __gmh__.Data.Map;
      }
      Map.addListener = addListener;
      function removeListenerType(type) {
        if (jQuery.type(type) == "string") {
          type.split(",");
        }
        _removeListenerType(type);
        return __gmh__.Data.Map;
      }
      Map.removeListenerType = removeListenerType;
      function removeAllListeners() {
        google.maps.event.clearInstanceListeners(__gmh__.Data.Map.Obj);
        return __gmh__.Data.Map;
      }
      Map.removeAllListeners = removeAllListeners;
      function _addListener(type, fn) {
        if (jQuery.isArray(type)) {
          return _multiAddListener(type);
        }
        type = GMH.Util.getEventType(type);
        google.maps.event.addListener(__gmh__.Data.Map.Obj, type, fn);
      }
      function _multiAddListener(types) {
        for (var i = 0, i_end = types.length; i < i_end; i++) {
          var type = Object.keys(types[i])[0];
          var fn = types[i][type];
          type = GMH.Util.getEventType(type);
          google.maps.event.addListener(__gmh__.Data.Map.Obj, type, fn);
        }
      }
      function _removeListenerType(types) {
        for (var i = 0, i_end = types.length; i < i_end; i++) {
          var type = GMH.Util.getEventType(types[i]);
          google.maps.event.clearListeners(__gmh__.Data.Map.Obj, type);
        }
      }
    })(Map = __gmh__.Map || (__gmh__.Map = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Map;
    (function(Map) {
      function update(options) {
        var defaults = GMH.Config.Default.Map || __gmh__.Constants.Default.Map;
        options = options == null ? defaults : options;
        if (jQuery.type(options.center) == "string") {
          options.center = GMH.Util.toLatLng(options.center);
        }
        __gmh__.Data.Map.Obj.setOptions(options);
        return __gmh__.Data.Map;
      }
      Map.update = update;
      function reset() {
        __gmh__.Data.Map.Obj.fitBounds(__gmh__.Data.Map.Init.Bounds);
        return update(__gmh__.Data.Map.Init.Options);
      }
      Map.reset = reset;
    })(Map = __gmh__.Map || (__gmh__.Map = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      function getBounds(ids) {
        ids = GMH.Util.toArray(ids);
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Marker[id]) {
            bounds.union(_getMarkersBounds(id));
          }
        }
        return bounds;
      }
      Marker.getBounds = getBounds;
      function getCenter(id) {
        return getBounds(id).getCenter();
      }
      Marker.getCenter = getCenter;
      function _getMarkersBounds(id) {
        var bounds = new google.maps.LatLngBounds();
        bounds.extend(__gmh__.Data.Marker[id].Obj.getPosition());
        return bounds;
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      var Action = {
        HIDE: "hide",
        SHOW: "show",
        TOGGLE: "toggle"
      };
      var Visibility = {
        hide: function(id) {
          return false;
        },
        show: function(id) {
          return true;
        },
        toggle: function(id) {
          return !__gmh__.Data.Marker[id].Obj.getVisible();
        }
      };
      function hide(id) {
        return _display(id, Action.HIDE);
      }
      Marker.hide = hide;
      function show(id) {
        return _display(id, Action.SHOW);
      }
      Marker.show = show;
      function toggle(id) {
        return _display(id, Action.TOGGLE);
      }
      Marker.toggle = toggle;
      function _display(id, action) {
        if (jQuery.isArray(id)) {
          return _multiDisplay(id, action);
        }
        if (__gmh__.Data.Marker[id]) {
          return _setMarkerVisibility(id, action);
        }
      }
      function _multiDisplay(ids, action) {
        var markerArray = new __gmh__.Obj.MarkerArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Marker[id]) {
            markerArray[id] = _setMarkerVisibility(id, action);
          }
        }
        return markerArray;
      }
      function _setMarkerVisibility(id, action) {
        __gmh__.Data.Marker[id].Obj.setOptions({
          visible: Visibility[action](id)
        });
        return __gmh__.Data.Marker[id];
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      function remove(id) {
        return _remove(id);
      }
      Marker.remove = remove;
      function _remove(id) {
        if (jQuery.isArray(id)) {
          return _multiRemove(id);
        }
        if (__gmh__.Data.Marker[id]) {
          return _removeMarker(id);
        }
      }
      function _multiRemove(ids) {
        var markerArray = new __gmh__.Obj.MarkerArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Marker[id]) {
            markerArray[id] = _removeMarker(id);
          }
        }
        return markerArray;
      }
      function _removeMarker(id) {
        var marker = __gmh__.Data.Marker[id];
        marker.Obj.setMap(null);
        delete __gmh__.Data.Marker[id];
        return marker;
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      function reset(id) {
        return _reset(id);
      }
      Marker.reset = reset;
      function _reset(id) {
        if (jQuery.isArray(id)) {
          return _multiReset(id);
        }
        if (__gmh__.Data.Marker[id]) {
          return _resetMarker(id);
        }
      }
      function _multiReset(ids) {
        var markerArray = new __gmh__.Obj.MarkerArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Marker[id]) {
            markerArray[id] = _resetMarker(id);
          }
        }
        return markerArray;
      }
      function _resetMarker(id) {
        return Marker.update(id, __gmh__.Data.Marker[id].Init.Options);
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Marker;
    (function(Marker) {
      function update(id, userOptions) {
        return _update(id, _getOptions(userOptions));
      }
      Marker.update = update;
      function _update(id, options) {
        if (jQuery.isArray(id)) {
          return _multiUpdate(id, options);
        }
        if (__gmh__.Data.Marker[id]) {
          return _updateMarker(id, options);
        }
      }
      function _multiUpdate(ids, options) {
        var markerArray = new __gmh__.Obj.MarkerArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Marker[id]) {
            markerArray[id] = _updateMarker(id, options);
          }
        }
        return markerArray;
      }
      function _updateMarker(id, options) {
        __gmh__.Data.Marker[id].Obj.setOptions(options);
        return __gmh__.Data.Marker[id];
      }
      function _getOptions(options) {
        var defaults = GMH.Config.Default.Marker || {};
        options = options == null ? defaults : options;
        if (jQuery.type(options.position) == "string") {
          options.position = GMH.Util.toLatLng(options.position);
        }
        return options;
      }
    })(Marker = __gmh__.Marker || (__gmh__.Marker = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Marker = GMH.__gmh__.Marker;
      var Marker = function(_super) {
        __extends(Marker, _super);
        function Marker(id, options) {
          var _this = this;
          var obj = new google.maps.Marker(options);
          _this = _super.call(this, id, options, obj, __gmh__.Constants.Object.Type.MARKER) || this;
          return _this;
        }
        Marker.prototype.addListener = function(type, fn) {
          return _Marker.addListener(this.ID, type, fn);
        };
        Marker.prototype.removeAllListeners = function() {
          return _Marker.removeAllListeners(this.ID);
        };
        Marker.prototype.removeListenerType = function(type) {
          return _Marker.removeListenerType(this.ID, type);
        };
        Marker.prototype.updatePosition = function(position) {
          return _Marker.updatePosition(this.ID, position);
        };
        return Marker;
      }(Obj.BaseObject);
      Obj.Marker = Marker;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var _D = GMH.__gmh__.Data;
  var _Obj = GMH.__gmh__.Obj;
  function addMarker(id, position, userOptions) {
    return _add(id, position, userOptions);
  }
  GMH.addMarker = addMarker;
  function _add(id, position, userOptions) {
    if (jQuery.isArray(id)) {
      return _multiAdd(id);
    }
    if (_validParameters(id, position)) {
      return _addMarker(id, position, userOptions);
    }
  }
  function _multiAdd(objects) {
    var markerArray = new _Obj.MarkerArray();
    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      var id = objects[i].id;
      var position = objects[i].position;
      var userOptions = objects[i].options;
      if (_validParameters(id, position)) {
        markerArray[id] = _addMarker(id, position, userOptions);
      }
    }
    return markerArray;
  }
  function _addMarker(id, position, userOptions) {
    if (jQuery.type(position) == "string") {
      position = GMH.Util.toLatLng(position);
    }
    var defaults = GMH.Config.Default.Marker || {};
    var options = jQuery.extend({}, defaults, userOptions);
    options.map = _D.Map.Obj;
    options.position = position;
    _D.Marker[id] = new _Obj.Marker(id, options);
    return _D.Marker[id];
  }
  function _validParameters(id, position) {
    if (_D.Marker[id]) {
      throw "Error: ID already exists";
    }
    if (!position) {
      throw "Error: Must supply a position";
    }
    return true;
  }
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var Property = {
        ALIGN: "align",
        FONT_COLOR: "fontColor",
        FONT_FAMILY: "fontFamily",
        FONT_SIZE: "fontSize",
        MAX_ZOOM: "maxZoom",
        MIN_ZOOM: "minZoom",
        POSITION: "position",
        STROKE_WEIGHT: "strokeWeight",
        STROKE_COLOR: "strokeColor",
        TEXT: "text",
        Z_INDEX: "zIndex"
      };
      var Default = {
        ALIGN: "center",
        FONT_COLOR: "#000",
        FONT_FAMILY: "sans-serif",
        FONT_SIZE: 14,
        STROKE_WEIGHT: 2,
        STROKE_COLOR: "#FFF",
        Z_INDEX: 1e3
      };
      Obj.googleLabel = function(options) {
        for (var prop in Default) {
          this.set(Property[prop], Default[prop]);
        }
        this.setValues(options);
      };
      Obj.googleLabel.prototype = new google.maps.OverlayView();
      Obj.googleLabel.prototype.changed = function(prop) {
        switch (prop) {
         case Property.ALIGN:
         case Property.FONT_COLOR:
         case Property.FONT_FAMILY:
         case Property.FONT_SIZE:
         case Property.STROKE_WEIGHT:
         case Property.STROKE_COLOR:
         case Property.TEXT:
          return this.drawCanvas_();

         case Property.MAX_ZOOM:
         case Property.MIN_ZOOM:
         case Property.POSITION:
          return this.draw();
        }
      };
      Obj.googleLabel.prototype.drawCanvas_ = function() {
        var canvas = this.canvas_;
        if (!canvas) return;
        var style = canvas.style;
        style.zIndex = this.get(Property.Z_INDEX);
        var ctx = canvas.getContext("2d");
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.strokeStyle = this.get(Property.STROKE_COLOR);
        ctx.fillStyle = this.get(Property.FONT_COLOR);
        ctx.font = this.get(Property.FONT_SIZE) + "px " + this.get(Property.FONT_FAMILY);
        var strokeWeight = Number(this.get(Property.STROKE_WEIGHT));
        var text = this.get(Property.TEXT).toString();
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
      Obj.googleLabel.prototype.onAdd = function() {
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
      Obj.googleLabel.prototype.getMarginLeft_ = function(textWidth) {
        switch (this.get(Property.ALIGN)) {
         case "left":
          return 0;

         case "right":
          return -textWidth;
        }
        return textWidth / -2;
      };
      Obj.googleLabel.prototype.draw = function() {
        var projection = this.getProjection();
        if (!projection) {
          return;
        }
        if (!this.canvas_) {
          return;
        }
        var latLng = this.get(Property.POSITION);
        if (!latLng) {
          return;
        }
        var pos = projection.fromLatLngToDivPixel(latLng);
        var style = this.canvas_.style;
        style["top"] = pos.y + "px";
        style["left"] = pos.x + "px";
        style["visibility"] = this.getVisible_();
      };
      Obj.googleLabel.prototype.getVisible_ = function() {
        var minZoom = this.get(Property.MIN_ZOOM);
        var maxZoom = this.get(Property.MAX_ZOOM);
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
      Obj.googleLabel.prototype.onRemove = function() {
        var canvas = this.canvas_;
        if (canvas && canvas.parentNode) {
          canvas.parentNode.removeChild(canvas);
        }
      };
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Map = GMH.__gmh__.Map;
      var Map = function() {
        function Map(containerID, options) {
          var _this = this;
          this.Init = {
            Bounds: undefined,
            Options: options
          };
          this.Obj = new google.maps.Map(document.getElementById(containerID), options);
          this.Obj["GMH"] = {
            Parent: function() {
              return __gmh__.Data.Map;
            }
          };
          this.Type = __gmh__.Constants.Object.Type.MAP;
          google.maps.event.addListenerOnce(this.Obj, __gmh__.Constants.Event.Type.TILES_LOADED, function() {
            _this.Init.Bounds = _this.Obj.getBounds();
          });
        }
        Map.prototype.addListener = function(type, fn) {
          return _Map.addListener(type, fn);
        };
        Map.prototype.getCenter = function() {
          return _Map.getCenter();
        };
        Map.prototype.removeAllListeners = function() {
          return _Map.removeAllListeners();
        };
        Map.prototype.removeListenerType = function(type) {
          return _Map.removeListenerType(type);
        };
        Map.prototype.reset = function() {
          return _Map.reset();
        };
        Map.prototype.setBounds = function(type, ids) {
          return _Map.setBounds(type, ids);
        };
        Map.prototype.update = function(options) {
          return _Map.update(options);
        };
        return Map;
      }();
      Obj.Map = Map;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      function getBounds(ids) {
        ids = GMH.Util.toArray(ids);
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Polygon[id]) {
            bounds.union(_getPolygonsBounds(id));
          }
        }
        return bounds;
      }
      Polygon.getBounds = getBounds;
      function getCenter(id) {
        return getBounds(id).getCenter();
      }
      Polygon.getCenter = getCenter;
      function _getPolygonsBounds(id) {
        var bounds = new google.maps.LatLngBounds();
        var paths = __gmh__.Data.Polygon[id].Obj.getPaths();
        for (var i = 0, i_end = paths.length; i < i_end; i++) {
          var path = paths.getAt(i);
          for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
            bounds.extend(path.getAt(j));
          }
        }
        return bounds;
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      var Action = {
        HIDE: "hide",
        SHOW: "show",
        TOGGLE: "toggle"
      };
      var Visibility = {
        hide: function(id) {
          return false;
        },
        show: function(id) {
          return true;
        },
        toggle: function(id) {
          return !__gmh__.Data.Polygon[id].Obj.getVisible();
        }
      };
      function hide(id) {
        return _display(id, Action.HIDE);
      }
      Polygon.hide = hide;
      function show(id) {
        return _display(id, Action.SHOW);
      }
      Polygon.show = show;
      function toggle(id) {
        return _display(id, Action.TOGGLE);
      }
      Polygon.toggle = toggle;
      function _display(id, action) {
        if (jQuery.isArray(id)) {
          return _multiDisplay(id, action);
        }
        if (__gmh__.Data.Polygon[id]) {
          return _setPolygonVisibility(id, action);
        }
      }
      function _multiDisplay(ids, action) {
        var polygonArray = new __gmh__.Obj.PolygonArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Polygon[id]) {
            polygonArray[id] = _setPolygonVisibility(id, action);
          }
        }
        return polygonArray;
      }
      function _setPolygonVisibility(id, action) {
        __gmh__.Data.Polygon[id].Obj.setOptions({
          visible: Visibility[action](id)
        });
        return __gmh__.Data.Polygon[id];
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      function remove(id) {
        return _remove(id);
      }
      Polygon.remove = remove;
      function _remove(id) {
        if (jQuery.isArray(id)) {
          return _multiRemove(id);
        }
        if (__gmh__.Data.Polygon[id]) {
          return _removePolygon(id);
        }
      }
      function _multiRemove(ids) {
        var polygonArray = new __gmh__.Obj.PolygonArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Polygon[id]) {
            polygonArray[id] = _removePolygon(id);
          }
        }
        return polygonArray;
      }
      function _removePolygon(id) {
        var polygon = __gmh__.Data.Polygon[id];
        polygon.Obj.setMap(null);
        delete __gmh__.Data.Polygon[id];
        return polygon;
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      function reset(id) {
        return _reset(id);
      }
      Polygon.reset = reset;
      function _reset(id) {
        if (jQuery.isArray(id)) {
          return _multiReset(id);
        }
        if (__gmh__.Data.Polygon[id]) {
          return _resetPolygon(id);
        }
      }
      function _multiReset(ids) {
        var polygonArray = new __gmh__.Obj.PolygonArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Polygon[id]) {
            polygonArray[id] = _resetPolygon(id);
          }
        }
        return polygonArray;
      }
      function _resetPolygon(id) {
        return Polygon.update(id, __gmh__.Data.Polygon[id].Init.Options);
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Polygon;
    (function(Polygon) {
      function update(id, userOptions) {
        return _update(id, _getOptions(userOptions));
      }
      Polygon.update = update;
      function _update(id, options) {
        if (jQuery.isArray(id)) {
          return _multiUpdate(id, options);
        }
        if (__gmh__.Data.Polygon[id]) {
          return _updatePolygon(id, options);
        }
      }
      function _multiUpdate(ids, options) {
        var polygonArray = new __gmh__.Obj.PolygonArray();
        for (var i = 0, i_end = ids.length; i < i_end; i++) {
          var id = ids[i];
          if (__gmh__.Data.Polygon[id]) {
            polygonArray[id] = _updatePolygon(id, options);
          }
        }
        return polygonArray;
      }
      function _updatePolygon(id, options) {
        __gmh__.Data.Polygon[id].Obj.setOptions(options);
        return __gmh__.Data.Polygon[id];
      }
      function _getOptions(options) {
        var defaults = GMH.Config.Default.Polygon || {};
        options = options == null ? defaults : options;
        if (jQuery.type(options.paths) == "string") {
          options.paths = GMH.Util.toLatLngArray(options.paths);
        }
        return options;
      }
    })(Polygon = __gmh__.Polygon || (__gmh__.Polygon = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var __gmh__;
  (function(__gmh__) {
    var Obj;
    (function(Obj) {
      var _Polygon = GMH.__gmh__.Polygon;
      var Polygon = function(_super) {
        __extends(Polygon, _super);
        function Polygon(id, options) {
          var _this = this;
          var obj = new google.maps.Polygon(options);
          _this = _super.call(this, id, options, obj, __gmh__.Constants.Object.Type.POLYGON) || this;
          return _this;
        }
        Polygon.prototype.addListener = function(type, fn) {
          return _Polygon.addListener(this.ID, type, fn);
        };
        Polygon.prototype.removeAllListeners = function() {
          return _Polygon.removeAllListeners(this.ID);
        };
        Polygon.prototype.removeListenerType = function(type) {
          return _Polygon.removeListenerType(this.ID, type);
        };
        Polygon.prototype.updatePath = function(path) {
          return _Polygon.updatePath(this.ID, path);
        };
        return Polygon;
      }(Obj.BaseObject);
      Obj.Polygon = Polygon;
    })(Obj = __gmh__.Obj || (__gmh__.Obj = {}));
  })(__gmh__ = GMH.__gmh__ || (GMH.__gmh__ = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var _D = GMH.__gmh__.Data;
  var _Obj = GMH.__gmh__.Obj;
  function addPolygon(id, path, userOptions) {
    return _add(id, path, userOptions);
  }
  GMH.addPolygon = addPolygon;
  function _add(id, path, userOptions) {
    if (jQuery.isArray(id)) {
      return _multiAdd(id);
    }
    if (_validParameters(id, path)) {
      return _addPolygon(id, path, userOptions);
    }
  }
  function _multiAdd(objects) {
    var polygonArray = new _Obj.PolygonArray();
    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      var id = objects[i].id;
      var path = objects[i].path;
      var userOptions = objects[i].options;
      if (_validParameters(id, path)) {
        polygonArray[id] = _addPolygon(id, path, userOptions);
      }
    }
    return polygonArray;
  }
  function _addPolygon(id, paths, userOptions) {
    if (jQuery.type(paths) == "string") {
      paths = GMH.Util.toLatLngArray(paths);
    }
    var defaults = GMH.Config.Default.Polygon || {};
    var options = jQuery.extend({}, defaults, userOptions);
    options.map = _D.Map.Obj;
    options.paths = paths;
    _D.Polygon[id] = new _Obj.Polygon(id, options);
    return _D.Polygon[id];
  }
  function _validParameters(id, path) {
    if (_D.Polygon[id]) {
      throw "Error: ID already exists";
    }
    if (!path) {
      throw "Error: Must supply a path";
    }
    return true;
  }
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var _C = GMH.__gmh__.Constants;
  var _D = GMH.__gmh__.Data;
  function $(type, ids) {
    type = GMH.Util.getObjectType(type);
    if (type == _C.Object.Type.MAP) {
      return _D.Map;
    }
    var exclude = getIDsToExclude(type, GMH.Util.toArray(ids));
    return GMH.Util.copy(_D[type], exclude);
  }
  GMH.$ = $;
  function getIDsToExclude(type, ids) {
    var exclude;
    if (ids) {
      var allIDs = _D[type].getIDs();
      exclude = allIDs.filter(function(i) {
        return ids.indexOf(i) === -1;
      });
    }
    return exclude;
  }
})(GMH || (GMH = {}));