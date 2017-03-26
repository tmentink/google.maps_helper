/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: polygon--update.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the polygon's options 
   * @param id The id of the polygon. Can also be an array of ids
   * @param userOptions If options are null, the defaults in GMH.Config are used
   */
  export function update(id: string | string[], userOptions: google.maps.PolygonOptions): Obj.Polygon | Obj.PolygonArray {
    return _update(id, _getOptions(userOptions))
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _update(id: string | string[], options: google.maps.PolygonOptions): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiUpdate(id, options)
    }

    if (Data.Polygon[id]) {
      return _updatePolygon(id, options)
    }
  }

  function _multiUpdate(ids: string[], options: google.maps.PolygonOptions): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (Data.Polygon[id]) {
        polygonArray[id] = _updatePolygon(id, options)
      }
    }

    return polygonArray
  }

  function _updatePolygon(id: string, options: google.maps.PolygonOptions): Obj.Polygon {
    Data.Polygon[id].Obj.setOptions(options);
    return Data.Polygon[id];
  }

  function _getOptions(options: google.maps.PolygonOptions): google.maps.PolygonOptions {
    const defaults = Config.Default.Polygon || {}
    options = options == null ? defaults : options

    if (jQuery.type(options.paths) == "string") {
      options.paths = Util.toLatLngArray(options.paths);
    }

    return options
  }
  
}

