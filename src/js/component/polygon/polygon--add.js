
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

