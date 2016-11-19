
// ===========================================
// jQuery Shim
// ===========================================

  !(function(window) {
    "use strict";

    // if jQuery is already loaded then exit shim
    if (window.jQuery) {
      return;
    }


    // jQuery Base
    // =======================================
    var $ = {};


    $.isWindow = function(obj) {
      return obj && obj === obj.window;
    };


    $.type = function(obj) {
      if (!obj) {
        return obj + "";
      }

      return typeof obj === "object" || typeof obj === "function" ?
          class2type[toString.call(obj)] || "object" :
          typeof obj;
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
        if (obj.constructor &&
            !hasOwn.call(obj, "constructor") &&
            !hasOwn.call(obj.constructor.prototype, "isPrototypeOf")) {
          return false;
        }
      } catch (e) {
        return false;
      }

      for (key in obj) {
      }

      return key === undefined || hasOwn.call(obj, key);
    };


    var class2type = {},
        hasOwn = class2type.hasOwnProperty,
        toString = class2type.toString;

    var types = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
    for (var i = 0; i < types.length; i++) {
      class2type["[object " + types[i] + "]"] = types[i].toLowerCase();
    }


    $.extend = function() {
      var options, name, src, copy, copyIsArray, clone,
        target = arguments[ 0 ] || {},
        i = 1,
        length = arguments.length,
        deep = false;

      // Handle a deep copy situation
      if ( typeof target === "boolean" ) {
        deep = target;

        // Skip the boolean and the target
        target = arguments[ i ] || {};
        i++;
      }

      // Handle case when target is a string or something (possible in deep copy)
      if ( typeof target !== "object" && !jQuery.isFunction( target ) ) {
        target = {};
      }

      // Extend jQuery itself if only one argument is passed
      if ( i === length ) {
        target = this;
        i--;
      }

      for ( ; i < length; i++ ) {

        // Only deal with non-null/undefined values
        if ( ( options = arguments[ i ] ) != null ) {

          // Extend the base object
          for ( name in options ) {
            src = target[ name ];
            copy = options[ name ];

            // Prevent never-ending loop
            if ( target === copy ) {
              continue;
            }

            // Recurse if we're merging plain objects or arrays
            if ( deep && copy && ( $.isPlainObject( copy ) ||
              ( copyIsArray = $.isArray( copy ) ) ) ) {

              if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && $.isArray( src ) ? src : [];

              } else {
                clone = src && $.isPlainObject( src ) ? src : {};
              }

              // Never move original objects, clone them
              target[ name ] = $.extend( deep, clone, copy );

            // Don't bring in undefined values
            } else if ( copy !== undefined ) {
              target[ name ] = copy;
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


  })(window);



// ===========================================
// Object - Google Label
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Google Label Object
    // =======================================
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
    googleLabel.prototype = new google.maps.OverlayView;
    

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
      style.zIndex = (this.get("zIndex"));

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

      var latLng = (this.get("position"));
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
      var minZoom = (this.get("minZoom"));
      var maxZoom = (this.get("maxZoom"));

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

    
    // Expose Public Objects
    // =======================================
    GMH.Object.googleLabel = googleLabel;


    return GMH;
  })(GMH || {});



// ===========================================
// Object - Label
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Label Object
    // =======================================
    var Label = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    };

    Label.prototype = {
      ObjectType: "Label",
      not: function() { return GMH.Utility.copy(GMH.Data.Label, this.ID) },
      hide: function() { return GMH.Label.hide(this.ID); },
      show: function() { return GMH.Label.show(this.ID); },
      toggle: function() { return GMH.Label.toggle(this.ID); },
      delete: function() { return GMH.Label.delete(this.ID); },
      reset: function() { return GMH.Label.reset(this.ID); },
      update: function(options) { return GMH.Label.update(this.ID, options); },
      updatePosition: function(position) { return GMH.Label.updatePosition(this.ID, position); },
      getBounds: function() { return GMH.Label.getBounds(this.ID); },
      getCenter: function() { return GMH.Label.getCenter(this.ID); }
    };


    // Label Array Object
    // =======================================
    var LabelArray = function() {
      this._i = 0;
    };

    LabelArray.prototype = {
      ObjectType: "LabelArray",
      IDs: function() { return GMH.Utility.getIDs(this); },
      not: function() { return GMH.Utility.copy(GMH.Data.Label, this) },
      nextIndex: function() { this._i++; return this._i -1; },
      hide: function() { return GMH.Label.hide(this.IDs()); },
      show: function() { return GMH.Label.show(this.IDs()); },
      toggle: function() { return GMH.Label.toggle(this.IDs()); },
      delete: function() { return GMH.Label.delete(this.IDs()); },
      reset: function() { return GMH.Label.reset(this.IDs()); },
      update: function(options) { return GMH.Label.update(this.IDs(), options); },
      updatePosition: function(position) { return GMH.Label.updatePosition(this.IDs(), position); },
      getBounds: function() { return GMH.Label.getBounds(this.IDs()); },
      getCenter: function() { return GMH.Label.getCenter(this.IDs()); }
    };
    

    // Expose Public Objects
    // =======================================
    GMH.Object.Label = Label;
    GMH.Object.LabelArray = LabelArray;


    return GMH;
  })(GMH || {});



