
// ===========================================
// Utility
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Utility Namespace
    // =======================================
    if (typeof GMH.Utility == "undefined") {
      GMH.Utility = {};
    }


    // Public Methods
    // =======================================
    var copy = function(source, exclude) {
      // make a deep copy of the source
      var src_copy = $.extend(true, {}, source);
   
      // convert exclude into an array
      if ($.type(exclude) == "object") {
        exclude = Object.keys(exclude);
      }
      else if ($.type(exclude) == "string") {
        exclude = exclude.split(",");
      }

      // get the source's prototype and convert into array
      var src_proto = Object.keys(Object.getPrototypeOf(source));
      
      // merge the src_proto and exclude arrays
      var exclude = src_proto.concat(exclude);

      // loop through array and delete ids and prototype from src_copy
      for (var i = 0, i_len = exclude.length; i < i_len; i++) {
        delete src_copy[exclude[i]];
      }

      var GMH_Obj = {};

      // create new object array based on source
      if (source.ObjectType) {
        GMH_Obj = new GMH.Object[source.ObjectType];
      }
      
      // copy into new object 
      return $.extend(GMH_Obj, src_copy);
    };

    var getIDs = function(obj) {
      var ids = Object.keys(obj);

      // remove _i from the array
      var _i = ids.indexOf("_i");
      if (_i !== -1) {
        ids.splice(_i, 1);
      }

      return ids;
    };

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
    };

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
    };

    var getObjectType = function(type) {
      type = type.toLowerCase();

      switch(type) {
        case "map":
          type = "Map";
          break;

        case "maps":
          type = "Map";
          break;

        case "label":
          type = "Label";
          break;

        case "labels":
          type = "Label";
          break;

        case "marker":
          type = "Marker";
          break;

        case "markers":
          type = "Marker";
          break;

        case "polygon":
          type = "Polygon";
          break;

        case "polygons":
          type = "Polygon";
          break;
      }

      return type;
    };

    var getEventType = function(type) {
      // remove case and spaces
      type = type.toLowerCase().replace(/\s+/g, '');

      switch(type) {
        case "doubleclick":
          type = "dblclick";
          break;

        case "boundschanged":
          type = "bounds_changed";
          break;

        case "centerchanged":
          type = "center_changed";
          break;

        case "headingchanged":
          type = "heading_changed";
          break;

        case "maptypeidchanged":
          type = "maptypeid_changed";
          break;

        case "projectionchanged":
          type = "projection_changed";
          break;

        case "tiltchanged":
          type = "tilt_changed";
          break;

        case "zoomchanged":
          type = "zoom_changed";
          break;

        // ------- Marker -------
        case "animationchanged":
          type = "animation_changed";
          break;

        case "clickablechanged":
          type ="clickable_changed";
          break;

        case "cursorchanged":
          type = "cursor_changed";
          break;

        case "draggablechanged":
          type = "draggable_changed";
          break;

        case "flatchanged": 
          type = "flat_changed";
          break;

        case "iconchanged":
          type = "icon_changed";
          break;

        case "positionchanged":
          type = "position_changed";
          break;

        case "shapechanged":
          type = "shape_changed";
          break;

        case "titlechanged":
          type = "title_changed";
          break;

        case "visiblechanged":
          type = "visible_changed";
          break;

        case "zindexchanged":
          type = "zindex_changed";
          break;
      };

      return type;
    };


    // Expose Public Methods
    // =======================================
    GMH.Utility.copy = copy;
    GMH.Utility.getIDs = getIDs;
    GMH.Utility.toLatLng = toLatLng;
    GMH.Utility.toLatLngArray = toLatLngArray;
    GMH.Utility.getObjectType = getObjectType;
    GMH.Utility.getEventType = getEventType;


    return GMH;
  })(GMH || {});

