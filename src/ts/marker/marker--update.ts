/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: marker--update.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Marker {

  import _D = GMH.__gmh__.Data
  
  
  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Updates the marker's options 
   * @param id The id of the marker. Can also be an array of ids
   * @param userOptions If options are null, the defaults in GMH.Config are used
   */
  export function update(id: string | string[], userOptions: google.maps.MarkerOptions): Obj.Marker | Obj.MarkerArray {
    return _update(id, _getOptions(userOptions))
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _update(id: string | string[], options: google.maps.MarkerOptions): Obj.Marker | Obj.MarkerArray {
    if (jQuery.isArray(id)) {
      return _multiUpdate(id, options)
    }

    if (_D.Marker[id]) {
      return _updateMarker(id, options)
    }
  }

  function _multiUpdate(ids: string[], options: google.maps.MarkerOptions): Obj.MarkerArray {
    const markerArray = new Obj.MarkerArray()

    for (var i = 0, i_end = ids.length; i < i_end; i++) {
      let id = ids[i]
      if (_D.Marker[id]) {
        markerArray[id] = _updateMarker(id, options)
      }
    }

    return markerArray
  }

  function _updateMarker(id: string, options: google.maps.MarkerOptions): Obj.Marker {
    _D.Marker[id].Obj.setOptions(options);
    return _D.Marker[id];
  }

  function _getOptions(options: any): google.maps.MarkerOptions {
    const defaults = Config.Default.Marker || {}
    options = options == null ? defaults : options

    if (jQuery.type(options.position) == "string") {
      options.position = Util.toLatLng(options.position);
    }

    return options
  }
  
}

