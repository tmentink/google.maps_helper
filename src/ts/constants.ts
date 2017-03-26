// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: constants.ts 
// ------------------------------------------------------------------------

namespace GMH._C {


  // ----------------------------------------------------------------------
  // Public Constants 
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
    Properties: {
      CHILD_TYPE    : "ChildType",
      TYPE          : "Type"
    },
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

