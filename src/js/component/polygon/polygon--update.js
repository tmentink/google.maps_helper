
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
      var polyArray = new GMH.Object.PolygonArray();

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var id = ids[i];

        // skip if id doesnt exists
        if (GMH.Data.Polygon[id] == undefined) {
          continue;
        }

        // add polygon object to array
        var poly = _update(id, options);
        polyArray[poly.ID] = poly;
      }

      return polyArray;
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

    var _executeupdatePathMulti = function(ids) {
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
      GMH.Data.Polygon[id].Obj.setOptions({"path": path});
      return GMH.Data.Polygon[id];
    };


    // Expose Public Methods
    // =======================================
    GMH.Polygon.update = updatePolygon;
    GMH.Polygon.updatePath = updatePath;
    

    return GMH;
  })(GMH || {});

 