/*!
 * Google Maps Helper v1.0.0 (https://github.com/tmentink/google.maps_helper)
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
  var Obj;
  (function(Obj) {
    var ObjectArray = function() {
      function ObjectArray(type) {
        if (type === void 0) {
          type = "ObjectArray";
        }
        this._i = 0;
        this.Type = type;
      }
      return ObjectArray;
    }();
    Obj.ObjectArray = ObjectArray;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "LabelArray";
    var LabelArray = function(_super) {
      __extends(LabelArray, _super);
      function LabelArray() {
        return _super.call(this, TYPE) || this;
      }
      return LabelArray;
    }(Obj.ObjectArray);
    Obj.LabelArray = LabelArray;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "MarkerArray";
    var MarkerArray = function(_super) {
      __extends(MarkerArray, _super);
      function MarkerArray() {
        return _super.call(this, TYPE) || this;
      }
      return MarkerArray;
    }(Obj.ObjectArray);
    Obj.MarkerArray = MarkerArray;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "PolygonArray";
    var PolygonArray = function(_super) {
      __extends(PolygonArray, _super);
      function PolygonArray() {
        return _super.call(this, TYPE) || this;
      }
      return PolygonArray;
    }(Obj.ObjectArray);
    Obj.PolygonArray = PolygonArray;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Data;
  (function(Data) {
    Data.Map = {};
    Data.Labels = new GMH.Obj.LabelArray();
    Data.Markers = new GMH.Obj.MarkerArray();
    Data.Polygons = new GMH.Obj.PolygonArray();
  })(Data = GMH.Data || (GMH.Data = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
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
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "Label";
    var Label = function() {
      function Label(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Label;
    }();
    Obj.Label = Label;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "Map";
    var Map = function() {
      function Map(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Map;
    }();
    Obj.Map = Map;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "Marker";
    var Marker = function() {
      function Marker(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Marker;
    }();
    Obj.Marker = Marker;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Obj;
  (function(Obj) {
    var TYPE = "Polygon";
    var Polygon = function() {
      function Polygon(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Polygon;
    }();
    Obj.Polygon = Polygon;
  })(Obj = GMH.Obj || (GMH.Obj = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Util;
  (function(Util) {
    var EventType = {
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
    };
    var EventTypeAlias = {
      animationchanged: EventType.ANIMATION_CHANGED,
      boundschanged: EventType.BOUNDS_CHANGED,
      centerchanged: EventType.CENTER_CHANGED,
      click: EventType.CLICK,
      clickablechanged: EventType.CLICKABLE_CHANGED,
      cursorchanged: EventType.CURSOR_CHANGED,
      doubleclick: EventType.DOUBLE_CLICK,
      drag: EventType.DRAG,
      dragend: EventType.DRAG_END,
      dragstart: EventType.DRAG_START,
      draggablechanged: EventType.DRAGGABLE_CHANGED,
      flatchanged: EventType.FLAT_CHANGED,
      headingchanged: EventType.HEADING_CHANGED,
      iconchanged: EventType.ICON_CHANGED,
      idle: EventType.IDLE,
      maptypeidchanged: EventType.MAP_TYPE_ID_CHANGED,
      mousedown: EventType.MOUSE_DOWN,
      mousemove: EventType.MOUSE_MOVE,
      mouseout: EventType.MOUSE_OUT,
      mouseover: EventType.MOUSE_OVER,
      mouseup: EventType.MOUSE_UP,
      positionchanged: EventType.POSITION_CHANGED,
      projectionchanged: EventType.PROJECTION_CHANGED,
      resize: EventType.RESIZE,
      rightclick: EventType.RIGHT_CLICK,
      shapechanged: EventType.SHAPE_CHANGED,
      tilesloaded: EventType.TILES_LOADED,
      tiltchanged: EventType.TILT_CHANGED,
      titlechanged: EventType.TITLE_CHANGED,
      visiblechanged: EventType.VISIBLE_CHANGED,
      zindexchanged: EventType.ZINDEX_CHANGED,
      zoomchanged: EventType.ZOOM_CHANGED
    };
    var ObjectType = {
      LABEL: "Label",
      MAP: "Map",
      MARKER: "Marker",
      POLYGON: "Polygon"
    };
    var ObjectTypeAlias = {
      label: ObjectType.LABEL,
      labels: ObjectType.LABEL,
      map: ObjectType.MAP,
      maps: ObjectType.MAP,
      marker: ObjectType.MARKER,
      markers: ObjectType.MARKER,
      polygon: ObjectType.POLYGON,
      polygons: ObjectType.POLYGON
    };
    function copy(source, exclude) {
      var src_copy = $.extend(true, {}, source);
      if ($.type(exclude) == "object") {
        exclude = Object.keys(exclude);
      } else if ($.type(exclude) == "string") {
        exclude = exclude.split(",");
      }
      var src_proto = Object.keys(Object.getPrototypeOf(source));
      exclude = src_proto.concat(exclude);
      for (var i = 0, i_end = exclude.length; i < i_end; i++) {
        delete src_copy[exclude[i]];
      }
      var GMH_Obj = source.Type ? new GMH.Obj[source.Type]() : {};
      return $.extend(GMH_Obj, src_copy);
    }
    Util.copy = copy;
    function getIDs(obj) {
      var ids = Object.keys(obj);
      var _i = ids.indexOf("_i");
      if (_i !== -1) {
        ids.splice(_i, 1);
      }
      return ids;
    }
    Util.getIDs = getIDs;
    function toLatLng(str) {
      try {
        var points = str.split(",");
        return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
      } catch (ex) {
        console.log(ex);
        return {};
      }
    }
    Util.toLatLng = toLatLng;
    function toLatLngArray(str) {
      try {
        var latLngArray = [];
        var coordPairs = str.split("|");
        for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
          var points = coordPairs[i].split(",");
          var latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
          latLngArray.push(latLng);
        }
        return latLngArray;
      } catch (ex) {
        console.log(ex);
        return [];
      }
    }
    Util.toLatLngArray = toLatLngArray;
    function getObjectType(type) {
      type = type.toLowerCase();
      return ObjectTypeAlias[type];
    }
    Util.getObjectType = getObjectType;
    function getEventType(event) {
      event = event.toLowerCase().replace(/\s+/g, "");
      return EventTypeAlias[event] || event;
    }
    Util.getEventType = getEventType;
  })(Util = GMH.Util || (GMH.Util = {}));
})(GMH || (GMH = {}));