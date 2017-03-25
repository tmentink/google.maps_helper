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
    if (jQuery.isArray(id)) {
      return multiRemove(id)
    }
    else {
      return singleRemove(id)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function singleRemove(id: string): Obj.Polygon {
    if ($.Polygon[id]) {
      return removePolygon(id)
    }
  }

  function multiRemove(ids: string[]): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if ($.Polygon[id]) {
        polygonArray[id] = removePolygon(id)
      }
    }

    return polygonArray
  }

  function removePolygon(id: string): Obj.Polygon {
      const polygon = $.Polygon[id];
      
      polygon.Obj.setMap(null);
      delete $.Polygon[id];

      return polygon;
  }

}

