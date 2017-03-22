/// <reference path="obj/objectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: util.ts 
// ------------------------------------------------------------------------
 
namespace GMH.Util {


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const EventType = {
    ANIMATION_CHANGED   : "animation_changed",
    BOUNDS_CHANGED      : "bounds_changed",
    CENTER_CHANGED      : "center_changed",
    CLICK               : "click",
    CLICKABLE_CHANGED   : "clickable_changed",
    CURSOR_CHANGED      : "cursor_changed",
    DOUBLE_CLICK        : "dblclick",
    DRAG                : "drag",
    DRAG_END            : "dragend",
    DRAG_START          : "dragstart",
    DRAGGABLE_CHANGED   : "draggable_changed",
    FLAT_CHANGED        : "flat_changed",
    HEADING_CHANGED     : "heading_changed",
    ICON_CHANGED        : "icon_changed",
    IDLE                : "idle",
    MAP_TYPE_ID_CHANGED : "maptypeid_changed",
    MOUSE_DOWN          : "mousedown",
    MOUSE_MOVE          : "mousemove",
    MOUSE_OUT           : "mouseout",
    MOUSE_OVER          : "mouseover",
    MOUSE_UP            : "mouseup",
    POSITION_CHANGED    : "position_changed",
    PROJECTION_CHANGED  : "projection_changed",
    RESIZE              : "resize",
    RIGHT_CLICK         : "rightclick",
    SHAPE_CHANGED       : "shape_changed",
    TILES_LOADED        : "tilesloaded",
    TILT_CHANGED        : "tilt_changed",
    TITLE_CHANGED       : "title_changed",
    VISIBLE_CHANGED     : "visible_changed",
    ZINDEX_CHANGED      : "zindex_changed",
    ZOOM_CHANGED        : "zoom_changed"
  }

  const EventTypeAlias = {
    animationchanged  : EventType.ANIMATION_CHANGED,
    boundschanged     : EventType.BOUNDS_CHANGED,
    centerchanged     : EventType.CENTER_CHANGED,
    click             : EventType.CLICK,
    clickablechanged  : EventType.CLICKABLE_CHANGED,
    cursorchanged     : EventType.CURSOR_CHANGED,
    doubleclick       : EventType.DOUBLE_CLICK,
    drag              : EventType.DRAG,
    dragend           : EventType.DRAG_END,
    dragstart         : EventType.DRAG_START,
    draggablechanged  : EventType.DRAGGABLE_CHANGED,
    flatchanged       : EventType.FLAT_CHANGED,
    headingchanged    : EventType.HEADING_CHANGED,
    iconchanged       : EventType.ICON_CHANGED,
    idle              : EventType.IDLE,
    maptypeidchanged  : EventType.MAP_TYPE_ID_CHANGED,
    mousedown         : EventType.MOUSE_DOWN,
    mousemove         : EventType.MOUSE_MOVE,
    mouseout          : EventType.MOUSE_OUT,
    mouseover         : EventType.MOUSE_OVER,
    mouseup           : EventType.MOUSE_UP,
    positionchanged   : EventType.POSITION_CHANGED,
    projectionchanged : EventType.PROJECTION_CHANGED,
    resize            : EventType.RESIZE,
    rightclick        : EventType.RIGHT_CLICK,
    shapechanged      : EventType.SHAPE_CHANGED,
    tilesloaded       : EventType.TILES_LOADED,
    tiltchanged       : EventType.TILT_CHANGED,
    titlechanged      : EventType.TITLE_CHANGED,
    visiblechanged    : EventType.VISIBLE_CHANGED,
    zindexchanged     : EventType.ZINDEX_CHANGED,
    zoomchanged       : EventType.ZOOM_CHANGED
  }

  const ObjectType = {
    LABEL   : "Label",
    MAP     : "Map",
    MARKER  : "Marker",
    POLYGON : "Polygon"
  }

  const ObjectTypeAlias = {
    label    : ObjectType.LABEL,
    labels   : ObjectType.LABEL,
    map      : ObjectType.MAP,
    maps     : ObjectType.MAP,
    marker   : ObjectType.MARKER,
    markers  : ObjectType.MARKER,
    polygon  : ObjectType.POLYGON,
    polygons : ObjectType.POLYGON
  }


  // ------------------------------------------------------------------------
  // Functions 
  // ------------------------------------------------------------------------
  
  /**
   * Returns an copy of source object minus the values of exclude 
   * @param source A GMH ObjectArray 
   * @param exclude Can be a comma separated string, an array or an object
   */
  export function copy(source: GMH.Obj.ObjectArray, exclude?: any) {
    // make a deep copy of the source
    const src_copy = $.extend(true, {}, source)
 
    // convert exclude into an array
    if ($.type(exclude) == "object") {
      exclude = Object.keys(exclude)
    }
    else if ($.type(exclude) == "string") {
      exclude = exclude.split(",")
    }

    // get the source's prototype and convert into array
    const src_proto = Object.keys(Object.getPrototypeOf(source));
    
    // merge the src_proto and exclude arrays
    exclude = src_proto.concat(exclude);

    // delete all exclude items from src_copy
    for (var i = 0, i_end = exclude.length; i < i_end; i++) {
      delete src_copy[exclude[i]]
    }

    // create a new object based on source type
    const GMH_Obj = source.Type ? new GMH.Obj[source.Type] : {}

    // copy into new object 
    return $.extend(GMH_Obj, src_copy)
  }

  /**
   * Returns an array of the object's ids 
   * @param obj A GMH ObjectArray 
   */
  export function getIDs(obj: GMH.Obj.ObjectArray) {
    let ids = Object.keys(obj)

    let _i = ids.indexOf("_i")
    if (_i !== -1) {
      ids.splice(_i, 1)
    }

    return ids
  }

  /**
   * Converts a comma separated string into a LatLng object 
   * @param str A comma separated string of x and y coordinates 
   */
  export function toLatLng(str: string) {  
    try {
      const points = str.split(",")
      return new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
    }
    catch (ex) {
      console.log(ex)
      return {}
    }
  }

  /**
   * Converts a custom formatted string into an array of LatLng objects 
   * @param str A custom formatted string of x and y coordinate pairs 
   */
  export function toLatLngArray(str: string) {
    try {
      const latLngArray = [];
      const coordPairs = str.split("|");

      for (var i = 0, i_end = coordPairs.length; i < i_end; i++) {
        let points = coordPairs[i].split(",")
        let latLng = new google.maps.LatLng(parseFloat(points[0]), parseFloat(points[1]))
        latLngArray.push(latLng);
      }

      return latLngArray;
    }
    catch (ex) {
      console.log(ex);
      return [];
    }
  }

  /**
   * Returns correct ObjectType constant
   * @param type A string of the object type 
   */
  export function getObjectType(type: string) {
    type = type.toLowerCase()
    return ObjectTypeAlias[type]
  }

  /**
   * Returns correct EventType constant
   * @param event A string of the event type 
   */
  export function getEventType(event: string) {
    event = event.toLowerCase().replace(/\s+/g, '')
    return EventTypeAlias[event] || event
  }
}

