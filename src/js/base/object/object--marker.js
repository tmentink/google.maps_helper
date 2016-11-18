
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
      ObjectType: "Marker",
      not: function() { return GMH.Utility.copy(GMH.Data.Marker, this.ID) },
      hide: function() { return GMH.Marker.hide(this.ID); },
      show: function() { return GMH.Marker.show(this.ID); },
      toggle: function() { return GMH.Marker.toggle(this.ID); },
      delete: function() { return GMH.Marker.delete(this.ID); },
      reset: function() { return GMH.Marker.reset(this.ID); },
      update: function(options) { return GMH.Marker.update(this.ID, options); },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.ID, position); },
      getBounds: function() { return GMH.Marker.getBounds(this.ID); },
      getCenter: function() { return GMH.Marker.getCenter(this.ID); },
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
      ObjectType: "MarkerArray",
      IDs: function() { return GMH.Utility.getIDs(this); },
      not: function() { return GMH.Utility.copy(GMH.Data.Marker, this) },
      nextIndex: function() { this._i++; return this._i -1; },
      hide: function() { return GMH.Marker.hide(this.IDs()); },
      show: function() { return GMH.Marker.show(this.IDs()); },
      toggle: function() { return GMH.Marker.toggle(this.IDs()); },
      delete: function() { return GMH.Marker.delete(this.IDs()); },
      reset: function() { return GMH.Marker.reset(this.IDs()); },
      update: function(options) { return GMH.Marker.update(this.IDs(), options); },
      updatePosition: function(position) { return GMH.Marker.updatePosition(this.IDs(), position); },
      getBounds: function() { return GMH.Marker.getBounds(this.IDs()); },
      getCenter: function() { return GMH.Marker.getCenter(this.IDs()); },
      addListener: function(type, fn) { return GMH.Marker.addListener(this.IDs(), type, fn); },
      removeListenerType: function(type) { return GMH.Marker.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Marker.removeAllListeners(this.IDs()); }
    };


    // Expose Public Objects
    // =======================================
    GMH.Object.Marker = Marker;
    GMH.Object.MarkerArray = MarkerArray;


    return GMH;
  })(GMH || {});

