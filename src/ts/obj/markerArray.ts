/// <reference path="../marker/marker--listener.ts" />
/// <reference path="../marker/marker--updatePosition.ts" />
/// <reference path="../constants.ts" />
/// <reference path="baseObjectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: markerArray.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _Marker = GMH.__gmh__.Marker


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class MarkerArray extends BaseObjectArray {
    
    constructor() {
      super(Constants.Object.Type.MARKER_ARRAY, Constants.Object.Type.MARKER)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return _Marker.addListener(this.getIDs(), type, fn)
    }

    public removeAllListeners() {
      return _Marker.removeAllListeners(this.getIDs())
    }

    public removeListenerType(type: string) {
      return _Marker.removeListenerType(this.getIDs(), type)
    }

    public updatePosition(position: any) {
      return _Marker.updatePosition(this.getIDs(), position)
    }
  }

}

