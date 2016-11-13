
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


    // Extend
    // =======================================
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
            if ( deep && copy && ( jQuery.isPlainObject( copy ) ||
              ( copyIsArray = jQuery.isArray( copy ) ) ) ) {

              if ( copyIsArray ) {
                copyIsArray = false;
                clone = src && jQuery.isArray( src ) ? src : [];

              } else {
                clone = src && jQuery.isPlainObject( src ) ? src : {};
              }

              // Never move original objects, clone them
              target[ name ] = jQuery.extend( deep, clone, copy );

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
      setBounds: function(type, id) { return GMH.Map.setBounds(type, id) },
      addListener: function(type, fn) { return GMH.Map.addListener(type, fn) },
      removeListenerType: function(type) { return GMH.Map.removeListenerType(type) },
      removeAllListeners: function() { return GMH.Map.removeAllListeners() }
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
      hide: function() { return GMH.Marker.hide(this.ID); },
      show: function() { return GMH.Marker.show(this.ID); },
      toggle: function() { return GMH.Marker.toggle(this.ID); },
      delete: function() { return GMH.Marker.delete(this.ID); },
      update: function(options) { return GMH.Marker.update(this.ID, options); },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.ID, position); },
      getBounds: function() { return GMH.Marker.getBounds(this.ID); },
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
      nextIndex: function() { this._i++; return this._i -1; },
      IDs: function() { return GMH.Utility.getIDs(this); },
      hide: function() { return GMH.Marker.hide(this.IDs()); },
      show: function() { return GMH.Marker.show(this.IDs()); },
      toggle: function() { return GMH.Marker.toggle(this.IDs()); },
      delete: function() { return GMH.Marker.delete(this.IDs()); },
      getBounds: function() { return GMH.Marker.getBounds(this.IDs()); },
      update: function(options) { return GMH.Marker.update(_buildUpdateObjects(this.IDs(), options)); },
      addListener: function(type, fn) { return GMH.Marker.addListener(_buildListenerObjects(this.IDs(), type, fn)); },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.IDs()); }
    };

    
    // Utility Functions
    // =======================================
    var _buildUpdateObjects = function(ids, options) { 
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var obj = {};
        obj[ids[i]] = options;

        objArray.push(obj);
      }

      return objArray;
    };

    var _buildListenerObjects = function(ids, type, fn) {
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        objArray.push({ "id": ids[i], "type": type, "fn": fn });
      }

      return objArray;
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
      hide: function() { return GMH.Polygon.hide(this.ID); },
      show: function() { return GMH.Polygon.show(this.ID); },
      toggle: function() { return GMH.Polygon.toggle(this.ID); },
      delete: function() { return GMH.Polygon.delete(this.ID); },
      update: function(options) { return GMH.Polygon.update(this.ID, options); },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.ID, path); },
      getBounds: function() { return GMH.Polygon.getBounds(this.ID); },
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
      nextIndex: function() { this._i++; return this._i -1; },
      IDs: function() { return GMH.Utility.getIDs(this); },
      hide: function() { return GMH.Polygon.hide(this.IDs()); },
      show: function() { return GMH.Polygon.show(this.IDs()); },
      toggle: function() { return GMH.Polygon.toggle(this.IDs()); },
      delete: function() { return GMH.Polygon.delete(this.IDs()); },
      getBounds: function() { return GMH.Polygon.getBounds(this.IDs()); },
      update: function(options) { return GMH.Polygon.update(_buildUpdateObjects(this.IDs(), options)); },
      addListener: function(type, fn) { return GMH.Polygon.addListener(_buildListenerObjects(this.IDs(), type, fn)); },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.IDs()); }
    };

    
    // Utility Functions
    // =======================================
    var _buildUpdateObjects = function(ids, options) { 
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var obj = {};
        obj[ids[i]] = options;

        objArray.push(obj);
      }

      return objArray;
    };

    var _buildListenerObjects = function(ids, type, fn) {
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        objArray.push({ "id": ids[i], "type": type, "fn": fn });
      }

      return objArray;
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
      mapTypeId: google.maps.MapTypeId.ROADMAP
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
    GMH.Utility.getIDs = getIDs;
    GMH.Utility.toLatLng = toLatLng;
    GMH.Utility.toLatLngArray = toLatLngArray;
    GMH.Utility.getObjectType = getObjectType;
    GMH.Utility.getEventType = getEventType;


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


    // Execute
    // =======================================
    var _execute = function(type, id) {
      
      // check if an array of types is passed
      if (Array.isArray(type)) {
        return _executeMulti(type);
      }

      // allow type to be less sensitive
      type = GMH.Utility.getObjectType(type);
      
      // set map bounds and zoom to it's initial value
      if (type == "initial" || type == "init") {
        GMH.Data.Map.Obj.fitBounds(GMH.Data.Map.initialBounds);
        GMH.Data.Map.Obj.setZoom(GMH.Data.Map.initialZoom);
        return;
      }

      // if id is null, get an array of all ids for the given type
      id = (id == null) ? GMH.Utility.getIDs(GMH.Data[type]) : id;

      // get the bounds of the id
      var bounds = _getBounds(type, id);

      // set maps bounds 
      GMH.Data.Map.Obj.fitBounds(bounds);
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
    

    // Expose Public Methods
    // =======================================
    GMH.Map.setBounds = setBounds;


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

      // save bounds after map has finished initializing
      setTimeout(function() {
        GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
        GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
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
      if (Array.isArray(type)) {
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

      // check if array of types is passed
      if (Array.isArray(type)) {
        return _executeRemoveTypeMulti(type);
      }

      _removeType(type);
    };

    var _executeRemoveTypeMulti = function(types) {
      for (var i = 0, i_len = types.length; i < i_len; i++) {
        var type = types[i];

        _removeType(type); 
      }
    };


    // Actions
    // =======================================
    var _add = function(type, func) {
      try {
        // allow type to be less sensitive
        type = GMH.Utility.getEventType(type);

        google.maps.event.addListener(GMH.Data.Map.Obj, type, func);
      }
      catch (ex) {
        
      }
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
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Marker.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Marker[id]) {
        return console.log("ERROR: ID already exists");
      }

      // check if position is supplied
      if (position == null) {
        return console.log("ERROR: Must supply a position");
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
        Parent: function(){ return GMH.Data.Marker[this.ID]; }
      };

      // create new marker and save reference
      GMH.Data.Marker[id] = new GMH.Object.Marker(id, googleMarker);

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


    // Execute
    // =======================================
    var _execute = function(id) {
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
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
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
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
      if (Array.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a Marker");
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
        return console.log("ERROR: ID does not reference a Marker");
      }

      return _add(id, type, fn);
    };

    var _executeAddMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var type = objects[i].type;
        var fn = objects[i].fn;
        
        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) { 
          continue; 
        }

        // add marker object to array
        var marker = _add(id, type, fn);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeRemoveType = function(id, type) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveTypeMulti(id, type);
      }

      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
      }

      return _removeType(id, type);
    };

    var _executeRemoveTypeMulti = function(ids, type) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // add marker object to array
        var marker = _removeType(id, type);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeRemoveAll = function(id) {
      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveAllMulti(id);
      }

      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
      }

      return _removeAll(id);
    };

    var _executeRemoveAllMulti = function(ids) {
      var markerArray = new GMH.Object.MarkerArray();
      
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }
       
        // add marker object to array
        var marker = _removeAll(id);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    // Actions
    // =======================================
    var _add = function(id, type, fn) {
      try {
        // allow type to be less sensitive
        type = GMH.Utility.getEventType(type);

        google.maps.event.addListener(GMH.Data.Marker[id].Obj, type, fn);

        return GMH.Data.Marker[id];
      }
      catch (ex) {
        
      }
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
      if (Array.isArray(id)) {
        return _executeUpdateMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a marker");
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Marker : options;

      return _update(id, options);
    };

    var _executeUpdateMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // get the options
        var options = objects[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Marker : options;

        // add marker object to array
        var marker = _update(id, options);
        markerArray[marker.ID] = marker;
      }

      return markerArray;
    };


    var _executeUpdatePosition = function(id, position) {
      if (Array.isArray(id)) {
        return _executeUpdatePositionMulti(id);
      }

      // check if id exists
      if (GMH.Data.Marker[id] == undefined) {
        return console.log("ERROR: ID does not reference a Marker");
      }

      // check if position is supplied
      if (position == null) {
        return console.log("ERROR: Must supply a position");
      }

      return _updatePosition(id, position);
    };

    var _executeUpdatePositionMulti = function(objects) {
      var markerArray = new GMH.Object.MarkerArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Marker[id] == undefined) {
          continue;
        }

        // get the position
        var position = objects[i][id];

        // skip over if position is null
        if (position == null) {
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
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? GMH.Data.Polygon.nextIndex() : id;

      // check if id already exists
      if (GMH.Data.Polygon[id]) {
        return console.log("ERROR: ID already exists");
      }

      // check if path is supplied
      if (path == null) {
        return console.log("ERROR: Must supply a path");
      }

      // return the polygon object
      return _add(id, path, userOptions);
    };

    var _executeMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

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
        var poly = _add(id, path, options);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
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
        Parent: function(){ return GMH.Data.Polygon[this.ID]; }
      };

      // create new polygon and save reference
      GMH.Data.Polygon[id] = new GMH.Object.Polygon(id, googlePolygon);

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
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a polygon");
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
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      // return the deleted object
      return _delete(id);
    };

    var _executeMulti = function(ids) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var poly = _delete(id);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
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
      if (Array.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _switch(action, id);
    };

    var _executeMulti = function(action, ids) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var poly = _switch(action, id);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
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
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _add(id, type, fn);
    };

    var _executeAddMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var type = objects[i].type;
        var fn = objects[i].fn;
        
        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        var poly = _add(id, type, fn);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    var _executeRemoveType = function(id, type) {
      // allow type to be less sensitive
      type = GMH.Utility.getEventType(type);

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveTypeMulti(id, type);
      }

      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _removeType(id, type);
    };

    var _executeRemoveTypeMulti = function(ids, type) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var poly = _removeType(id, type);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    var _executeRemoveAll = function(id) {

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _executeRemoveAllMulti(id);
      }

      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      return _removeAll(id);
    };

    var _executeRemoveAllMulti = function(ids) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip over ids that dont exist
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var poly = _removeAll(id);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    // Actions
    // =======================================
    var _add = function(id, type, func) {
      try {
        // allow type to be less sensitive
        type = GMH.Utility.getEventType(type);

        google.maps.event.addListener(GMH.Data.Polygon[id].Obj, type, func);

        return GMH.Data.Polygon[id];
      }
      catch (ex) {
        
      }
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
      if (Array.isArray(id)) {
        return _executeUpdateMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Polygon : options;

      return _update(id, options);
    };

    var _executeUpdateMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // get the options
        var options = objects[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Polygon : options;

        // add polygon object to array
        var poly = _update(id, options);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
    };


    var _executeupdatePath = function(id, path) {
      if (Array.isArray(id)) {
        return _executeupdatePathMulti(id);
      }

      // check if id exists
      if (GMH.Data.Polygon[id] == undefined) {
        return console.log("ERROR: ID does not reference a Polygon");
      }

      // check if path is supplied
      if (path == null) {
        return console.log("ERROR: Must supply a path");
      }

      return _updatePath(id, path);
    };

    var _executeupdatePathMulti = function(objects) {
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(objects[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // get the path
        var path = objects[i][id];

        // skip over if path is null
        if (path == null) {
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
      GMH.Data.Polygon[id].Obj.setOptions({"path": path});

      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});

 