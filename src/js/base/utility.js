
// ===========================================
// Utility
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Utility Class
    // =======================================
    if (typeof GMH.Utility == "undefined") {
      GMH.Utility = {};
    }


    // To LatLng
    // =======================================
    var toLatLng = function(str) {
      try {
        var points = str.split(",");
        
        // return a google maps latLng object
        return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));
      }
      catch (ex) {
        console.log(ex);
        return {};
      }
    }


    // To LatLng Array
    // =======================================
    var toLatLngArray = function(str) {
      try {
        var latLngArray = [];

        // split the string into an array of coordinate paris
        var coordPairs = str.split("|");

        for (var i = 0, i_len = coordPairs.length; i < i_len; i++) {
          var points = coordPairs[i].split(",");
          
          // create a google maps latLng object
          var latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]));

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
    GMH.Utility.toLatLng = toLatLng;
    GMH.Utility.toLatLngArray = toLatLngArray;


    return GMH;
  })(GMH || {});

