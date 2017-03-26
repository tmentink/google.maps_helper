/// <reference path="../constants.ts" />
/// <reference path="baseObjectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: markerArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class MarkerArray extends BaseObjectArray {
    
    constructor() {
      super(_C.Object.Type.MARKER_ARRAY, _C.Object.Type.MARKER)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Marker.addListener(this.getIDs(), type, fn)
    }

    public removeAllListeners() {
      return GMH.Marker.removeAllListeners(this.getIDs())
    }

    public removeListenerType(type: string) {
      return GMH.Marker.removeListenerType(this.getIDs(), type)
    }

    public updatePosition(position: any) {
      return GMH.Marker.updatePosition(this.getIDs(), position)
    }
  }

}

