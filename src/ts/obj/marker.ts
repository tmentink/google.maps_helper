/// <reference path="../marker/marker--bounds.ts" />
/// <reference path="../marker/marker--display.ts" />
/// <reference path="../marker/marker--remove.ts" />
/// <reference path="../marker/marker--reset.ts" />
/// <reference path="../marker/marker--update.ts" />
/// <reference path="../constants.ts" />
/// <reference path="baseObject.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _C      = GMH.__gmh__.Constants
  import _Marker = GMH.__gmh__.Marker


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Marker extends BaseObject {

    constructor(id: string, options: google.maps.MarkerOptions) {
      const obj = new google.maps.Marker(options)
      super(id, options, obj, _C.Object.Type.MARKER)
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return _Marker.addListener(this.ID, type, fn)
    }

    public removeAllListeners() {
      return _Marker.removeAllListeners(this.ID)
    }

    public removeListenerType(type: string) {
      return _Marker.removeListenerType(this.ID, type)
    }

    public updatePosition(position: any) {
      return _Marker.updatePosition(this.ID, position)
    }
  }

}

