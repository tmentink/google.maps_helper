/// <reference path="../obj/polygon.ts" />
/// <reference path="../util.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon--add.ts 
// ------------------------------------------------------------------------

namespace GMH.Polygon {


  interface IAddPolygonParms {
    id      : string
    path    : any
    options : google.maps.PolygonOptions
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Creates a polygon object, adds it to the map and stores it in GMH.$.Polygons
   * @param id The string id of the polygon. Can also pass in an array of IAddPolygonParms 
   * @param path The path of the polygon. Can be a string or a LatLngArray
   * @param userOptions User options are merged with defaults
   */
  export function add(id: string | IAddPolygonParms[], path: any, userOptions: google.maps.PolygonOptions): Obj.Polygon | Obj.PolygonArray {
    return _add(id, path, userOptions)
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function _add(id: string | IAddPolygonParms[], path: any, userOptions: google.maps.PolygonOptions): Obj.Polygon | Obj.PolygonArray {
    if (jQuery.isArray(id)) {
      return _multiAdd(id)
    }

    if (_validParameters(id, path)) {
      return _addPolygon(id, path, userOptions)
    }
  }

  function _multiAdd(objects: IAddPolygonParms[]): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      let id = objects[i].id;
      let path = objects[i].path;
      let userOptions = objects[i].options;

      if (_validParameters(id, path)) {
        polygonArray[id] = _addPolygon(id, path, userOptions)
      }
    }

    return polygonArray
  }

  function _addPolygon(id: any, paths: any, userOptions: google.maps.PolygonOptions): Obj.Polygon {
    if (jQuery.type(paths) == "string") {
      paths = Util.toLatLngArray(paths)
    }

    const defaults = Config.Default.Polygon || {}
    const options = jQuery.extend({}, defaults, userOptions)
    options.map = $.Map.Obj
    options.paths = paths

    $.Polygon[id] = new Obj.Polygon(id, options)
    return $.Polygon[id]
  }

  function _validParameters(id: any, path: any): boolean {
    if ($.Polygon[id]) {
      throw "Error: ID already exists "
    }
    if (!path) {
      throw "Error: Must supply a path"
    }

    return true
  }
  
}

