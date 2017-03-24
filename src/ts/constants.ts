// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: constants.ts 
// ------------------------------------------------------------------------

namespace GMH._C {


  // ----------------------------------------------------------------------
  // Interfaces 
  // ----------------------------------------------------------------------

  interface IEventConstants {
    Type: {
      readonly ANIMATION_CHANGED   : string
      readonly BOUNDS_CHANGED      : string
      readonly CENTER_CHANGED      : string
      readonly CLICK               : string
      readonly CLICKABLE_CHANGED   : string
      readonly CURSOR_CHANGED      : string
      readonly DOUBLE_CLICK        : string
      readonly DRAG                : string
      readonly DRAG_END            : string
      readonly DRAG_START          : string
      readonly DRAGGABLE_CHANGED   : string
      readonly FLAT_CHANGED        : string
      readonly HEADING_CHANGED     : string
      readonly ICON_CHANGED        : string
      readonly IDLE                : string
      readonly MAP_TYPE_ID_CHANGED : string
      readonly MOUSE_DOWN          : string
      readonly MOUSE_MOVE          : string
      readonly MOUSE_OUT           : string
      readonly MOUSE_OVER          : string
      readonly MOUSE_UP            : string
      readonly POSITION_CHANGED    : string
      readonly PROJECTION_CHANGED  : string
      readonly RESIZE              : string
      readonly RIGHT_CLICK         : string
      readonly SHAPE_CHANGED       : string
      readonly TILES_LOADED        : string
      readonly TILT_CHANGED        : string
      readonly TITLE_CHANGED       : string
      readonly VISIBLE_CHANGED     : string
      readonly ZINDEX_CHANGED      : string
      readonly ZOOM_CHANGED        : string
    },
    Alias: {

    }
  }

  interface IDefaultConstants {
    Map: google.maps.MapOptions
  }

  interface IObjectConstants {
    Type: {
      readonly LABEL   : string,
      readonly MAP     : string,
      readonly MARKER  : string,
      readonly POLYGON : string
    },
    Alias: {

    }
  }


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------

  export const Event: IEventConstants = {
    Type: {
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
    },
    Alias: {
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
  }

  export const Default: IDefaultConstants = {
    Map: {
      zoom: 6,
      center: { lat: 37.5, lng: -120 }
    }
  }

  export const Object: IObjectConstants = {
    Type: {
      LABEL   : "Label",
      MAP     : "Map",
      MARKER  : "Marker",
      POLYGON : "Polygon"
    },
    Alias: {
      label    : _C.Object.Type.LABEL,
      labels   : _C.Object.Type.LABEL,
      map      : _C.Object.Type.MAP,
      maps     : _C.Object.Type.MAP,
      marker   : _C.Object.Type.MARKER,
      markers  : _C.Object.Type.MARKER,
      polygon  : _C.Object.Type.POLYGON,
      polygons : _C.Object.Type.POLYGON
    }
  }

}