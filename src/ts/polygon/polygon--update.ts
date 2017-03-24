/// <reference path="../obj/polygon.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--update.ts 
// ------------------------------------------------------------------------

namespace GMH.Polygon {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the polygon's options 
   * @param id The id of the polygon. Can also be an array of ids
   * @param userOptions If options are null, the defaults in GMH.Config are used
   */
  export function update(id: string | string[], userOptions: google.maps.PolygonOptions): Obj.Polygon | Obj.PolygonArray {
    const options = getOptions(userOptions)

    if (jQuery.isArray(id)) {
      return multiUpdate(id, options)
    }
    else {
      return singleUpdate(id, options)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function singleUpdate(id: string, options: google.maps.PolygonOptions): Obj.Polygon {
    if ($.Polygon[id]) {
      return updatePolygon(id, options)
    }
  }

  function multiUpdate(ids: string[], options: google.maps.PolygonOptions): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if ($.Polygon[id]) {
        polygonArray[id] = updatePolygon(id, options)
      }
    }

    return polygonArray
  }

  function updatePolygon(id: string, options: google.maps.PolygonOptions): Obj.Polygon {
    $.Polygon[id].Obj.setOptions(options);
    return $.Polygon[id];
  }

  function getOptions(options: google.maps.PolygonOptions): google.maps.PolygonOptions {
    const defaults = Config.Default.Polygon || {}
    options = options == null ? defaults : options

    if (jQuery.type(options.paths) == "string") {
      options.paths = Util.toLatLngArray(options.paths);
    }

    return options
  }
  
}

