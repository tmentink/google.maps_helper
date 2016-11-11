
// ===========================================
// Polygon - Add
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Polygon Object
    // =======================================
    var Polygon = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    }

    Polygon.prototype = {
      hide: function() { return GMH.Polygon.hide(this.ID) },
      show: function() { return GMH.Polygon.show(this.ID) },
      toggle: function() { return GMH.Polygon.toggle(this.ID) },
      delete: function() { return GMH.Polygon.delete(this.ID) },
      update: function(options) { return GMH.Polygon.update(this.ID, options) },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.ID, path) },
      getBounds: function() { return GMH.Polygon.getBounds(this.ID) },
      addListener: function(type, func) { return GMH.Polygon.addListener(this.ID, type, func) },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.ID, type) },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.ID) }
    }


    // GMH Polygon Class
    // =======================================
    if (typeof GMH.Polygon == "undefined") {
      GMH.Polygon = {};
    }  


    // Public Methods
    // =======================================
    var addPolygon = function(id, path, options) {
      return _execute(id, path, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, path, userOptions) {
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? _getIndex() : id;

      // check if id already exists
      if (GMH.Data.Polygon[id]) {
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
    var _executeMulti = function(objects) {
      var objArray = [];

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var path = objects[i].path;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? _getIndex() : id;

        // skip if id already exists or path is null
        if (GMH.Data.Polygon[id] || path == null) {
          continue;
        }

        // add polygon object to array
        objArray.push(_add(id, path, options));
      }

      return objArray;
    }


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
        Parent: function(){ return GMH.Data.Polygon[this.ID] }
      };

      // create new polygon and save reference
      GMH.Data.Polygon[id] = new Polygon(id, googlePolygon);

      // return polygon object
      return GMH.Data.Polygon[id];
    }


    // Utility Functions
    // =======================================

    // create an index variable for auto creating an id
    GMH.Data.Polygon._index = 0;
    
    var _getIndex = function() {
      GMH.Data.Polygon._index++;

      // return number prior to incrementing
      return GMH.Data.Polygon._index - 1;
    }


    // Expose Public Methods
    // =======================================
    GMH.Polygon.add = addPolygon;
    

    return GMH;
  })(GMH || {});

