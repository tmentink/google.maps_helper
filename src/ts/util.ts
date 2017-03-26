/// <reference path="obj/baseObjectArray.ts" />
/// <reference path="constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: util.ts 
// ------------------------------------------------------------------------
 
namespace GMH.Util {

  import _C   = GMH.__gmh__.Constants
  import _Obj = GMH.__gmh__.Obj

  
  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const EventTypeAlias = {
    animationchanged  : _C.Event.Type.ANIMATION_CHANGED,
    boundschanged     : _C.Event.Type.BOUNDS_CHANGED,
    centerchanged     : _C.Event.Type.CENTER_CHANGED,
    click             : _C.Event.Type.CLICK,
    clickablechanged  : _C.Event.Type.CLICKABLE_CHANGED,
    cursorchanged     : _C.Event.Type.CURSOR_CHANGED,
    doubleclick       : _C.Event.Type.DOUBLE_CLICK,
    drag              : _C.Event.Type.DRAG,
    dragend           : _C.Event.Type.DRAG_END,
    dragstart         : _C.Event.Type.DRAG_START,
    draggablechanged  : _C.Event.Type.DRAGGABLE_CHANGED,
    flatchanged       : _C.Event.Type.FLAT_CHANGED,
    headingchanged    : _C.Event.Type.HEADING_CHANGED,
    iconchanged       : _C.Event.Type.ICON_CHANGED,
    idle              : _C.Event.Type.IDLE,
    maptypeidchanged  : _C.Event.Type.MAP_TYPE_ID_CHANGED,
    mousedown         : _C.Event.Type.MOUSE_DOWN,
    mousemove         : _C.Event.Type.MOUSE_MOVE,
    mouseout          : _C.Event.Type.MOUSE_OUT,
    mouseover         : _C.Event.Type.MOUSE_OVER,
    mouseup           : _C.Event.Type.MOUSE_UP,
    positionchanged   : _C.Event.Type.POSITION_CHANGED,
    projectionchanged : _C.Event.Type.PROJECTION_CHANGED,
    resize            : _C.Event.Type.RESIZE,
    rightclick        : _C.Event.Type.RIGHT_CLICK,
    shapechanged      : _C.Event.Type.SHAPE_CHANGED,
    tilesloaded       : _C.Event.Type.TILES_LOADED,
    tiltchanged       : _C.Event.Type.TILT_CHANGED,
    titlechanged      : _C.Event.Type.TITLE_CHANGED,
    visiblechanged    : _C.Event.Type.VISIBLE_CHANGED,
    zindexchanged     : _C.Event.Type.ZINDEX_CHANGED,
    zoomchanged       : _C.Event.Type.ZOOM_CHANGED
  }

  const ObjectTypeAlias = {
    label    : _C.Object.Type.LABEL,
    labels   : _C.Object.Type.LABEL,
    map      : _C.Object.Type.MAP,
    maps     : _C.Object.Type.MAP,
    marker   : _C.Object.Type.MARKER,
    markers  : _C.Object.Type.MARKER,
    polygon  : _C.Object.Type.POLYGON,
    polygons : _C.Object.Type.POLYGON
  }


  // ----------------------------------------------------------------------
  // Public Functions 
  // ----------------------------------------------------------------------
  
  /**
   * Returns an copy of source object minus the values of exclude 
   * @param source A GMH BaseObjectArray 
   * @param exclude Can be a comma separated string, an array or an object
   */
  export function copy(source: _Obj.BaseObjectArray, exclude?: any) {
    const src_copy = jQuery.extend(true, {}, source)
 
    // convert exclude into an array
    if (jQuery.type(exclude) == "object") {
      exclude = Object.keys(exclude)
    }
    else if (jQuery.type(exclude) == "string") {
      exclude = exclude.split(",")
    }

    // get the source object's prototype
    const src_proto  = Object.keys(Object.getPrototypeOf(source));
    
    // get the baseObjectArray class' prototype
    const base_proto = Object.keys(Object.getPrototypeOf(new _Obj.BaseObjectArray("", "")))

    // merge the src_proto and base_proto into the exclude array
    exclude = src_proto.concat(exclude)
    exclude = base_proto.concat(exclude)

    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete src_copy[exclude[i]]
    }

    const GMH_Obj = source.Type ? new _Obj[source.Type] : {}
    return jQuery.extend(GMH_Obj, src_copy)
  }

  /**
   * Returns correct EventType constant
   * @param event A string of the event type 
   */
  export function getEventType(event: string): string {
    event = event.toLowerCase().replace(/\s+/g, '')
    return EventTypeAlias[event] || event
  }

  /**
   * Returns an array of the object array's google objects
   * @param obj A GMH ObjectArray 
   */
  export function getGoogleObjects(objectArray: _Obj.BaseObjectArray): string[] {
    const ids = getIDs(objectArray)
    const googleObjects = ids.map(function(id) {
      return objectArray[id].Obj
    })

    return googleObjects
  }

  /**
   * Returns an array of the object's ids 
   * @param obj A GMH ObjectArray 
   */
  export function getIDs(objectArray: _Obj.BaseObjectArray): string[] {
    let ids = Object.keys(objectArray)

    // remove object properties from array
    for (var prop in _C.Object.Properties) {
      const index = ids.indexOf(_C.Object.Properties[prop])
      if (index !== -1) {
        ids.splice(index, 1)
      }
    }

    return ids
  }

  /**
   * Returns correct ObjectType constant
   * @param type A string of the object type 
   */
  export function getObjectType(type: string): string {
    type = type.toLowerCase().replace(/\s+/g, '')
    return ObjectTypeAlias[type] || type
  }

  /**
   * Returns value converted into an array
   * @param value Value to be converted into an array 
   */
  export function toArray(value: any): any {
    if (jQuery.type(value) == "number") {
      value = value.toString().split()
    }
    else if (jQuery.type(value) == "string") {
      value = value.split()
    }
    else if (jQuery.type(value) == "array") {
      value = value.toString().split(",")
    }

    return value
  }

  /**
   * Converts a comma separated string into a LatLng object 
   * @param str A comma separated string of x and y coordinates 
   */
  export function toLatLng(str: any): google.maps.LatLng {  
    const Delimiter = {
      LatLng: Config.Delimiter.LatLng || ","
    }

    const points = str.split(Delimiter.LatLng)
    return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
  }

  /**
   * Converts a custom formatted string into an array of LatLng objects 
   * @param str A custom formatted string of x and y coordinate pairs 
   */
  export function toLatLngArray(str: any): google.maps.LatLng[] {
    const Delimiter = {
      LatLng: Config.Delimiter.LatLng || ",",
      LatLngPair: Config.Delimiter.LatLngPair || "|"
    }

    const latLngArray = []
    const coordPairs = str.split(Delimiter.LatLngPair)

    for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
      let points = coordPairs[i].split(Delimiter.LatLng)
      let latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
      latLngArray.push(latLng)
    }

    return latLngArray;
  }

}

