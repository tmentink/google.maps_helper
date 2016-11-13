
// ===========================================
// Object - Marker
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Marker Object
    // =======================================
    var Marker = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    };

    Marker.prototype = {
      hide: function() { return GMH.Marker.hide(this.ID); },
      show: function() { return GMH.Marker.show(this.ID); },
      toggle: function() { return GMH.Marker.toggle(this.ID); },
      delete: function() { return GMH.Marker.delete(this.ID); },
      update: function(options) { return GMH.Marker.update(this.ID, options); },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.ID, position); },
      getBounds: function() { return GMH.Marker.getBounds(this.ID); },
      addListener: function(type, func) { return GMH.Marker.addListener(this.ID, type, func); },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.ID, type); },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.ID); }
    };


    // Marker Array Object
    // =======================================
    var MarkerArray = function() {
      this._i = 0;
    };

    MarkerArray.prototype = {
      nextIndex: function() { this._i++; return this._i -1; },
      IDs: function() { return GMH.Utility.getIDs(this); },
      hide: function() { return GMH.Marker.hide(this.IDs()); },
      show: function() { return GMH.Marker.show(this.IDs()); },
      toggle: function() { return GMH.Marker.toggle(this.IDs()); },
      delete: function() { return GMH.Marker.delete(this.IDs()); },
      getBounds: function() { return GMH.Marker.getBounds(this.IDs()); },
      update: function(options) { return GMH.Marker.update(_buildUpdateObjects(this.IDs(), options)); },
      addListener: function(type, fn) { return GMH.Marker.addListener(_buildListenerObjects(this.IDs(), type, fn)); },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.IDs()); }
    };

    
    // Utility Functions
    // =======================================
    var _buildUpdateObjects = function(ids, options) { 
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        var obj = {};
        obj[ids[i]] = options;

        objArray.push(obj);
      }

      return objArray;
    };

    var _buildListenerObjects = function(ids, type, fn) {
      var objArray = [];

      for (var i = 0, i_len = ids.length; i < i_len; i++) {
        objArray.push({ "id": ids[i], "type": type, "fn": fn });
      }

      return objArray;
    };


    // Expose Public Objects
    // =======================================
    GMH.Object.Marker = Marker;
    GMH.Object.MarkerArray = MarkerArray;


    return GMH;
  })(GMH || {});

