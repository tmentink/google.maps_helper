
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

