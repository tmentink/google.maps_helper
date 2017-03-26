/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker--updatePosition.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Marker {

  import _D = GMH.__gmh__.Data
  
  
  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the marker's position 
   * @param id The id of the marker. Can also be an array of ids
   * @param position The position of the marker. Can be a string, a LatLng or a LatLngLiteral
   */
  export function updatePosition(id: string | string[], position: any): Obj.Marker | Obj.MarkerArray {
    if (jQuery.type(position) == "string") {
      position = Util.toLatLngArray(position)
    }

    return _updatePosition(id, position)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _updatePosition(id: string | string[], position: any): Obj.Marker | Obj.MarkerArray {
    if (jQuery.isArray(id)) {
      return _multiUpdatePosition(id, position);
    }

    if (_validParameters(id, position)) {
      return _updateMarkerPosition(id, position)
    }
  }

  function _multiUpdatePosition(ids: string[], position: any): Obj.MarkerArray {
    const markerArray = new Obj.MarkerArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]

      if (_validParameters(id, position)) {
        markerArray[id] = _updateMarkerPosition(id, position)
      }
    }

    return markerArray
  }

  function _updateMarkerPosition(id: string, position: any): Obj.Marker {
    _D.Marker[id].Obj.setOptions({"position": position});
    return _D.Marker[id];
  }

  function _validParameters(id: any, position: any): boolean {
    if (_D.Marker[id]) {
      throw "Error: ID does not exist"
    }
    if (!position) {
      throw "Error: Must supply a position"
    }

    return true
  }

}

