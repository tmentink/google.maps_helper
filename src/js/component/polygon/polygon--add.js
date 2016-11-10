
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




  