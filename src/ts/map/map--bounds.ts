/// <reference path="../obj/map.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map--bounds.ts 
// ------------------------------------------------------------------------

namespace GMH.Map {


  // ------------------------------------------------------------------------
  // Public Functions 
  // ------------------------------------------------------------------------

  /**
   * Sets the map's bounds to objects in GMH.$ 
   * @param type A string or array of object types
   * @param ids A string, number or array of object ids. Can be left null to get all ids 
   */
  export function setBounds(type: string | Object[], ids: any): GMH.Obj.Map {
    if (jQuery.isArray(type)) {
      multiType(type)
    }
    else {
      singleType(type, ids)
    }

    return $.Map
  }

  /**
   * Returns the map's center LatLng object 
   */
  export function getCenter(): google.maps.LatLng {
    return $.Map.Obj.getCenter()
  }


  // ------------------------------------------------------------------------
  // Private Functions 
  // ------------------------------------------------------------------------
   
  function singleType(type: string, ids: any): void {
    type = Util.getObjectType(type)

    if (type == "initial" || type == "init") {
      $.Map.Obj.fitBounds($.Map.Init.Bounds)
      $.Map.Obj.setZoom($.Map.Init.Options.zoom)
      return
    } 

    const bounds = getBounds(type, getIDs(type, ids))
    $.Map.Obj.fitBounds(bounds)
  }

  function multiType(types: Object[]): void {
    const bounds = new google.maps.LatLngBounds()

    for (var i = 0, i_end = types.length; i < i_end; i++) {
      let type = Object.keys(types[i])[0]
      let ids = types[i][type]

      type = Util.getObjectType(type)
      bounds.union(getBounds(type, getIDs(type, ids)))
    }

    $.Map.Obj.fitBounds(bounds)
  }

  function getBounds(type: string, ids: any): google.maps.LatLngBounds {
    ids = toArray(ids)

    const bounds = new google.maps.LatLngBounds()
    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]

      if ($[type][id] == null) {
        continue
      }

      bounds.union($[type][id].getBounds())
    }

    return bounds
  }

  function getIDs(type: string, ids: any): any {
    return ids == null ? Util.getIDs($[type]) : ids
  }

  function toArray(ids: any): any {
    if (jQuery.type(ids) == "number") {
      ids = ids.toString().split()
    }
    else if (jQuery.type(ids) == "string") {
      ids = ids.split()
    }

    return ids
  }
}

