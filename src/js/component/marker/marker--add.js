
// ===========================================
// Marker - Add
// ===========================================

  var GMH = (function(GMH) {
    "use strict";

    // Marker Object
    // =======================================
    var Marker = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    }

    Marker.prototype = {
      hide: function() { return GMH.Marker.hide(this.ID) },
      show: function() { return GMH.Marker.show(this.ID) },
      toggle: function() { return GMH.Marker.toggle(this.ID) },
      delete: function() { return GMH.Marker.delete(this.ID) },
      update: function(options) { return GMH.Marker.update(this.ID, options) },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.ID, position) },
      getBounds: function() { return GMH.Marker.getBounds(this.ID) },
      addListener: function(type, func) { return GMH.Marker.addListener(this.ID, type, func) },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.ID, type) },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.ID) }
    }


    // GMH Marker Class
    // =======================================
    if (typeof GMH.Marker == "undefined") {
      GMH.Marker = {};
    }  


    // Public Methods
    // =======================================
    var addMarker = function(id, position, options) {
      return _execute(id, position, options);
    }


    // Execute
    // =======================================
    var _execute = function(id, position, userOptions) {
      if (Array.isArray(id)) {
        return _executeMulti(id);
      }

      // if left null, default id to next index
      id = (id == null) ? _getIndex() : id;

      // check if id already exists
      if (GMH.Data.Marker[id]) {
        console.log("ERROR: ID already exists");
        return;
      }

      // check if position is supplied
      if (position == null) {
        console.log("ERROR: Must supply a position");
        return;
      }

      // return the marker object
      return _add(id, position, userOptions);
    }
    var _executeMulti = function(objects) {
      var objArray = [];

      for (var i = 0, i_len = objects.length; i < i_len; i++) {
        var id = objects[i].id;
        var position = objects[i].position;
        var options = objects[i].options;

        // if left null, default id to next index
        id = (id == null) ? _getIndex() : id;

        // skip if id already exists or position is null
        if (GMH.Data.Marker[id] || position == null) {
          continue;
        }

        // add marker object to array
        objArray.push(_add(id, position, options));
      }

      return objArray;
    }


    // Actions
    // =======================================
    var _add = function(id, position, userOptions) {
      if (typeof position == "string") {
        position = GMH.Utility.toLatLng(position);
      }

      // combine user and default options
      var options = $.extend({}, GMH.Defaults.Marker, userOptions);

      // add map and position to options
      options.map = GMH.Data.Map.Obj;
      options.position = position;

      // create new google marker
      var googleMarker = new google.maps.Marker(options);

      // add GMH object to google marker
      googleMarker.GMH = {
        ID: id,
        Parent: function(){ return GMH.Data.Marker[this.ID] }
      };

      // create new marker and save reference
      GMH.Data.Marker[id] = new Marker(id, googleMarker);

      // return marker object
      return GMH.Data.Marker[id];
    }


    // Utility Functions
    // =======================================

    // create an index variable for auto creating an id
    GMH.Data.Marker._index = 0;
    
    var _getIndex = function() {
      GMH.Data.Marker._index++;

      // return number prior to incrementing
      return GMH.Data.Marker._index - 1;
    }


    // Expose Public Methods
    // =======================================
    GMH.Marker.add = addMarker;
    

    return GMH;
  })(GMH || {});

