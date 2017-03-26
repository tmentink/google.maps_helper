/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: polygon--reset.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Resets the polygon to its initialized state
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function reset(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return _reset(id)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------

  function _reset(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiReset(id)
    }

    if (Data.Polygon[id]) {
      return _resetPolygon(id)
    }
  }

  function _multiReset(ids: string[]): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (Data.Polygon[id]) {
        polygonArray[id] = _resetPolygon(id)
      }
    }

    return polygonArray
  }

  function _resetPolygon(id: string): any {
    return update(id, Data.Polygon[id].Init.Options);
  }
 
}

