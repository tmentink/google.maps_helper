// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--remove.ts 
// ------------------------------------------------------------------------

namespace GMH.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Removes the polygon from the map and GMH.$.Polygon
   * @param id The id of the polygon. Can also be an array of ids
   */
  export function remove(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    return _remove(id)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _remove(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiRemove(id)
    }

    if ($.Polygon[id]) {
      return _removePolygon(id)
    }
  }

  function _multiRemove(ids: string[]): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if ($.Polygon[id]) {
        polygonArray[id] = _removePolygon(id)
      }
    }

    return polygonArray
  }

  function _removePolygon(id: string): Obj.Polygon {
      const polygon = $.Polygon[id];
      
      polygon.Obj.setMap(null);
      delete $.Polygon[id];

      return polygon;
  }

}