// ===========================================
// Object - Map
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Map Object
    // =======================================
    var Map = function(obj) {
      this.Obj = obj;
    };

    Map.prototype = {
      ObjectType: "Map",
      reset: function() { return GMH.Map.reset(); },
      update: function(options) { return GMH.Map.update(options); },
      setBounds: function(type, id) { return GMH.Map.setBounds(type, id); },
      addListener: function(type, fn) { return GMH.Map.addListener(type, fn); },
      removeListenerType: function(type) { return GMH.Map.removeListenerType(type); },
      removeAllListeners: function() { return GMH.Map.removeAllListeners(); }
    };
    

    // Expose Public Objects
    // =======================================
    GMH.Object.Map = Map;


    return GMH;
  })(GMH || {});



// ===========================================
// Object - Marker
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Marker Object
    // =======================================
    var Marker = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    };

    Marker.prototype = {
      ObjectType: "Marker",
      not: function() { return GMH.Utility.copy(GMH.Data.Marker, this.ID) },
      hide: function() { return GMH.Marker.hide(this.ID); },
      show: function() { return GMH.Marker.show(this.ID); },
      toggle: function() { return GMH.Marker.toggle(this.ID); },
      delete: function() { return GMH.Marker.delete(this.ID); },
      reset: function() { return GMH.Marker.reset(this.ID); },
      update: function(options) { return GMH.Marker.update(this.ID, options); },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.ID, position); },
      getBounds: function() { return GMH.Marker.getBounds(this.ID); },
      getCenter: function() { return GMH.Marker.getCenter(this.ID); },
      addListener: function(type, func) { return GMH.Marker.addListener(this.ID, type, func); },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.ID, type); },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.ID); }
    };


    // Marker Array Object
    // =======================================
    var MarkerArray = function() {
      this._i = 0;
    };

    MarkerArray.prototype = {
      ObjectType: "MarkerArray",
      IDs: function() { return GMH.Utility.getIDs(this); },
      not: function() { return GMH.Utility.copy(GMH.Data.Marker, this) },
      nextIndex: function() { this._i++; return this._i -1; },
      hide: function() { return GMH.Marker.hide(this.IDs()); },
      show: function() { return GMH.Marker.show(this.IDs()); },
      toggle: function() { return GMH.Marker.toggle(this.IDs()); },
      delete: function() { return GMH.Marker.delete(this.IDs()); },
      reset: function() { return GMH.Marker.reset(this.IDs()); },
      update: function(options) { return GMH.Marker.update(this.IDs(), options); },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.IDs(), position); },
      getBounds: function() { return GMH.Marker.getBounds(this.IDs()); },
      getCenter: function() { return GMH.Marker.getCenter(this.IDs()); },
      addListener: function(type, fn) { return GMH.Marker.addListener(this.IDs(), type, fn); },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.IDs()); }
    };


    // Expose Public Objects
    // =======================================
    GMH.Object.Marker = Marker;
    GMH.Object.MarkerArray = MarkerArray;


    return GMH;
  })(GMH || {});



// ===========================================
// Object - Polygon
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Polygon Object
    // =======================================
    var Polygon = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    };

    Polygon.prototype = {
      ObjectType: "Polygon",
      not: function() { return GMH.Utility.copy(GMH.Data.Polygon, this.ID) },
      hide: function() { return GMH.Polygon.hide(this.ID); },
      show: function() { return GMH.Polygon.show(this.ID); },
      toggle: function() { return GMH.Polygon.toggle(this.ID); },
      delete: function() { return GMH.Polygon.delete(this.ID); },
      reset: function() { return GMH.Polygon.reset(this.ID); },
      update: function(options) { return GMH.Polygon.update(this.ID, options); },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.ID, path); },
      getBounds: function() { return GMH.Polygon.getBounds(this.ID); },
      getCenter: function() { return GMH.Polygon.getCenter(this.ID); },
      addListener: function(type, func) { return GMH.Polygon.addListener(this.ID, type, func); },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.ID, type); },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.ID); }
    };


    // Polygon Array Object
    // =======================================
    var PolygonArray = function() {
      this._i = 0;
    };

    PolygonArray.prototype = {
      ObjectType: "PolygonArray",
      IDs: function() { return GMH.Utility.getIDs(this); },
      not: function() { return GMH.Utility.copy(GMH.Data.Polygon, this) },
      nextIndex: function() { this._i++; return this._i -1; },
      hide: function() { return GMH.Polygon.hide(this.IDs()); },
      show: function() { return GMH.Polygon.show(this.IDs()); },
      toggle: function() { return GMH.Polygon.toggle(this.IDs()); },
      delete: function() { return GMH.Polygon.delete(this.IDs()); },
      reset: function() { return GMH.Polygon.reset(this.IDs()); },
      update: function(options) { return GMH.Polygon.update(this.IDs(), options); },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.IDs(), path); },
      getBounds: function() { return GMH.Polygon.getBounds(this.IDs()); },
      getCenter: function() { return GMH.Polygon.getCenter(this.IDs()); },
      addListener: function(type, fn) { return GMH.Polygon.addListener(this.IDs(), type, fn); },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.IDs()); }
    };

    
    // Expose Public Objects
    // =======================================
    GMH.Object.Polygon = Polygon;
    GMH.Object.PolygonArray = PolygonArray;


    return GMH;
  })(GMH || {});



