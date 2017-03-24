// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: constants.ts 
// ------------------------------------------------------------------------

namespace GMH._C {


  // ----------------------------------------------------------------------
  // Interfaces 
  // ----------------------------------------------------------------------

  interface IDefaultConstants {
    Map: google.maps.MapOptions
  }

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
    }
  }

  interface IObjectConstants {
    Type: {
      readonly LABEL         : string,
      readonly LABEL_ARRAY   : string,
      readonly MAP           : string,
      readonly MARKER        : string,
      readonly MARKER_ARRAY  : string
      readonly POLYGON       : string
      readonly POLYGON_ARRAY : string
    }
  }


  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------

  export const Default: IDefaultConstants = {
    Map: {
      zoom: 6,
      center: { lat: 37.5, lng: -120 }
    }
  }

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
    }
  }

  export const Object: IObjectConstants = {
    Type: {
      LABEL         : "Label",
      LABEL_ARRAY   : "LabelArray",
      MAP           : "Map",
      MARKER        : "Marker",
      MARKER_ARRAY  : "MarkerArray",
      POLYGON       : "Polygon",
      POLYGON_ARRAY : "PolygonArray"
    }
  }

}