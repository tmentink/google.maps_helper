// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: googleLabel.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {
  
  
  // ----------------------------------------------------------------------
  // Constants 
  // ----------------------------------------------------------------------
  
  const Property = {
    ALIGN         : "align",
    FONT_COLOR    : "fontColor",
    FONT_FAMILY   : "fontFamily",
    FONT_SIZE     : "fontSize",
    MAX_ZOOM      : "maxZoom",
    MIN_ZOOM      : "minZoom",
    POSITION      : "position",
    STROKE_WEIGHT : "strokeWeight",
    STROKE_COLOR  : "strokeColor",
    TEXT          : "text",
    Z_INDEX       : "zIndex"
  }

  const Default = {
    ALIGN         : "center",
    FONT_COLOR    : "#000",
    FONT_FAMILY   : "sans-serif",
    FONT_SIZE     : 14,
    STROKE_WEIGHT : 2,
    STROKE_COLOR  : "#FFF",
    Z_INDEX       : 1e3
  }


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export const googleLabel = function(options) {
    for (var prop in Default) {
      this.set(Property[prop], Default[prop])
    }
    this.setValues(options)
  }
  googleLabel.prototype = new google.maps.OverlayView


  googleLabel.prototype.changed = function(prop) {
    switch (prop) {
      case Property.ALIGN:
      case Property.FONT_COLOR:
      case Property.FONT_FAMILY:
      case Property.FONT_SIZE:
      case Property.STROKE_WEIGHT:
      case Property.STROKE_COLOR:
      case Property.TEXT:
        return this.drawCanvas_()

      case Property.MAX_ZOOM:
      case Property.MIN_ZOOM:
      case Property.POSITION:
        return this.draw()
    }
  }


  googleLabel.prototype.drawCanvas_ = function() {
    const canvas = this.canvas_
    if (!canvas) return

    const style  = canvas.style
    style.zIndex = (this.get(Property.Z_INDEX))

    const ctx = canvas.getContext("2d")
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.strokeStyle = this.get(Property.STROKE_COLOR)
    ctx.fillStyle   = this.get(Property.FONT_COLOR)
    ctx.font        = this.get(Property.FONT_SIZE) + "px " + this.get(Property.FONT_FAMILY)

    const strokeWeight = Number(this.get(Property.STROKE_WEIGHT))

    const text = this.get(Property.TEXT).toString()
    if (text) {
      if (strokeWeight) {
        ctx.lineWidth = strokeWeight
        ctx.strokeText(text, strokeWeight, strokeWeight)
      }

      ctx.fillText(text, strokeWeight, strokeWeight)

      const textMeasure = ctx.measureText(text)
      const textWidth = textMeasure.width + strokeWeight
      style.marginLeft = this.getMarginLeft_(textWidth) + "px"
      style.marginTop = "-0.4em"
    }
  }

  googleLabel.prototype.onAdd = function() {
    const canvas = this.canvas_ = document.createElement("canvas")
    const style = canvas.style
    style.position = "absolute"

    const ctx = canvas.getContext("2d")
    ctx.lineJoin = "round"
    ctx.textBaseline = "top"

    this.drawCanvas_()

    const panes = this.getPanes()
    if (panes) {
      panes.floatPane.appendChild(canvas)
    }
  }
  
  googleLabel.prototype.getMarginLeft_ = function(textWidth) {
    switch (this.get(Property.ALIGN)) {
      case "left":
        return 0
      case "right":
        return -textWidth
    }
    return textWidth / -2
  }

  googleLabel.prototype.draw = function() {
    const projection = this.getProjection()

    if (!projection) {
      return
    }

    if (!this.canvas_) {
      return
    }

    const latLng = (this.get(Property.POSITION))
    if (!latLng) {
      return
    }
    const pos = projection.fromLatLngToDivPixel(latLng)

    const style = this.canvas_.style
    style["top"] = pos.y + "px"
    style["left"] = pos.x + "px"
    style["visibility"] = this.getVisible_()
  }

  googleLabel.prototype.getVisible_ = function() {
    const minZoom = (this.get(Property.MIN_ZOOM))
    const maxZoom = (this.get(Property.MAX_ZOOM))

    if (minZoom === undefined && maxZoom === undefined) {
      return ""
    }

    const map = this.getMap()
    if (!map) {
      return ""
    }

    const mapZoom = map.getZoom()
    if (mapZoom < minZoom || mapZoom > maxZoom) {
      return "hidden"
    }
    return ""
  }

  googleLabel.prototype.onRemove = function() {
    const canvas = this.canvas_
    if (canvas && canvas.parentNode) {
      canvas.parentNode.removeChild(canvas)
    }
  }
  
}

