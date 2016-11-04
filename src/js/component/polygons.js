
// ===========================================
// Polygons
// ===========================================
  
  var GMH = (function(GMH) {
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


    // Google Maps Helper Object
    // =======================================
    GMH.Polygon = {};    


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


    // Add Polygon
    // =======================================
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
          id = _getIndex();
        }

        // check if path is supplied
        if (path == null) {
          console.log("Must supply a path");
          return false;
        }

        return _add(id, path, userOptions);
      }
      catch (ex) {
        console.log(ex);
        return false;
      }
    }

    var _executeMultiAdd = function(polygons) {
      try {
        var results = [];

        for (var i = 0, i_len = polygons.length; i < i_len; i++) {
          var id = polygons[i].id;
          var path = polygons[i].path;
          var options = polygons[i].options;

          // default id to next index in the Polygons object
          if (id == null) { 
            id = _getIndex();
          }

          // skip over if path is null
          if (path == null) { 
            continue; 
          }

          // push the result of the add into the array
          results.push(_add(id, path, options));
        }

        return results;
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
        var results = [];

        // loop through each id
        for (var i = 0, i_len = ids.length; i < i_len; i++) {
          var id = ids[i];
          
          // skip over ids that dont match an existing polygon
          if (GMH.Data.Polygons[id] == undefined) { 
            results.push(false);
            continue; 
          }

          results.push(true);
          _switch(action, id);
        }

        return results;
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
      
      // cancel add if id already exists
      if (GMH.Data.Polygons[id]) {
        return false;
      }

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

      return true;
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
  })(GMH || {});
