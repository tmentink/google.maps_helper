// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: interfaces.ts 
// ------------------------------------------------------------------------


// ------------------------------------------------------------------------
// Function Parameters
// ------------------------------------------------------------------------
interface IAddLabelParms {
  id       : string
  text     : string
  position : any
  options  : IGoogleLabelOptions
}

interface IAddMarkerParms {
  id       : string
  position : any
  options  : google.maps.MarkerOptions
}

interface IAddPolygonParms {
  id      : string
  path    : any
  options : google.maps.PolygonOptions
}


// ------------------------------------------------------------------------
// Global Constants
// ------------------------------------------------------------------------
interface IDefaultConstants {
  Map: google.maps.MapOptions
  Marker?: google.maps.MarkerOptions
  Polygon?: google.maps.PolygonOptions
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
  Properties: {
    readonly CHILD_TYPE    : string
    readonly TYPE          : string
  }
  Type: {
    readonly LABEL         : string
    readonly LABEL_ARRAY   : string
    readonly MAP           : string
    readonly MARKER        : string
    readonly MARKER_ARRAY  : string
    readonly POLYGON       : string
    readonly POLYGON_ARRAY : string
  }
}


// ------------------------------------------------------------------------
// Object Options 
// ------------------------------------------------------------------------
interface IGoogleLabelOptions {
  align        : string
  fontColor    : string
  fontFamily   : string
  fontSize     : number
  strokeColor  : string
  strokeWeight : number
  zIndex       : number
}

