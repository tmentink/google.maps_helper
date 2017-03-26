/// <reference path="../constants.ts" />
/// <reference path="baseObjectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygonArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Defintion 
  // ----------------------------------------------------------------------

  export class PolygonArray extends BaseObjectArray {
    constructor() {
      super(_C.Object.Type.POLYGON_ARRAY)
    }

    
    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Polygon.addListener(this.getIDs(), type, fn)
    }

    public removeAllListeners() {
      return GMH.Polygon.removeAllListeners(this.getIDs())
    }

    public removeListenerType(type: string) {
      return GMH.Polygon.removeListenerType(this.getIDs(), type)
    }

    public updatePath(path: any) {
      return GMH.Polygon.updatePath(this.getIDs(), path)
    }
  }
  
}