
// ===========================================
// Utility
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // Utility Class
    // =======================================
    if (typeof GMH.Utility == "undefined") {
      GMH.Utility = {};
    }


    // To LatLng Array
    // =======================================
    var toLatLngArray = function(str) {
      try {
        var latLngArray = [];

        // split the string into an array of coordinatePairs
        var coordPairs = str.split("|");

        for (var i = 0, i_len = coordPairs.length; i < i_len; i++) {
          var points = coordPairs[i].split(",");
          
          // create a latLng object
          var latLng = { lat: parseFloat(points[0]), lng: parseFloat(points[1]) };

          // add to latLngArray
          latLngArray.push(latLng);
        }

        return latLngArray;
      }
      catch (ex) {
        console.log(ex);
        return [];
      }
    }


    // Public Methods
    // =======================================
    GMH.Utility.toLatLngArray = toLatLngArray;


    return GMH;
  })(GMH || {});




