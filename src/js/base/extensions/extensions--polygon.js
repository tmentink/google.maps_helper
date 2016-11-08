
// ===========================================
// Extensions - Polygon
// ===========================================

  !(function() {
    "use strict";

    // Get Bounds
    // =======================================
    google.maps.Polygon.prototype.getBounds = function() {
      var bounds = new google.maps.LatLngBounds();
      var paths = this.getPaths();
      
      // loop through each path
      for (var i = 0, i_len = paths.length; i < i_len; i++) {
        var path = paths.getAt(i);

        // loop through all points in path
        for (var j = 0, j_len = path.getLength(); j < j_len; j++) {
          bounds.extend(path.getAt(j));
        }
      }

      return bounds;
    }

  })();




  