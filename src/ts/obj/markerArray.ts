/// <reference path="../constants.ts" />
/// <reference path="objectArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: markerArray.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class MarkerArray extends ObjectArray {
    constructor() {
      super(_C.Object.Type.MARKER_ARRAY)
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Marker.addListener(this.getIDs(), type, fn)
    }

    public getBounds() {
      return GMH.Marker.getBounds(this.getIDs())
    }

    public getCenter() {
      return GMH.Marker.getCenter(this.getIDs())
    }

    public getGoogleObjects() {
      return GMH.Util.getGoogleObjects(this)
    }

    public getIDs() {
      return GMH.Util.getIDs(this)
    }

    public hide() {
      return GMH.Marker.hide(this.getIDs())
    }

    public not() {
      return GMH.Util.copy($.Marker, this.getIDs())
    }

    public remove() {
      return GMH.Marker.remove(this.getIDs())
    }

    public removeAllListeners() {
      return GMH.Marker.removeAllListeners(this.getIDs())
    }

    public removeListenerType(type: string) {
      return GMH.Marker.removeListenerType(this.getIDs(), type)
    }

    public reset() {
      return GMH.Marker.reset(this.getIDs())
    }

    public show() {
      return GMH.Marker.show(this.getIDs())
    }

    public toggle() {
      return GMH.Marker.toggle(this.getIDs())
    }

    public update(options: google.maps.MarkerOptions) {
      return GMH.Marker.update(this.getIDs(), options)
    }

    public updatePosition(position: any) {
      return GMH.Marker.updatePosition(this.getIDs(), position)
    }
  }

}