
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
// Data
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Data Class
    // =======================================
    GMH.Data = {};
    GMH.Data.Map = {};
    GMH.Data.Polygons = {};


    return GMH;
  })(GMH || {});


// ===========================================
// Defaults
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Default Class
    // =======================================
    GMH.Defaults = {};
    

    // Map Defaults
    // =======================================
    GMH.Defaults.Map = {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP
    }


    // Polygon Defaults
    // =======================================
    GMH.Defaults.Polygon = {
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#1984AE',
      fillOpacity: 0.8
    }


    // Set Defaults
    // =======================================
    var setDefaults = function(type, userOptions) {
      return _changeDefaults("set", type, userOptions);
    }


    // Update Defaults
    // =======================================
    var updateDefaults = function(type, userOptions) {
      return _changeDefaults("update", type, userOptions);
    }


    // Change Defaults
    // =======================================
    var _changeDefaults = function(action, type, userOptions) {    
      type = _getType(type);
      
      var newOptions = userOptions;

      if (action == "update") {
        // get defaults
        var defaults = GMH.Defaults[type];

        // combine user and default options
        newOptions = $.extend({}, defaults, userOptions);
      }

      // set new defaults
      GMH.Defaults[type] = newOptions;
    }


    // Get Type
    // =======================================
    // allow type to be case and plural insensitive
    var _getType = function(type) {
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
      }

      return type;
    }


    // Public Methods
    // =======================================
    GMH.Defaults.set = setDefaults;
    GMH.Defaults.update = updateDefaults;


    return GMH;
  })(GMH || {});






// ===========================================
// Extensions - Polygon
// ===========================================

  !(function() {
    "use strict";

    // Get Bounds
    // =======================================
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      
      // loop through each path
      for (var i = 0, i_len = paths.length; i < i_len; i++) {
        var path = paths.getAt(i);

        // loop through all points in path
        for (var j = 0, j_len = path.getLength(); j < j_len; j++) {
          bounds.extend(path.getAt(j));
        }
      }

      return bounds;
    }

  })();




  

// ===========================================
// Utility
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Utility Class
    // =======================================
    if (typeof GMH.Utility == "undefined") {
      GMH.Utility = {};
    }


    // To LatLng Array
    // =======================================
    var toLatLngArray = function(str) {
      try {
        var latLngArray = [];

        // split the string into an array of coordinatePairs
        var coordPairs = str.split("|");

        for (var i = 0, i_len = coordPairs.length; i < i_len; i++) {
          var points = coordPairs[i].split(",");
          
          // create a latLng object
          var latLng = { lat: parseFloat(points[0]), lng: parseFloat(points[1]) };

          // add to latLngArray
          latLngArray.push(latLng);
        }

        return latLngArray;
      }
      catch (ex) {
        console.log(ex);
        return [];
      }
    }


    // Public Methods
    // =======================================
    GMH.Utility.toLatLngArray = toLatLngArray;


    return GMH;
  })(GMH || {});






