/// <reference path="../obj/polygon.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--bounds.ts 
// ------------------------------------------------------------------------

namespace GMH.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  export function getBounds(ids: string | string[]): google.maps.LatLngBounds {
    ids = Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds();
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i];
      
      if ($.Polygon[id]) { 
        bounds.union(getPolygonsBounds(id));
      }
    }

    return bounds;
  }

  export function getCenter(id: string | string[]): google.maps.LatLng {
    return getBounds(id).getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function getPolygonsBounds(id) {
    const bounds = new google.maps.LatLngBounds();
    const paths = $.Polygon[id].Obj.getPaths();
    
    for (var i = 0, i_end = paths.length; i < i_end; i++) {
      let path = paths.getAt(i);

      for (var j = 0, j_end = path.getLength(); j < j_end; j++) {
        bounds.extend(path.getAt(j));
      }
    }

    return bounds;
  }

}

