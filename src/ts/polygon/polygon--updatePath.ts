/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: polygon--updatePath.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the polygon's path 
   * @param id The id of the polygon. Can also be an array of ids
   * @param path The path of the polygon. Can be a string or a LatLngArray 
   */
  export function updatePath(id: string | string[], path: any): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.type(path) == "string") {
      path = Util.toLatLngArray(path)
    }

    return _updatePath(id, path)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _updatePath(id: string | string[], path: any): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiUpdatePath(id, path);
    }

    if (_validParameters(id, path)) {
      return _updatePolygonPath(id, path)
    }
  }

  function _multiUpdatePath(ids: string[], path: any): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]

      if (_validParameters(id, path)) {
        polygonArray[id] = _updatePolygonPath(id, path)
      }
    }

    return polygonArray
  }

  function _updatePolygonPath(id: string, path: any): Obj.Polygon {
    Data.Polygon[id].Obj.setOptions({"paths": path});
    return Data.Polygon[id];
  }

  function _validParameters(id: any, path: any): boolean {
    if (!Data.Polygon[id]) {
      throw "Error: ID does not exist"
    }
    if (!path) {
      throw "Error: Must supply a path"
    }

    return true
  }

}

