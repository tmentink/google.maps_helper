// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: search.ts 
// ------------------------------------------------------------------------

namespace GMH {

  import _C = GMH.__gmh__.Constants
  import _D = GMH.__gmh__.Data


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Returns a label array containing any matching ids
   * @param ids An id or an array of ids 
   */
  export function Labels(ids: any) {
    if (ids) {
      const exclude = getIDsToExclude(_C.Object.Type.LABEL, Util.toArray(ids))
      return Util.copy(_D.Label, exclude)
    }

    return _D.Label;
  }

  /**
   * Returns the map 
   */
  export function Map() {
    return _D.Map; 
  }

  /**
   * Returns a marker array containing any matching ids
   * @param ids An id or an array of ids 
   */
  export function Markers(ids: any) {
    if (ids) {
      const exclude = getIDsToExclude(_C.Object.Type.MARKER, Util.toArray(ids))
      return Util.copy(_D.Marker, exclude)
    }

    return _D.Marker;
  }

  /**
   * Returns a polygon array containing any matching ids
   * @param ids An id or an array of ids 
   */
  export function Polygons(ids: any) {
    if (ids) {
      const exclude = getIDsToExclude(_C.Object.Type.POLYGON, Util.toArray(ids))
      return Util.copy(_D.Polygon, exclude)
    }

    return _D.Polygon;
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function getIDsToExclude(type: string, ids: any) {
    const allIDs = _D[type].getIDs()
    const exclude = allIDs.filter(function(i){
      return ids.indexOf(i) === -1
    })

    return exclude
  }

}

