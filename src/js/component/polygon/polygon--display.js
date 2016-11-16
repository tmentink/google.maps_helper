
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