// ===========================================
// Map - Bounds
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Map Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Set Bounds
    // =======================================
    var setBounds = function(type, id) {
      return _execute(type, id);
    }


    // Execute
    // =======================================
    var _execute = function(type, id) {
      // check if array of types is passed
      if (Array.isArray(type)) {
        return _executeMultiTypes(type);
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
      id = (id == null) ? _getIDs(type) : id;

      // get the bounds of the id
      var bounds = _getBounds(type, id);

      // set maps bounds 
      GMH.Data.Map.Obj.fitBounds(bounds);

      return GMH.Data.Map;
    }

    var _executeMultiTypes = function(typeObjects) {
      var bounds = new google.maps.LatLngBounds();

      // loop through each type object
      for (var i = 0, i_len = typeObjects.length; i < i_len; i++) {

        // the only property in the object should be the type
        var type = Object.keys(typeObjects[i])[0];

        // get the id(s)
        var id = typeObjects[i][type];

        // format the type
        type = _getType(type);

        // if id is null, get an array of all ids for the given type
        id = (id == null) ? _getIDs(type) : id;

        // merge the bounds
        bounds.union(_getBounds(type, id));
      }

      // set maps bounds
      GMH.Data.Map.Obj.fitBounds(bounds); 

      return GMH.Data.Map;
    }


    // Get Bounds
    // =======================================
    var _getBounds = function(type, id) {

      // check if array of ids is passed
      if (Array.isArray(id)) {
        return _getBoundsMulti(type, id);
      }

      // return empty bounds if id doesn't match
      if (GMH.Data[type][id] == null) { 
        return new google.map.LatLngBounds(); 
      }

      // return the bounds of the id
      return GMH.Data[type][id].Obj.getBounds();
    }

    var _getBoundsMulti = function(type, ids) {
      var bounds = new google.maps.LatLngBounds();
      
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
          
        // skip over ids that aren't found
        if (GMH.Data[type][id] == null) {
          continue; 
        }

        // merge bounds
        bounds.union(GMH.Data[type][id].Obj.getBounds());
      }

      return bounds;
    }
    

    // Get Type
    // =======================================
    // allow type to be case and plural insensitive
    var _getType = function(type) {
      type = type.toLowerCase();

      switch(type) {
        case "polygon":
          type = "Polygons";
          break;

        case "polygons":
          type = "Polygons";
          break;
      }

      return type;
    }


    // Get Ids
    // =======================================
    // get an array of all the ids for the given data type
    var _getIDs = function(type) {
      var ids = {};
      ids = Object.keys(GMH.Data[type]);

      // remove _index from the array
      ids.splice(ids.indexOf("_index"), 1);

      return ids;
    }


    // Public Methods
    // =======================================
    GMH.Map.setBounds = setBounds;


    return GMH;
  })(GMH || {});



    


// ===========================================
// Map - Init
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Data Map Object
    // =======================================
    var Map = function(obj) {
      this.Obj = obj;
    }

    Map.prototype = {
      setBounds: function(type, id) { return GMH.Map.setBounds(type, id) }
    }


    // GMH Map Object
    // =======================================
    if (typeof GMH.Map == "undefined") {
      GMH.Map = {};
    } 


    // Init Map
    // =======================================
    var initMap = function(container, userOptions) {
      // get default options
      var defaults = $.extend({}, {}, GMH.Defaults.Map); 

      // combine user and default options
      var options = $.extend({}, defaults, userOptions)
     
      // create new google map
      var googleMap = new google.maps.Map(document.getElementById(container), options);

      // add GMH object to google map
      googleMap.GMH = {
        Parent: function() { return GMH.Data.Map; }
      }

      // create new map and save reference
      GMH.Data.Map = new Map(googleMap);

      // save bounds after map has finished initializing
      setTimeout(function() {
        GMH.Data.Map.initialBounds = GMH.Data.Map.Obj.getBounds();
        GMH.Data.Map.initialZoom = GMH.Data.Map.Obj.getZoom();
      }, 500);

      return GMH.Data.Map;
    }


    // Public Methods
    // =======================================
    GMH.Map.init = initMap;


    return GMH;
  })(GMH || {});







// ===========================================
// Polygon - Add
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Data Polygon Object
    // =======================================
    var Polygon = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    }

    Polygon.prototype = {
      hide: function() { return GMH.Polygon.hide(this.ID) },
      show: function() { return GMH.Polygon.show(this.ID) },
      toggle: function() { return GMH.Polygon.toggle(this.ID) },
      update: function(options) { return GMH.Polygon.update(this.ID, options) },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.ID, path) },
      delete: function() { return GMH.Polygon.delete(this.ID) },
      addListener: function(type, func) { return GMH.Polygon.addListener(this.ID, type, func) },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.ID, type) },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.ID) }
    }


    // GMH Polygon Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Add Polygon
    // =======================================
    var addPolygon = function(id, path, options) {
      return _execute(id, path, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, path, userOptions) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // default id to next index in the Polygons object
      id = (id == null) ? _getIndex() : id;

      // check if id already exists
      if (GMH.Data.Polygons[id]) {
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
    }

    var _executeMulti = function(polygons) {
      var polyArray = [];

      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        var id = polygons[i].id;
        var path = polygons[i].path;
        var options = polygons[i].options;

        // default id to next index in the Polygons object
        id = (id == null) ? _getIndex() : id;

        // skip if id already exists or path is null
        if (GMH.Data.Polygons[id] || path == null) {
          continue;
        }

        // add polygon object to array
        polyArray.push(_add(id, path, options));
      }

      return polyArray;
    }


    // Actions
    // =======================================
    var _add = function(id, path, userOptions) {
      // convert the path if it is a string
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Polygon, userOptions);

      // add path to options
      options.paths = path;

      // create new google polygon
      var googlePolygon = new google.maps.Polygon(options);

      // add GMH object to google polygon
      googlePolygon.GMH = {
        ID: id,
        Parent: function(){ return GMH.Data.Polygons[this.ID] }
      };

      // save polygon in Data.Polygons object
      GMH.Data.Polygons[id] = new Polygon(id, googlePolygon);

      // add polygon to map
      googlePolygon.setMap(GMH.Data.Map.Obj);

      // return Data.Polygons object
      return GMH.Data.Polygons[id];
    }


    // Get Index
    // =======================================
    // create an index variable for auto creating an id
    GMH.Data.Polygons._index = 0;
    var _getIndex = function() {
      var i = GMH.Data.Polygons._index;

      // increment the index
      GMH.Data.Polygons._index++;

      return i;
    }


    // Public Methods
    // =======================================
    GMH.Polygon.add = addPolygon;
    

    return GMH;
  })(GMH || {});




  