// ===========================================
// Data
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Data Namespace
    // =======================================
    GMH.Data = {};
    GMH.Data.Map = {};
    GMH.Data.Label = new GMH.Object.LabelArray();
    GMH.Data.Marker = new GMH.Object.MarkerArray();
    GMH.Data.Polygon = new GMH.Object.PolygonArray();
    

    return GMH;
  })(GMH || {});



// ===========================================
// Defaults
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Defaults Namespace
    // =======================================
    GMH.Defaults = {};
    

    // Object Defaults
    // =======================================
    GMH.Defaults.Map = {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false
    };

    GMH.Defaults.Label = {
      fontSize: 14,
      fontColor: "#000",
      strokeColor: '#FFF',
      strokeWeight: 1,
      align: "center"
    };

    GMH.Defaults.Marker = {};

    GMH.Defaults.Polygon = {
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#1984AE',
      fillOpacity: 0.8
    };


    // Public Methods
    // =======================================
    var setDefaults = function(type, userOptions) {
      return _execute("set", type, userOptions);
    };

    var updateDefaults = function(type, userOptions) {
      return _execute("update", type, userOptions);
    };


    // Execute
    // =======================================
    var _execute = function(action, type, userOptions) {    
      // allow type to be less sensitive
      type = GMH.Utility.getObjectType(type);
      
      var newOptions = userOptions;

      // combine user and default options
      if (action == "update") {
        newOptions = $.extend({}, GMH.Defaults[type], userOptions);
      }

      // set new defaults
      GMH.Defaults[type] = newOptions;
    };


    // Expose Public Methods
    // =======================================
    GMH.Defaults.set = setDefaults;
    GMH.Defaults.update = updateDefaults;


    return GMH;
  })(GMH || {});



// ===========================================
// Utility
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Utility Namespace
    // =======================================
    if (typeof GMH.Utility == "undefined") {
      GMH.Utility = {};
    }


    // Public Methods
    // =======================================
    var copy = function(source, exclude) {
      // make a deep copy of the source
      var src_copy = $.extend(true, {}, source);
   
      // convert exclude into an array
      if ($.type(exclude) == "object") {
        exclude = Object.keys(exclude);
      }
      else if ($.type(exclude) == "string") {
        exclude = exclude.split(",");
      }

      // get the source's prototype and convert into array
      var src_proto = Object.keys(Object.getPrototypeOf(source));
      
      // merge the src_proto and exclude arrays
      var exclude = src_proto.concat(exclude);

      // loop through array and delete ids and prototype from src_copy
      for (var i = 0, i_len = exclude.length; i < i_len; i++) {
        delete src_copy[exclude[i]];
      }

      var GMH_Obj = {};

      // create new object array based on source
      if (source.ObjectType) {
        GMH_Obj = new GMH.Object[source.ObjectType];
      }
      
      // copy into new object 
      return $.extend(GMH_Obj, src_copy);
    };

    var getIDs = function(obj) {
      var ids = Object.keys(obj);

      // remove _i from the array
      var _i = ids.indexOf("_i");
      if (_i !== -1) {
        ids.splice(_i, 1);
      }

      return ids;
    };

    var toLatLng = function(str) {
      try {
        var points = str.split(",");
        
        // return a google maps latLng object
        return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
      }
      catch (ex) {
        console.log(ex);
        return {};
      }
    };

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
      }
      catch (ex) {
        console.log(ex);
        return [];
      }
    };

    var getObjectType = function(type) {
      type = type.toLowerCase();

      switch(type) {
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
      // remove case and spaces
      type = type.toLowerCase().replace(/\s+/g, '');

      switch(type) {
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

        // ------- Marker -------
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
      };

      return type;
    };


    // Expose Public Methods
    // =======================================
    GMH.Utility.copy = copy;
    GMH.Utility.getIDs = getIDs;
    GMH.Utility.toLatLng = toLatLng;
    GMH.Utility.toLatLngArray = toLatLngArray;
    GMH.Utility.getObjectType = getObjectType;
    GMH.Utility.getEventType = getEventType;


    return GMH;
  })(GMH || {});



