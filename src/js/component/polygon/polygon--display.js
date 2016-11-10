
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




  