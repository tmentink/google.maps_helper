
// ===========================================
// Object - Polygon
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Polygon Object
    // =======================================
    var Polygon = function(id, obj) {
      this.ID = id;
      this.Obj = obj;
    };

    Polygon.prototype = {
      ObjectType: "Polygon",
      not: function() { return GMH.Utility.copy(GMH.Data.Polygon, this.ID) },
      hide: function() { return GMH.Polygon.hide(this.ID); },
      show: function() { return GMH.Polygon.show(this.ID); },
      toggle: function() { return GMH.Polygon.toggle(this.ID); },
      delete: function() { return GMH.Polygon.delete(this.ID); },
      reset: function() { return GMH.Polygon.reset(this.ID); },
      update: function(options) { return GMH.Polygon.update(this.ID, options); },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.ID, path); },
      getBounds: function() { return GMH.Polygon.getBounds(this.ID); },
      getCenter: function() { return GMH.Polygon.getCenter(this.ID); },
      addListener: function(type, func) { return GMH.Polygon.addListener(this.ID, type, func); },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.ID, type); },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.ID); }
    };


    // Polygon Array Object
    // =======================================
    var PolygonArray = function() {
      this._i = 0;
    };

    PolygonArray.prototype = {
      ObjectType: "PolygonArray",
      IDs: function() { return GMH.Utility.getIDs(this); },
      not: function() { return GMH.Utility.copy(GMH.Data.Polygon, this) },
      nextIndex: function() { this._i++; return this._i -1; },
      hide: function() { return GMH.Polygon.hide(this.IDs()); },
      show: function() { return GMH.Polygon.show(this.IDs()); },
      toggle: function() { return GMH.Polygon.toggle(this.IDs()); },
      delete: function() { return GMH.Polygon.delete(this.IDs()); },
      reset: function() { return GMH.Polygon.reset(this.IDs()); },
      update: function(options) { return GMH.Polygon.update(this.IDs(), options); },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.IDs(), path); },
      getBounds: function() { return GMH.Polygon.getBounds(this.IDs()); },
      getCenter: function() { return GMH.Polygon.getCenter(this.IDs()); },
      addListener: function(type, fn) { return GMH.Polygon.addListener(this.IDs(), type, fn); },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.IDs()); }
    };

    
    // Expose Public Objects
    // =======================================
    GMH.Object.Polygon = Polygon;
    GMH.Object.PolygonArray = PolygonArray;


    return GMH;
  })(GMH || {});

