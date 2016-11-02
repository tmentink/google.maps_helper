
// ===========================================
// Data
// ===========================================
  
  var GMapsHelper = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    GMH.Data = {};
    GMH.Data.Map;
    GMH.Data.Polygons = {};


    return GMH;
  })(GMapsHelper || {});


// ===========================================
// Utility
// ===========================================
  
  var GMapsHelper = (function(GMH) {
    "use strict";
  
    // Google Maps Helper Object
    // =======================================
    GMH.Utility = {};


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
  })(GMapsHelper || {});


// ===========================================
// Map
// ===========================================
  
  var GMapsHelper = (function(GMH) {
    "use strict";
  
    // Default Options
    // =======================================
    var _DEFAULTS = {
      map: {
        zoom: 6,
        center: { lat: 37.5, lng: -120 },
        mapTypeId: google.maps.MapTypeId.ROADMAP
      }
    }


    // Google Maps Helper Object
    // =======================================
    GMH.Map = {};


    // Init Map
    // =======================================
    var initMap = function(container, userOptions) {
      try {
        // get default options
        var defaults = _DEFAULTS.map;

        // combine user and default options
        var options = $.extend({}, defaults, userOptions)
       
        // create new map and save reference
        GMH.Data.Map = new google.maps.Map(document.getElementById(container), options);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Public Methods
    // =======================================
    GMH.Map.init = initMap;


    return GMH;
  })(GMapsHelper || {});


// ===========================================
// Polygons
// ===========================================
  
  var GMapsHelper = (function(GMH) {
    "use strict";
  
    // Default Options
    // =======================================
    var _DEFAULTS = {
      polygon: {
        strokeColor: '#FF0000',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#FF0000',
        fillOpacity: 0.35
      }
    }


    // GMapsHelper Object
    // =======================================
    GMH.Polygon = {};


    // Add Polygon
    // ===========================================
    var addPolygon = function(id, path, options) {
      return _executeAdd(id, path, options);
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


    // Delete Polygon
    // =======================================
    var deletePolygon = function(id) {
      return _execute("delete", id);
    }


    // Execute Add
    // =======================================
    var _executeAdd = function(id, path, userOptions) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMultiAdd(id);
        }

        // default id to next index in the Polygons object
        if (id == null) { 
          id = Object.keys(GMH.Data.Polygons).length;
        }

        // check if path is supplied
        if (path == null) {
          console.log("Must supply a path parameter");
          return false;
        }

        _add(id, path, userOptions);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMultiAdd = function(polygons) {
      try {
        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var path = polygons[i].path;
          var options = polygons[i].options;

          // default id to next index in the Polygons object
          if (id == null) { 
            id = Object.keys(GMH.Data.Polygons).length;
          }

          // skip over if path is null
          if (path == null) { 
            continue; 
          }

          _add(id, path, options);
        }

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }


    // Standard Execute
    // =======================================
    var _execute = function(action, id) {
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(action, id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ID does not reference a polygon");
          return false;
        }

        _switch(action, id);

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMulti = function(action, ids) {
      try {
        // loop through each id
        for (var i = 0, i_len = ids.length; i < i_len; i++) {
          var id = ids[i];
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            continue; 
          }

          _switch(action, id);
        }

        return true;
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _switch = function(action, id) {
      switch(action) {
        case "toggle":
          _toggle(id);
          break;

        case "show":
          _show(id);
          break;

        case "hide":
          _hide(id);
          break;

        case "delete":
          _delete(id);
          break;
      }
    }


    // Actions
    // =======================================
    var _add = function(id, path, userOptions) {
      // get default options
      var defaults = _DEFAULTS.polygon;
      
      // convert the path if it is a string
      if (typeof path == "string") {
        path = GMH.Utility.toLatLngArray(path);
      }

      // add path to defaults
      defaults.paths = path;

      // combine user and default options
      var options = $.extend({}, defaults, userOptions);

      // create new polygon
      var poly = new google.maps.Polygon(options);

      // add polygon to map
      poly.setMap(GMH.Data.Map);

      // store polygon with id in Polygons object
      GMH.Data.Polygons[id] = poly;
    }

    var _toggle = function(id) {
      // set the polygons visibility to the opposite of its current state
      var state = GMH.Data.Polygons[id].getVisible();
      GMH.Data.Polygons[id].setOptions({visible: !state});
    }

    var _show = function(id) {
      // set polygons visibility to true
      GMH.Data.Polygons[id].setOptions({visible: true});
    }

    var _hide = function(id) {
      // set polygons visibility to false
      GMH.Data.Polygons[id].setOptions({visible: false});
    }

    var _delete = function(id) {
      // remove polygon from map then delete it from Polygons object
      GMH.Data.Polygons[id].setMap(null);
      delete GMH.Data.Polygons[id];
    }


    // Public Methods
    // =======================================
    GMH.Polygon.add = addPolygon;
    GMH.Polygon.toggle = togglePolygon;
    GMH.Polygon.show = showPolygon;
    GMH.Polygon.hide = hidePolygon;
    GMH.Polygon.delete = deletePolygon;


    return GMH;
  })(GMapsHelper || {});
