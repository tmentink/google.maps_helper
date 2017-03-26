/// <reference path="../constants.ts" />
/// <reference path="baseObject.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: polygon.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Polygon extends BaseObject{

    constructor(id: string, options: google.maps.PolygonOptions) {
      const obj = new google.maps.Polygon(options)
      super(id, options, obj, _C.Object.Type.POLYGON)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Polygon.addListener(this.ID, type, fn)
    }

    public removeAllListeners() {
      return GMH.Polygon.removeAllListeners(this.ID)
    }

    public removeListenerType(type: string) {
      return GMH.Polygon.removeListenerType(this.ID, type)
    }

    public updatePath(path: any) {
      return GMH.Polygon.updatePath(this.ID, path)
    }
  }

}

