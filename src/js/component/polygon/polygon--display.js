
// ===========================================
// Polygon - Display
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Google Maps Helper Object
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
      try {
        // check if array is passed
        if (Array.isArray(id)) {
          return _executeMulti(action, id);
        }

        // check if id matches a polygon
        if (GMH.Data.Polygons[id] == undefined) {
          console.log("ERROR: ID does not reference a polygon");
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
      }
    }


    // Actions
    // =======================================
    var _toggle = function(id) {
      // set the polygons visibility to the opposite of its current state
      var state = GMH.Data.Polygons[id].Obj.getVisible();
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": !state });
    }

    var _show = function(id) {
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": true });
    }

    var _hide = function(id) {
      GMH.Data.Polygons[id].Obj.setOptions({ "visible": false });
    }


    // Public Methods
    // =======================================
    GMH.Polygon.toggle = togglePolygon;
    GMH.Polygon.show = showPolygon;
    GMH.Polygon.hide = hidePolygon;
    

    return GMH;
  })(GMH || {});




  