// ===========================================
// Label - Add
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }  


    // Public Methods
    // =======================================
    var addLabel = function(id, text, position, options) {
      return _execute(id, text, position, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, text, position, userOptions) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Label.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Label[id]) {
        throw "Error: ID already exists";
      }

      // if left null, default text to id
      text = (text == null) ? id : text;

      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // return the label object
      return _add(id, text, position, userOptions);
    };

    var _executeMulti = function(objects) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var text = objects[i].text;
        var position = objects[i].position;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? GMH.Data.Label.nextIndex() : id;

        // skip if id already exists or position is null
        if (GMH.Data.Label[id] || position == null) {
          continue;
        }

        // if left null, default text to id
        text = (text == null) ? id : text;

        // add label object to array
        var label = _add(id, text, position, options);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _add = function(id, text, position, userOptions) {
      if ($.type(position) == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Label, userOptions);

      // add map, text and position to options
      options.map = GMH.Data.Map.Obj;
      options.text = text;
      options.position = position;

      // create new google label
      var googleLabel = new GMH.Object.googleLabel(options)

      // add GMH object to google label
      googleLabel.GMH = {
        ID: id,
        Parent: function(){ return GMH.Data.Label[this.ID]; }
      };

      // create new label and save reference
      GMH.Data.Label[id] = new GMH.Object.Label(id, googleLabel);

      // save initial options
      GMH.Data.Label[id].initialOptions = options;

      // return label object
      return GMH.Data.Label[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.add = addLabel;
    

    return GMH;
  })(GMH || {});



// ===========================================
// Label - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }   


    // Public Methods
    // =======================================
    var getBounds = function(id) {
      return _execute(id);
    };

    var getCenter = function(id) {
      return getBounds(id).getCenter();
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _getBounds(id);
    };
    
    var _executeMulti = function(ids) {
      var bounds = new google.maps.LatLngBounds();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
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

      bounds.extend(GMH.Data.Label[id].Obj.position);

      return bounds;
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.getBounds = getBounds;
    GMH.Label.getCenter = getCenter;


    return GMH;
  })(GMH || {});



// ===========================================
// Label - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }   


    // Public Methods
    // =======================================
    var deleteLabel = function(id) {
      return _execute(id);
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      // return the deleted object
      return _delete(id);
    };

    var _executeMulti = function(ids) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
          continue; 
        }

        // add label object to array
        var label = _delete(id);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the object
      var label = GMH.Data.Label[id];

      // remove from map
      label.Obj.setMap(null);

      // delete the id 
      delete GMH.Data.Label[id];

      // return the object
      return label;
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.delete = deleteLabel;


    return GMH;
  })(GMH || {});



// ===========================================
// Label - Display
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }  


    // Public Methods
    // =======================================
    var toggleLabel = function(id) {
      return _execute("toggle", id);
    };

    var showLabel = function(id) {
      return _execute("show", id);
    };

    var hideLabel = function(id) {
      return _execute("hide", id);
    };


    // Execute
    // =======================================
    var _execute = function(action, id) {
      if ($.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _switch(action, id);
    };

    var _executeMulti = function(action, ids) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
          continue; 
        }

        // add label object to array
        var label = _switch(action, id);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };

    // determine which action to execute
    var _switch = function(action, id) {
      switch(action) {
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
      // check if the label is on the map
      var map = (GMH.Data.Label[id].Obj.map == null) ? GMH.Data.Map.Obj : null;

      // toggle the label's map
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


    // Expose Public Methods
    // =======================================
    GMH.Label.toggle = toggleLabel;
    GMH.Label.show = showLabel;
    GMH.Label.hide = hideLabel;
    

    return GMH;
  })(GMH || {});



// ===========================================
// Label - Reset
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }   


    // Public Methods
    // =======================================
    var resetLabel = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      // return the deleted object
      return _reset(id);
    };

    var _executeMulti = function(ids) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Label[id] == undefined) { 
          continue; 
        }

        // add label object to array
        var label = _reset(id);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _reset = function(id) {
      // get initial options
      var options = GMH.Data.Label[id].initialOptions;
      
      // return the updated object
      return GMH.Label.update(id, options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.reset = resetLabel;


    return GMH;
  })(GMH || {});



