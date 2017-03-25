/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Polygon {
    ID: string
    Init: {
      Options: google.maps.PolygonOptions
    }
    Obj: google.maps.Polygon
    Type: string 

    constructor(id: string, options: google.maps.PolygonOptions) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = new google.maps.Polygon(options)
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return $.Polygon[id] }
      }
      this.Type = _C.Object.Type.POLYGON
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Polygon.addListener(this.ID, type, fn)
    }

    public getBounds() {
      return GMH.Polygon.getBounds(this.ID)
    }

    public getCenter() {
      return GMH.Polygon.getCenter(this.ID)
    }

    public hide() {
      return GMH.Polygon.hide(this.ID)
    }

    public not() {
      return GMH.Util.copy($.Polygon, this.ID)
    }

    public remove() {
      return GMH.Polygon.remove(this.ID)
    }

    public removeAllListeners() {
      return GMH.Polygon.removeAllListeners(this.ID)
    }

    public removeListenerType(type: string) {
      return GMH.Polygon.removeListenerType(this.ID, type)
    }

    public reset() {
      return GMH.Polygon.reset(this.ID)
    }

    public show() {
      return GMH.Polygon.show(this.ID)
    }

    public toggle() {
      return GMH.Polygon.toggle(this.ID)
    }

    public update(options: google.maps.PolygonOptions) {
      return GMH.Polygon.update(this.ID, options)
    }

    public updatePath(path: any) {
      return GMH.Polygon.updatePath(this.ID, path)
    }
  }

}

