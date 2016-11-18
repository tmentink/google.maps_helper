
// ===========================================
// Object - Google Label
// ===========================================
  
  var GMH = (function(GMH) {
    "use strict";
  
    // GMH Object Namespace
    // =======================================
    if (typeof GMH.Object == "undefined") {
      GMH.Object = {};
    } 


    // Google Label Object
    // =======================================
    var googleLabel = function(options) {
      this.set("fontFamily", "sans-serif");
      this.set("fontSize", 14);
      this.set("fontColor", "#000");
      this.set("strokeWeight", 2);
      this.set("strokeColor", "#FFF");
      this.set("align", "center");
      this.set("zIndex", 1e3);

      this.setValues(options);
    };
    googleLabel.prototype = new google.maps.OverlayView;
    

    googleLabel.prototype.changed = function(prop) {
      switch (prop) {
        case "fontFamily":
        case "fontSize":
        case "fontColor":
        case "strokeWeight":
        case "strokeColor":
        case "align":
        case "text":
          return this.drawCanvas_();
        case "maxZoom":
        case "minZoom":
        case "position":
          return this.draw();
      }
    };


    googleLabel.prototype.drawCanvas_ = function() {
      var canvas = this.canvas_;
      if (!canvas) return;

      var style = canvas.style;
      style.zIndex = (this.get("zIndex"));

      var ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.strokeStyle = this.get("strokeColor");
      ctx.fillStyle = this.get("fontColor");
      ctx.font = this.get("fontSize") + "px " + this.get("fontFamily");

      var strokeWeight = Number(this.get("strokeWeight"));

      var text = this.get("text").toString();
      if (text) {
        if (strokeWeight) {
          ctx.lineWidth = strokeWeight;
          ctx.strokeText(text, strokeWeight, strokeWeight);
        }

        ctx.fillText(text, strokeWeight, strokeWeight);

        var textMeasure = ctx.measureText(text);
        var textWidth = textMeasure.width + strokeWeight;
        style.marginLeft = this.getMarginLeft_(textWidth) + "px";
        style.marginTop = "-0.4em";
      }
    };


    googleLabel.prototype.onAdd = function() {
      var canvas = this.canvas_ = document.createElement("canvas");
      var style = canvas.style;
      style.position = "absolute";

      var ctx = canvas.getContext("2d");
      ctx.lineJoin = "round";
      ctx.textBaseline = "top";

      this.drawCanvas_();

      var panes = this.getPanes();
      if (panes) {
        panes.floatPane.appendChild(canvas);
      }
    };
    

    googleLabel.prototype.getMarginLeft_ = function(textWidth) {
      switch (this.get("align")) {
        case "left":
          return 0;
        case "right":
          return -textWidth;
      }
      return textWidth / -2;
    };


    googleLabel.prototype.draw = function() {
      var projection = this.getProjection();

      if (!projection) {
        return;
      }

      if (!this.canvas_) {
        return;
      }

      var latLng = (this.get("position"));
      if (!latLng) {
        return;
      }
      var pos = projection.fromLatLngToDivPixel(latLng);

      var style = this.canvas_.style;

      style["top"] = pos.y + "px";
      style["left"] = pos.x + "px";

      style["visibility"] = this.getVisible_();
    };


    googleLabel.prototype.getVisible_ = function() {
      var minZoom = (this.get("minZoom"));
      var maxZoom = (this.get("maxZoom"));

      if (minZoom === undefined && maxZoom === undefined) {
        return "";
      }

      var map = this.getMap();
      if (!map) {
        return "";
      }

      var mapZoom = map.getZoom();
      if (mapZoom < minZoom || mapZoom > maxZoom) {
        return "hidden";
      }
      return "";
    };


    googleLabel.prototype.onRemove = function() {
      var canvas = this.canvas_;
      if (canvas && canvas.parentNode) {
        canvas.parentNode.removeChild(canvas);
      }
    };

    
    // Expose Public Objects
    // =======================================
    GMH.Object.googleLabel = googleLabel;


    return GMH;
  })(GMH || {});

