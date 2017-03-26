/// <reference path="../polygon/polygon--listener.ts" />
/// <reference path="../polygon/polygon--updatePath.ts" />
/// <reference path="../constants.ts" />
/// <reference path="baseObjectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: polygonArray.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _Polygon = GMH.__gmh__.Polygon

  
  // ----------------------------------------------------------------------
  // Class Defintion 
  // ----------------------------------------------------------------------

  export class PolygonArray extends BaseObjectArray {
    
    constructor() {
      super(Constants.Object.Type.POLYGON_ARRAY, Constants.Object.Type.POLYGON)
    }

    
    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return _Polygon.addListener(this.getIDs(), type, fn)
    }

    public removeAllListeners() {
      return _Polygon.removeAllListeners(this.getIDs())
    }

    public removeListenerType(type: string) {
      return _Polygon.removeListenerType(this.getIDs(), type)
    }

    public updatePath(path: any) {
      return _Polygon.updatePath(this.getIDs(), path)
    }
  }
  
}

