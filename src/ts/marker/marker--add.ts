/// <reference path="../obj/marker.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker--add.ts 
// ------------------------------------------------------------------------

namespace GMH.Marker {


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Creates a marker object, adds it to the map and stores it in GMH.$.Marker
   * @param id The string id of the marker. Can also pass in an array of IAddMarkerParms 
   * @param position The position of the marker. Can be a string, a LatLng or a LatLngLiteral
   * @param userOptions User options are merged with defaults
   */
  export function add(id: string | IAddMarkerParms[], position: any, userOptions: google.maps.MarkerOptions): Obj.Marker | Obj.MarkerArray {
    return _add(id, position, userOptions)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _add(id: string | IAddMarkerParms[], position: any, userOptions: google.maps.MarkerOptions): Obj.Marker | Obj.MarkerArray {
    if (jQuery.isArray(id)) {
      return _multiAdd(id)
    }

    if (_validParameters(id, position)) {
      return _addMarker(id, position, userOptions)
    }
  }

  function _multiAdd(objects: IAddMarkerParms[]): Obj.MarkerArray {
    const markerArray = new Obj.MarkerArray()

    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      let id = objects[i].id
      let position = objects[i].position
      let userOptions = objects[i].options

      if (_validParameters(id, position)) {
        markerArray[id] = _addMarker(id, position, userOptions)
      }
    }

    return markerArray
  }

  function _addMarker(id: any, position: any, userOptions: google.maps.MarkerOptions): Obj.Marker {
    if (jQuery.type(position) == "string") {
      position = Util.toLatLng(position)
    }

    const defaults = Config.Default.Marker || {}
    const options = jQuery.extend({}, defaults, userOptions)
    options.map = $.Map.Obj
    options.position = position

    $.Marker[id] = new Obj.Marker(id, options)
    return $.Marker[id]
  }

  function _validParameters(id: any, position: any): boolean {
    if ($.Marker[id]) {
      throw "Error: ID already exists"
    }
    if (!position) {
      throw "Error: Must supply a position"
    }

    return true
  }
  
}

