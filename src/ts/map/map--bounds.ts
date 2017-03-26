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
   * Sets the map's bounds to objects in GMH.$ 
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

    return $.Map
  }

  /**
   * Returns the map's center LatLng object 
   */
  export function getCenter(): google.maps.LatLng {
    return $.Map.Obj.getCenter()
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
   
  function _singleType(type: any, ids: any): void {
    type = Util.getObjectType(type)

    if (type == "initial" || type == "init") {
      $.Map.Obj.fitBounds($.Map.Init.Bounds)
      $.Map.Obj.setZoom($.Map.Init.Options.zoom)
      return
    } 

    const bounds = _getBounds(type, _getIDs(type, ids))
    $.Map.Obj.fitBounds(bounds)
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

    $.Map.Obj.fitBounds(bounds)
  }

  function _getBounds(type: string, ids: any): google.maps.LatLngBounds {
    ids = Util.toArray(ids)

    const bounds = new google.maps.LatLngBounds()
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]

      if ($[type][id]) {
        bounds.union($[type][id].getBounds())
      }
    }

    return bounds
  }

  function _getIDs(type: string, ids: any): any {
    return ids == null ? Util.getIDs($[type]) : ids
  }

}

