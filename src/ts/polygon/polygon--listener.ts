/// <reference path="../obj/polygon.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--listener.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Polygon {

  import _D = GMH.__gmh__.Data
  
  
  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const Action = {
    ADD         : "add", 
    REMOVE_ALL  : "remove_all",
    REMOVE_TYPE : "remove_type",
  }

  const Execute = {
    add         : function(id, type, fn) { return _add(id, type, fn) },
    remove_all  : function(id, type, fn) { return _removeAll(id) },
    remove_type : function(id, type, fn) { return _removeType(id, type) }
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Adds an event listener to the polygon(s)
   * @param id The id of the polygon. Can also be an array of ids
   * @param type The event type
   * @param fn The function to be executed when event is triggered 
   */
  export function addListener(id: string | string[], type: string, fn: Function): Obj.Polygon | Obj.PolygonArray {
    type = Util.getEventType(type)
    return _listener(id, type, fn, Action.ADD)
  }

  /**
   * Removes all listeners from the polygon(s)
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function removeAllListeners(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return _listener(id, null, null, Action.REMOVE_ALL)
  }

  /**
   * Removes all listeners of the given type from the polygon(s)
   * @param id The id of the polygon. Can also be an array of ids
   * @param type The event type
   */
  export function removeListenerType(id: string | string[], type: string): Obj.Polygon | Obj.PolygonArray {
    type = Util.getEventType(type)
    return _listener(id, type, null, Action.REMOVE_TYPE)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _listener(id: string | string[], type: string, fn: Function, action: string): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiListener(id, type, fn, action)
    }

    if (_D.Polygon[id]) {
      return Execute[action](id, type, fn)
    }
  }

  function _multiListener(ids: string[], type: string, fn: Function, action: string): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (_D.Polygon[id]) {
        polygonArray[id] = Execute[action](id, type, fn)
      }
    }

    return polygonArray
  }

  function _add(id: string, type: string, fn: Function): Obj.Polygon {
    google.maps.event.addListener(_D.Polygon[id].Obj, type, fn)
    return _D.Polygon[id]
  }

  function _removeType(id: string, type: string): Obj.Polygon {
    google.maps.event.clearListeners(_D.Polygon[id].Obj, type)
    return _D.Polygon[id]
  }

  function _removeAll(id: string): Obj.Polygon {
    google.maps.event.clearInstanceListeners(_D.Polygon[id].Obj)
    return _D.Polygon[id]
  }
  
}

