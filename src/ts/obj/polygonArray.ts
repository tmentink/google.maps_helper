/// <reference path="../constants.ts" />
/// <reference path="objectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygonArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Defintion 
  // ----------------------------------------------------------------------

  export class PolygonArray extends ObjectArray {
    constructor() {
      super(_C.Object.Type.POLYGON_ARRAY)
    }

    
    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Polygon.addListener(this.getIDs(), type, fn)
    }

    public getBounds() {
      return GMH.Polygon.getBounds(this.getIDs())
    }

    public getCenter() {
      return GMH.Polygon.getCenter(this.getIDs())
    }

    public getGoogleObjects() {
      return GMH.Util.getGoogleObjects(this)
    }

    public getIDs() {
      return GMH.Util.getIDs(this)
    }

    public hide() {
      return GMH.Polygon.hide(this.getIDs())
    }

    public not() {
      return GMH.Util.copy($.Polygon, this.getIDs())
    }

    public remove() {
      return GMH.Polygon.remove(this.getIDs())
    }

    public removeAllListeners() {
      return GMH.Polygon.removeAllListeners(this.getIDs())
    }

    public removeListenerType(type: string) {
      return GMH.Polygon.removeListenerType(this.getIDs(), type)
    }

    public reset() {
      return GMH.Polygon.reset(this.getIDs())
    }

    public show() {
      return GMH.Polygon.show(this.getIDs())
    }

    public toggle() {
      return GMH.Polygon.toggle(this.getIDs())
    }

    public update(options: google.maps.PolygonOptions) {
      return GMH.Polygon.update(this.getIDs(), options)
    }

    public updatePath(path: any) {
      return GMH.Polygon.updatePath(this.getIDs(), path)
    }
  }
}