// ===========================================
// Label - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Label Namespace
    // =======================================
    if (typeof GMH.Label == "undefined") {
      GMH.Label = {};
    }  


    // Public Methods
    // =======================================
    var updateLabel = function(id, options) {
      return _executeUpdate(id, options);
    }

    var updatePosition = function(id, position) {
      return _executeUpdatePosition(id, position);
    }


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Label : options;

      // convert position into latlng
      if ($.type(options.position) == "string") {
        options.position = GMH.Utility.toLatLng(options.position);
      }

      if ($.isArray(id)) {
        return _executeUpdateMulti(id, options);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _update(id, options);
    };

    var _executeUpdateMulti = function(ids, options) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Label[id] == undefined) {
          continue;
        }

        // add label object to array
        var label = _update(id, options);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    var _executeUpdatePosition = function(id, position) {
      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // convert position into latlng
      if ($.type(position) == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      if ($.isArray(id)) {
        return _executeUpdatePositionMulti(id, position);
      }

      // check if id exists
      if (GMH.Data.Label[id] == undefined) {
        throw "Error: ID does not reference a label";
      }

      return _updatePosition(id, position);
    };

    var _executeUpdatePositionMulti = function(ids, position) {
      var labelArray = new GMH.Object.LabelArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Label[id] == undefined) {
          continue;
        }

        // add Label object to array
        var label = _updatePosition(id, position);
        labelArray[label.ID] = label;
      }

      return labelArray;
    };


    // Actions
    // =======================================
    var _update = function(id, options) {
      GMH.Data.Label[id].Obj.setOptions(options);

      return GMH.Data.Label[id];
    };

    var _updatePosition = function(id, position) {
      GMH.Data.Label[id].Obj.setOptions({"position": position});

      return GMH.Data.Label[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Label.update = updateLabel;
    GMH.Label.updatePosition = updatePosition;
    

    return GMH;
  })(GMH || {});

 

// ===========================================
// Map - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Public Methods
    // =======================================
    var setBounds = function(type, id) {
      _execute(type, id);
      return GMH.Data.Map;
    };

    var getCenter = function() {
      return GMH.Data.Map.Obj.getCenter();
    };


    // Execute
    // =======================================
    var _execute = function(type, id) {
      
      // check if an array of types is passed
      if ($.isArray(type)) {
        return _executeMulti(type);
      }

      // allow type to be less sensitive
      type = GMH.Utility.getObjectType(type);
      
      // set map bounds and zoom to it's initial value
      if (type == "initial" || type == "init") {
        GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
        GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialOptions.zoom);
        return;
      }

      // if id is null, get an array of all ids for the given type
      id = (id == null) ? GMH.Utility.getIDs(GMH.Data[type]) : id;

      // get the bounds of the id
      var bounds = _getBounds(type, id);

      // set maps bounds 
      GMH.Data.Map.Obj.fitBounds(bounds);
    };
    
    var _executeMulti = function(objects) {
      var bounds = new google.maps.LatLngBounds();

      // loop through each type object
      for (var i = 0, i_len = objects.length; i < i_len; i++) {

        // the only property in the object should be the type
        var type = Object.keys(objects[i])[0];

        // get the id(s)
        var id = objects[i][type];

        // allow type to be less sensitive
        type = GMH.Utility.getObjectType(type);

        // if id is null, get an array of all ids for the given type
        id = (id == null) ? GMH.Utility.getIDs(GMH.Data[type]) : id;

        // merge the bounds
        bounds.union(_getBounds(type, id));
      }

      // set maps bounds
      GMH.Data.Map.Obj.fitBounds(bounds); 
    };


    // Actions
    // =======================================
    var _getBounds = function(type, id) {
      
      // check if an array of ids is passed
      if ($.isArray(id)) {
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
    

    // Expose Public Methods
    // =======================================
    GMH.Map.setBounds = setBounds;
    GMH.Map.getCenter = getCenter;


    return GMH;
  })(GMH || {});



// ===========================================
// Map - Init
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";

    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Public Methods
    // =======================================
    var init = function(container, userOptions) {

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Map, userOptions);
     
      // create new google map
      var googleMap = new google.maps.Map(document.getElementById(container), options);

      // add GMH object to google map
      googleMap.GMH = {
        Parent: function() { return GMH.Data.Map; }
      };

      // create new map and save reference
      GMH.Data.Map = new GMH.Object.Map(googleMap);

      // save initial options
      GMH.Data.Map.initialOptions = options;

      // save bounds after map has finished initializing
      setTimeout(function() {
        GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
      }, 500);

      return GMH.Data.Map;
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.init = init;


    return GMH;
  })(GMH || {});



