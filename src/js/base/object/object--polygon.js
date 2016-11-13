
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
      hide: function() { return GMH.Polygon.hide(this.ID); },
      show: function() { return GMH.Polygon.show(this.ID); },
      toggle: function() { return GMH.Polygon.toggle(this.ID); },
      delete: function() { return GMH.Polygon.delete(this.ID); },
      update: function(options) { return GMH.Polygon.update(this.ID, options); },
      updatePath: function(path) { return GMH.Polygon.updatePath(this.ID, path); },
      getBounds: function() { return GMH.Polygon.getBounds(this.ID); },
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
      nextIndex: function() { this._i++; return this._i -1; },
      IDs: function() { return GMH.Utility.getIDs(this); },
      hide: function() { return GMH.Polygon.hide(this.IDs()); },
      show: function() { return GMH.Polygon.show(this.IDs()); },
      toggle: function() { return GMH.Polygon.toggle(this.IDs()); },
      delete: function() { return GMH.Polygon.delete(this.IDs()); },
      getBounds: function() { return GMH.Polygon.getBounds(this.IDs()); },
      update: function(options) { return GMH.Polygon.update(_buildUpdateObjects(this.IDs(), options)); },
      addListener: function(type, fn) { return GMH.Polygon.addListener(_buildListenerObjects(this.IDs(), type, fn)); },
      removeListenerType: function(type) { return GMH.Polygon.removeListenerType(this.IDs(), type); },
      removeAllListeners: function() { return GMH.Polygon.removeAllListeners(this.IDs()); }
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
    GMH.Object.Polygon = Polygon;
    GMH.Object.PolygonArray = PolygonArray;


    return GMH;
  })(GMH || {});

