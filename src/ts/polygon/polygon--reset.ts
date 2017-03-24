/// <reference path="../obj/polygon.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--reset.ts 
// ------------------------------------------------------------------------

namespace GMH.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  export function reset(id: string | string[]): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return multiReset(id)
    }
    else {
      return singleReset(id)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------

  function singleReset(id: string): Obj.Polygon {
    if ($.Polygon[id]) {
      return resetPolygon(id)
    }
  }

  function multiReset(ids: string[]): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if ($.Polygon[id]) {
        polygonArray[id] = resetPolygon(id)
      }
    }

    return polygonArray
  }

  function resetPolygon(id: string): any {
    return GMH.Polygon.update(id, $.Polygon[id].Init.Options);
  }
 
}

