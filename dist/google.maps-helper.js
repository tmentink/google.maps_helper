/*!
 * Google Maps Helper - v1.0.0 | MIT License
 * Copyright 2017 Trent Mentink
 * https://github.com/tmentink/google.maps_helper
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

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "LabelArray";
    var LabelArray = function() {
      function LabelArray() {
        this._i = 0;
        this.Type = TYPE;
      }
      return LabelArray;
    }();
    Object.LabelArray = LabelArray;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "MarkerArray";
    var MarkerArray = function() {
      function MarkerArray() {
        this._i = 0;
        this.Type = TYPE;
      }
      return MarkerArray;
    }();
    Object.MarkerArray = MarkerArray;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "PolygonArray";
    var PolygonArray = function() {
      function PolygonArray() {
        this._i = 0;
        this.Type = TYPE;
      }
      return PolygonArray;
    }();
    Object.PolygonArray = PolygonArray;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Data;
  (function(Data) {
    Data.Map = {};
    Data.Labels = new GMH.Object.LabelArray();
    Data.Markers = new GMH.Object.MarkerArray();
    Data.Polygons = new GMH.Object.PolygonArray();
  })(Data = GMH.Data || (GMH.Data = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
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
    Object.googleLabel = function(options) {
      for (var prop in Default) {
        this.set(Property[prop], Default[prop]);
      }
      this.setValues(options);
    };
    Object.googleLabel.prototype = new google.maps.OverlayView();
    Object.googleLabel.prototype.changed = function(prop) {
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
    Object.googleLabel.prototype.drawCanvas_ = function() {
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
    Object.googleLabel.prototype.onAdd = function() {
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
    Object.googleLabel.prototype.getMarginLeft_ = function(textWidth) {
      switch (this.get(Property.ALIGN)) {
       case "left":
        return 0;

       case "right":
        return -textWidth;
      }
      return textWidth / -2;
    };
    Object.googleLabel.prototype.draw = function() {
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
    Object.googleLabel.prototype.getVisible_ = function() {
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
    Object.googleLabel.prototype.onRemove = function() {
      var canvas = this.canvas_;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "Label";
    var Label = function() {
      function Label(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Label;
    }();
    Object.Label = Label;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "Map";
    var Map = function() {
      function Map(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Map;
    }();
    Object.Map = Map;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "Marker";
    var Marker = function() {
      function Marker(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Marker;
    }();
    Object.Marker = Marker;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));

var GMH;

(function(GMH) {
  var Object;
  (function(Object) {
    var TYPE = "Polygon";
    var Polygon = function() {
      function Polygon(id, obj) {
        this.ID = id;
        this.Obj = obj;
        this.Type = TYPE;
      }
      return Polygon;
    }();
    Object.Polygon = Polygon;
  })(Object = GMH.Object || (GMH.Object = {}));
})(GMH || (GMH = {}));