// ===========================================
// Polygon - Delete
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Polygon Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Delete Polygon
    // =======================================
    var deletePolygon = function(id) {
      return _execute(id);
    }


    // Execute
    // =======================================
    var _execute = function(id) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // return the deleted polygon
      return _delete(id);
    }

    var _executeMulti = function(ids) {
      var polyArray = [];

      // loop through each id
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont match an existing polygon
        if (GMH.Data.Polygons[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        polyArray.push(_delete(id));
      }

      return polyArray;
    }


    // Actions
    // =======================================
    var _delete = function(id) {
      // get the polygon object
      var poly = GMH.Data.Polygons[id];

      // remove polygon from map
      poly.Obj.setMap(null);

      // delete the id from Data.Polygons
      delete GMH.Data.Polygons[id];

      // return the polygon object
      return poly;
    }


    // Public Methods
    // =======================================
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMH || {});







// ===========================================
// Polygon - Display
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // GMH Polygon Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Toggle Polygon
    // =======================================
    var togglePolygon = function(id) {
      return _execute("toggle", id);
    }


    // Show Polygon
    // =======================================
    var showPolygon = function(id) {
      return _execute("show", id);
    }


    // Hide Polygon
    // =======================================
    var hidePolygon = function(id) {
      return _execute("hide", id);
    }


    // Execute
    // =======================================
    var _execute = function(action, id) {
      if (Array.isArray(id)) {
        return _executeMulti(action, id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      return _switch(action, id);
    }

    var _executeMulti = function(action, ids) {
      var polyArray = [];

      // loop through each id
      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];
        
        // skip over ids that dont match an existing polygon
        if (GMH.Data.Polygons[id] == undefined) { 
          continue; 
        }

        // add polygon object to array
        polyArray.push(_switch(action, id));
      }

      return polyArray;
    }

    var _switch = function(action, id) {
      switch(action) {
        case "toggle":
          return _toggle(id);

        case "show":
          return _show(id);

        case "hide":
          return _hide(id);
      }
    }


    // Actions
    // =======================================
    var _toggle = function(id) {
      // get the current visibility
      var state = GMH.Data.Polygons[id].Obj.getVisible();

      // toggle the polygon's visibility
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": !state });

      return GMH.Data.Polygons[id];
    }

    var _show = function(id) {
      // show the polygon
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": true });

      return GMH.Data.Polygons[id];
    }

    var _hide = function(id) {
      // hide the polygon
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": false });

      return GMH.Data.Polygons[id];
    }


    // Public Methods
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
  
    // GMH Polygon Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }   


    // Add Listener
    // =======================================
    var addListener = function(id, type, fn) {
      return _executeAdd(id, type, fn);
    }


    // Remove Listener Type
    // =======================================
    var removeListenerType = function(id, type) {
      // allow type to be less sensitive
      type = _getType(type);

      if (Array.isArray(id)) {
        // loop through each id
        for (var i = 0, i_len = id.length; i < i_len; i++) {
          // check if id matches a polygon
          if (GMH.Data.Polygons[id] == undefined) {
            continue;
          }

          _removeType(id[i], type); 
        }
        return;
      }

      _removeType(id, type);
    }


    // Remove All Listeners
    // =======================================
    var removeAllListeners = function(id) {

      if (Array.isArray(id)) {
        // loop through each id
        for (var i = 0, i_len = id.length; i < i_len; i++) {
          // check if id matches a polygon
          if (GMH.Data.Polygons[id] == undefined) {
            continue;
          }

          _removeAll(id[i]); 
        }
        return;
      }

      _removeAll(id);
    }


    // Execute
    // =======================================
    var _executeAdd = function(id, type, fn) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeAddMulti(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // allow type to be less sensitive
      type = _getType(type);

      return _add(id, type, fn);
    }

    var _executeAddMulti = function(polygons) {
      var listenerArray = [];

      // loop through each object
      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        var id = polygons[i].id;
        var type = _getType(polygons[i].type);
        var fn = polygons[i].fn;
        
        // skip over ids that dont match an existing polygon
        if (GMH.Data.Polygons[id] == undefined) { 
          continue; 
        }

        listenerArray.push(_add(id, type, fn));
      }

      return listenerArray;
    }


    // Actions
    // =======================================
    var _add = function(id, type, func) {
      try {
        return google.maps.event.addListener(GMH.Data.Polygons[id].Obj, type, func);
      }
      catch (ex) {
        
      }
    }

    var _removeType = function(id, type) {
      google.maps.event.clearListeners(GMH.Data.Polygons[id].Obj, type);
    }

    var _removeAll = function(id) {
      google.maps.event.clearInstanceListeners(GMH.Data.Polygons[id].Obj);
    }


    // Get Type
    // =======================================
    var _getType = function(type) {
      // remove case and spaces
      type = type.toLowerCase().replace(/\s+/g, '');

      switch(type) {
        case "doubleclick":
          type = "dblclick";
          break;
      }

      return type;
    }


    // Public Methods
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

    // GMH Polygon Object
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Update Polygon
    // =======================================
    var updatePolygon = function(id, options) {
      return _executeUpdate(id, options);
    }


    // Update Path
    // =======================================
    var updatePath = function(id, path) {
      return _executeUpdatePath(id, path);
    }


    // Execute Update
    // =======================================
    var _executeUpdate = function(id, options) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMultiUpdate(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // if options is null, get default options
      options = (options == null) ? GMH.Defaults.Polygon : options;

      return _update(id, options);
    }

    var _executeMultiUpdate = function(polygons) {
      var polyArray = [];

      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(polygons[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygons[id] == undefined) {
          continue;
        }

        // get the options
        var options = polygons[i][id];

        // if options are null, get default options
        options = (options == null) ? GMH.Defaults.Polygon : options;

        // add polygon object to array
        polyArray.push(_update(id, options));
      }

      return polyArray;
    }


    // Execute Update Path
    // =======================================
    var _executeUpdatePath = function(id, path) {
      // check if array is passed
      if (Array.isArray(id)) {
        return _executeMultiUpdatePath(id);
      }

      // check if id matches a polygon
      if (GMH.Data.Polygons[id] == undefined) {
        console.log("ERROR: ID does not reference a polygon");
        return;
      }

      // check if path is supplied
      if (path == null) {
        console.log("ERROR: Must supply a path");
        return;
      }

      return _updatePath(id, path);
    }

    var _executeMultiUpdatePath = function(polygons) {
      var polyArray = [];

      for (var i = 0, i_len = polygons.length; i < i_len; i++) {
        
        // the only property in the object should be the id
        var id = Object.keys(polygons[i])[0];

        // skip if id doesnt exists
        if (GMH.Data.Polygons[id] == undefined) {
          continue;
        }

        // get the path
        var path = polygons[i][id];

        // skip over if  path is null
        if (path == null) {
          continue;
        }

        // add polygon object to array
        polyArray.push(_updatePath(id, path));
      }

      return polyArray;
    }


    // Actions
    // =======================================
    var _update = function(id, options) {
      // convert the path if it is a string
      if (typeof options.path == "string") {
        options.path = GMH.Utility.toLatLngArray(options.path);
      }
      
      // update polygon with new options
      GMH.Data.Polygons[id].Obj.setOptions(options);

      return GMH.Data.Polygons[id];
    }

    var _updatePath = function(id, path) {
      // convert the path if it is a string
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // update the polygons path
      GMH.Data.Polygons[id].Obj.setOptions({"paths": path});

      return GMH.Data.Polygons[id];
    }


    // Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});




  