// ===========================================
// Map - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    }   


    // Public Methods
    // =======================================
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


    // Execute
    // =======================================
    var _executeAdd = function(type, fn) {
      if ($.isArray(type)) {
        return _executeAddMulti(type);
      }

      // add the listener
      _add(type, fn);
    };

    var _executeAddMulti = function(objects) {
      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the type
        var type = Object.keys(objects[i])[0];

        // get the function
        var fn = objects[i][type];
        
        // add the listener
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


    // Actions
    // =======================================
    var _add = function(type, func) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);
      google.maps.event.addListener(GMH.Data.Map.Obj, type, func);
    };

    var _removeType = function(type) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);
      google.maps.event.clearListeners(GMH.Data.Map.Obj, type);
    };

    var _removeAll = function() {
      google.maps.event.clearInstanceListeners(GMH.Data.Map.Obj);
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.addListener = addListener;
    GMH.Map.removeListenerType = removeListenerType;
    GMH.Map.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});



// ===========================================
// Map - Reset
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    }   


    // Public Methods
    // =======================================
    var resetMap = function() {
      return _reset();
    }


    // Actions
    // =======================================
    var _reset = function() {
      // get initial options
      var options = GMH.Data.Map.initialOptions;
      
      // reset the bounds
      GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);

      // return the updated object
      return GMH.Map.update(options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.reset = resetMap;


    return GMH;
  })(GMH || {});



// ===========================================
// Map - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Map Namespace
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    }  


    // Public Methods
    // =======================================
    var updateMap = function(options) {
      return _execute(options);
    }


    // Execute
    // =======================================
    var _execute = function(options) {
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Map : options;

      // convert center into latlng
      if ($.type(options.center) == "string") {
        options.center = GMH.Utility.toLatLng(options.center);
      }

      return _update(options);
    };


    // Actions
    // =======================================
    var _update = function(options) {
      GMH.Data.Map.Obj.setOptions(options);

      return GMH.Data.Map;
    };


    // Expose Public Methods
    // =======================================
    GMH.Map.update = updateMap;
    

    return GMH;
  })(GMH || {});

 

// ===========================================
// Marker - Add
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }  


    // Public Methods
    // =======================================
    var addMarker = function(id, position, options) {
      return _execute(id, position, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, position, userOptions) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Marker.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Marker[id]) {
        throw "Error: ID already exists";
      }

      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // return the marker object
      return _add(id, position, userOptions);
    };

    var _executeMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var position = objects[i].position;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? GMH.Data.Marker.nextIndex() : id;

        // skip if id already exists or position is null
        if (GMH.Data.Marker[id] || position == null) {
          continue;
        }

        // add marker object to array
        var marker = _add(id, position, options);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _add = function(id, position, userOptions) {
      if ($.type(position) == "string") {
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
        Parent: function(){ return GMH.Data.Marker[this.ID]; }
      };

      // create new marker and save reference
      GMH.Data.Marker[id] = new GMH.Object.Marker(id, googleMarker);

      // save initial options
      GMH.Data.Marker[id].initialOptions = options;

      // return marker object
      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.add = addMarker;
    

    return GMH;
  })(GMH || {});



// ===========================================
// Marker - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }   


    // Public Methods
    // =======================================
    var getBounds = function(id) {
      return _execute(id);
    };

    var getCenter = function(id) {
      return getBounds(id).getCenter();
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a marker";
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
    GMH.Marker.getCenter = getCenter;


    return GMH;
  })(GMH || {});



// ===========================================
// Marker - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Namespace
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
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a marker";
      }

      // return the deleted object
      return _delete(id);
    };

    var _executeMulti = function(ids) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _delete(id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
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
  })(GMH || {});



// ===========================================
// Marker - Display
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Marker Namespace
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
      if ($.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a Marker";
      }

      return _switch(action, id);
    };

    var _executeMulti = function(action, ids) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _switch(action, id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };

    // determine which action to execute
    var _switch = function(action, id) {
      switch(action) {
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
      GMH.Data.Marker[id].Obj.setOptions({ "visible": !state });

      return GMH.Data.Marker[id];
    };

    var _show = function(id) {
      GMH.Data.Marker[id].Obj.setOptions({ "visible": true });
      return GMH.Data.Marker[id];
    };

    var _hide = function(id) {
      GMH.Data.Marker[id].Obj.setOptions({ "visible": false });
      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.toggle = toggleMarker;
    GMH.Marker.show = showMarker;
    GMH.Marker.hide = hideMarker;
    

    return GMH;
  })(GMH || {});



// ===========================================
// Marker - Listener
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }   


    // Public Methods
    // =======================================
    var addListener = function(id, type, fn) {
      return _execute("add", id, type, fn);
    };

    var removeListenerType = function(id, type) {
      return _execute("removeType", id, type);
    };

    var removeAllListeners = function(id) {
      return _execute("removeAll", id);
    };


    // Execute
    // =======================================
    var _execute = function(action, id, type, fn) {
      // allow type to be less sensitive
      type = type ? GMH.Utility.getEventType(type) : null;

      if ($.isArray(id)) {
        return _executeAddMulti(action, id, type ,fn);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a Marker";
      }

      return _switch(action, id, type, fn);
    };

    var _executeMulti = function(action, ids, type, fn) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _switch(action, id, type, fn);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };

    var _switch = function(action, id, type, fn) {
      switch(action) {
        case "add":
          return _add(id, type, fn);

        case "removeType":
          return _removeType(id, type);

        case "removeAll":
          return _removeAll(id);
      }
    }


    // Actions
    // =======================================
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


    // Expose Public Methods
    // =======================================
    GMH.Marker.addListener = addListener;
    GMH.Marker.removeListenerType = removeListenerType;
    GMH.Marker.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});



