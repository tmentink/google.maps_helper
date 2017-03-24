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
    if (jQuery.isArray(id)) {
      return multiAdd(id)
    }
    else {
      return singleAdd(id, path, userOptions)
    }
  }


  // ----------------------------------------------------------------------
  // Private Functions 
  // ----------------------------------------------------------------------
  
  function singleAdd(id: string, path: any, userOptions: google.maps.PolygonOptions): Obj.Polygon {
    if (validParameters(id, path)) {
      return addPolygon(id, path, userOptions)
    }
  }

  function multiAdd(objects: IAddPolygonParms[]): Obj.PolygonArray {
    const polygonArray = new Obj.PolygonArray()

    for (var i = 0, i_end = objects.length; i < i_end; i++) {
      let id = objects[i].id;
      let path = objects[i].path;
      let userOptions = objects[i].options;

      if (validParameters(id, path)) {
        polygonArray[id] = addPolygon(id, path, userOptions)
      }
    }

    return polygonArray
  }

  function addPolygon(id: string, path: any, userOptions: google.maps.PolygonOptions): Obj.Polygon {
    if (jQuery.type(path) == "string") {
      path = Util.toLatLngArray(path)
    }

    const defaults = Config.Default.Polygon || {}
    const options = jQuery.extend({}, defaults, userOptions)
    options.map = $.Map.Obj
    options.path = path

    $.Polygons[id] = new Obj.Polygon(id, options)
    return $.Polygons[id]
  }

  function validParameters(id: string, path: any): boolean {
    if ($.Polygons[id]) {
      throw "Error: ID already exists "
    }
    if (!path) {
      throw "Error: Must supply a path"
    }

    return true
  }
  
}

