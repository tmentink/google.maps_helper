/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: polygon--bounds.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Polygon {

  import _D = GMH.__gmh__.Data
  

  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Returns the bounds of the polygon(s)
   * @param ids The id of the polygon. Can also be an array of ids
   */
  export function getBounds(ids: string | string[]): google.maps.LatLngBounds {
    ids = Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      
      if (_D.Polygon[id]) { 
        bounds.union(_getPolygonsBounds(id))
      }
    }

    return bounds
  }

  /**
   * Returns the center LatLng object of the polygon(s) bounds
   * @param ids The id of the polygon. Can also be an array of ids
   */
  export function getCenter(id: string | string[]): google.maps.LatLng {
    return getBounds(id).getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _getPolygonsBounds(id) {
    const bounds = new google.maps.LatLngBounds()
    const paths = _D.Polygon[id].Obj.getPaths()
    
    for (var i = 0, i_end = paths.length; i < i_end; i++) {
      let path = paths.getAt(i)

      for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
        bounds.extend(path.getAt(j))
      }
    }

    return bounds
  }

}