// ===========================================
// Marker - Reset
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }   


    // Public Methods
    // =======================================
    var resetMarker = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a marker";
      }

      // return the deleted object
      return _reset(id);
    };

    var _executeMulti = function(ids) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _reset(id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _reset = function(id) {
      // get initial options
      var options = GMH.Data.Marker[id].initialOptions;
      
      // return the updated object
      return GMH.Marker.update(id, options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.reset = resetMarker;


    return GMH;
  })(GMH || {});



// ===========================================
// Marker - Update
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Marker Namespace
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }  


    // Public Methods
    // =======================================
    var updateMarker = function(id, options) {
      return _executeUpdate(id, options);
    }

    var updatePosition = function(id, position) {
      return _executeUpdatePosition(id, position);
    }


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Marker : options;

      // convert position into latlng
      if ($.type(options.position) == "string") {
        options.position = GMH.Utility.toLatLng(options.position);
      }

      if ($.isArray(id)) {
        return _executeUpdateMulti(id, options);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a marker";
      }

      return _update(id, options);
    };

    var _executeUpdateMulti = function(ids, options) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // add marker object to array
        var marker = _update(id, options);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeUpdatePosition = function(id, position) {
      // check if position is supplied
      if (position == null) {
        throw "Error: Must supply a position";
      }

      // convert position into latlng
      if ($.type(position) == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      if ($.isArray(id)) {
        return _executeUpdatePositionMulti(id, position);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        throw "Error: ID does not reference a Marker";
      }

      return _updatePosition(id, position);
    };

    var _executeUpdatePositionMulti = function(ids, position) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // add marker object to array
        var marker = _updatePosition(id, position);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _update = function(id, options) {
      GMH.Data.Marker[id].Obj.setOptions(options);

      return GMH.Data.Marker[id];
    };

    var _updatePosition = function(id, position) {
      GMH.Data.Marker[id].Obj.setOptions({"position": position});

      return GMH.Data.Marker[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Marker.update = updateMarker;
    GMH.Marker.updatePosition = updatePosition;
    

    return GMH;
  })(GMH || {});

 

// ===========================================
// Polygon - Add
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
    var addPolygon = function(id, path, options) {
      return _execute(id, path, options);
    };


    // Execute
    // =======================================
    var _execute = function(id, path, userOptions) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Polygon.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Polygon[id] || id == "_i") {
        throw "Error: ID already exists";
      }

      // check if path is supplied
      if (path == null) {
        throw "Error: Must supply a path";
      }

      // return the polygon object
      return _add(id, path, userOptions);
    };

    var _executeMulti = function(objects) {
      var polygonArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var path = objects[i].path;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? GMH.Data.Polygon.nextIndex() : id;

        // skip if id already exists or path is null
        if (GMH.Data.Polygon[id] || path == null) {
          continue;
        }

        // add polygon object to array
        var polygon = _add(id, path, options);
        polygonArray[polygon.ID] = polygon;
      }

      return polygonArray;
    };


    // Actions
    // =======================================
    var _add = function(id, path, userOptions) {
      if ($.type(path) == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Polygon, userOptions);

      // add map and path to options
      options.map = GMH.Data.Map.Obj;
      options.paths = path;

      // create new google Polygon
      var googlePolygon = new google.maps.Polygon(options);

      // add GMH object to google polygon
      googlePolygon.GMH = {
        ID: id,
        Parent: function(){ return GMH.Data.Polygon[this.ID]; }
      };

      // create new polygon and save reference
      GMH.Data.Polygon[id] = new GMH.Object.Polygon(id, googlePolygon);

      // save initial options
      GMH.Data.Polygon[id].initialOptions = options;

      // return polygon object
      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.add = addPolygon;
    

    return GMH;
  })(GMH || {});



// ===========================================
// Polygon - Bounds
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
    var getBounds = function(id) {
      return _execute(id);
    };

    var getCenter = function(id) {
      return getBounds(id).getCenter();
    };


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a polygon";
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
    GMH.Polygon.getCenter = getCenter;


    return GMH;
  })(GMH || {});







