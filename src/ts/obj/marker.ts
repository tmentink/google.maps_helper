/// <reference path="../constants.ts" />
/// <reference path="baseObject.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Marker extends BaseObject {

    constructor(id: string, options: google.maps.MarkerOptions) {
      const obj = new google.maps.Marker(options)
      super(id, options, obj, _C.Object.Type.LABEL)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Marker.addListener(this.ID, type, fn)
    }

    public removeAllListeners() {
      return GMH.Marker.removeAllListeners(this.ID)
    }

    public removeListenerType(type: string) {
      return GMH.Marker.removeListenerType(this.ID, type)
    }

    public updatePosition(position: any) {
      return GMH.Marker.updatePosition(this.ID, position)
    }
  }

}

