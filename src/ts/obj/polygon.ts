/// <reference path="../polygon/polygon--bounds.ts" />
/// <reference path="../polygon/polygon--display.ts" />
/// <reference path="../polygon/polygon--remove.ts" />
/// <reference path="../polygon/polygon--reset.ts" />
/// <reference path="../polygon/polygon--update.ts" />
/// <reference path="../constants.ts" />
/// <reference path="baseObject.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: polygon.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _C       = GMH.__gmh__.Constants
  import _Polygon = GMH.__gmh__.Polygon

  
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
      return _Polygon.addListener(this.ID, type, fn)
    }

    public removeAllListeners() {
      return _Polygon.removeAllListeners(this.ID)
    }

    public removeListenerType(type: string) {
      return _Polygon.removeListenerType(this.ID, type)
    }

    public updatePath(path: any) {
      return _Polygon.updatePath(this.ID, path)
    }
  }

}