// ===========================================
// Polygon - Delete
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
    var deletePolygon = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }

      // return the deleted object
      return _delete(id);
    };

    var _executeMulti = function(ids) {
      var polygonArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var polygon = _delete(id);
        polygonArray[polygon.ID] = polygon;
      }

      return polygonArray;
    };


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the object
      var polygon = GMH.Data.Polygon[id];

      // remove from map
      polygon.Obj.setMap(null);

      // delete the id 
      delete GMH.Data.Polygon[id];

      // return the object
      return polygon;
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});



// ===========================================
// Polygon - Display
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
      if ($.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }

      return _switch(action, id);
    };

    var _executeMulti = function(action, ids) {
      var polygonArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var polygon = _switch(action, id);
        polygonArray[polygon.ID] = polygon;
      }

      return polygonArray;
    };

    // determine which action to execute
    var _switch = function(action, id) {
      switch(action) {
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
      GMH.Data.Polygon[id].Obj.setOptions({ "visible": !state });

      return GMH.Data.Polygon[id];
    };

    var _show = function(id) {
      GMH.Data.Polygon[id].Obj.setOptions({ "visible": true });
      return GMH.Data.Polygon[id];
    };

    var _hide = function(id) {
      GMH.Data.Polygon[id].Obj.setOptions({ "visible": false });
      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.toggle = togglePolygon;
    GMH.Polygon.show = showPolygon;
    GMH.Polygon.hide = hidePolygon;
    

    return GMH;
  })(GMH || {});



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
      return _execute("add", id, type, fn);
    };

    var removeListenerType = function(id, type) {
      return _execute("removeType", id, type);
    };

    var removeAllListeners = function(id) {
      return _execute("removeAll", id);
    };


    // Execute
    // =======================================
    var _execute = function(action, id, type, fn) {
      // allow type to be less sensitive
      type = type ? GMH.Utility.getEventType(type) : null;

      if ($.isArray(id)) {
        return _executeMulti(action, id, type, fn);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }

      return _switch(action, id, type, fn);
    };

    var _executeMulti = function(action, ids, type, fn) {
      var polygonArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var polygon = _switch(action, id, type, fn);
        polygonArray[polygon.ID] = polygon;
      }

      return polygonArray;
    };

    var _switch = function(action, id, type, fn) {
      switch(action) {
        case "add":
          return _add(id, type, fn);

        case "removeType":
          return _removeType(id, type);

        case "removeAll":
          return _removeAll(id);
      }
    }


    // Actions
    // =======================================
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


    // Expose Public Methods
    // =======================================
    GMH.Polygon.addListener = addListener;
    GMH.Polygon.removeListenerType = removeListenerType;
    GMH.Polygon.removeAllListeners = removeAllListeners;


    return GMH;
  })(GMH || {});



// ===========================================
// Polygon - Reset
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
    var resetPolygon = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if ($.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }

      // return the deleted object
      return _reset(id);
    };

    var _executeMulti = function(ids) {
      var polygonArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var polygon = _reset(id);
        polygonArray[polygon.ID] = polygon;
      }

      return polygonArray;
    };


    // Actions
    // =======================================
    var _reset = function(id) {
      // get initial options
      var options = GMH.Data.Polygon[id].initialOptions;
      
      // return the updated object
      return GMH.Polygon.update(id, options);
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.reset = resetPolygon;


    return GMH;
  })(GMH || {});



// ===========================================
// Polygon - Update
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
    var updatePolygon = function(id, options) {
      return _executeUpdate(id, options);
    };

    var updatePath = function(id, path) {
      return _executeupdatePath(id, path);
    };


    // Execute
    // =======================================
    var _executeUpdate = function(id, options) {
      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Polygon : options;

      // convert path into latlng array
      if ($.type(options.path) == "string") {
        options.path = GMH.Utility.toLatLngArray(options.path);
      }

      if ($.isArray(id)) {
        return _executeUpdateMulti(id, options);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }
      
      return _update(id, options);
    };

    var _executeUpdateMulti = function(ids, options) {
      var polygonArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var polygon = _update(id, options);
        polygonArray[polygon.ID] = polygon;
      }

      return polygonArray;
    };


    var _executeupdatePath = function(id, path) {
      // check if path is supplied
      if (path == null) {
        throw "Error: Must supply a path";
      }

      // convert path to latlng array
      if ($.type(path) == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      if ($.isArray(id)) {
        return _executeupdatePathMulti(id, path);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        throw "Error: ID does not reference a Polygon";
      }

      return _updatePath(id, path);
    };

    var _executeupdatePathMulti = function(ids, path) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var poly = _updatePath(id, path);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    // Actions
    // =======================================
    var _update = function(id, options) {
      GMH.Data.Polygon[id].Obj.setOptions(options);
      return GMH.Data.Polygon[id];
    };

    var _updatePath = function(id, path) {
      GMH.Data.Polygon[id].Obj.setOptions({"paths": path});
      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});

 