/// <reference path="../obj/map.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map--bounds.ts 
// ------------------------------------------------------------------------

namespace GMH.Map {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------

  /**
   * Sets the map's bounds to objects in GMH._D 
   * @param type A string or an object of types
   * @param ids A string, number or array of object ids. Can be left null to get all ids 
   */
  export function setBounds(type: any, ids: any): GMH.Obj.Map {
    if (jQuery.type(type) == "object") {
      _multiType(type)
    }
    else {
      _singleType(type, ids)
    }

    return _D.Map
  }

  /**
   * Returns the map's center LatLng object 
   */
  export function getCenter(): google.maps.LatLng {
    return _D.Map.Obj.getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
   
  function _singleType(type: any, ids: any): void {
    type = Util.getObjectType(type)

    if (type == "initial" || type == "init") {
      _D.Map.Obj.fitBounds(_D.Map.Init.Bounds)
      _D.Map.Obj.setZoom(_D.Map.Init.Options.zoom)
      return
    } 

    const bounds = _getBounds(type, _getIDs(type, ids))
    _D.Map.Obj.fitBounds(bounds)
  }

  function _multiType(obj: any): void {
    const bounds = new google.maps.LatLngBounds()

    const types = Object.keys(obj)
    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = types[i]
      let ids = obj[type]

      type = Util.getObjectType(type)
      bounds.union(_getBounds(type, _getIDs(type, ids)))
    }

    _D.Map.Obj.fitBounds(bounds)
  }

  function _getBounds(type: string, ids: any): google.maps.LatLngBounds {
    ids = Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds()
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]

      if (_D[type][id]) {
        bounds.union(_D[type][id].getBounds())
      }
    }

    return bounds
  }

  function _getIDs(type: string, ids: any): any {
    return ids == null ? Util.getIDs(_D[type]) : ids
  }

}

