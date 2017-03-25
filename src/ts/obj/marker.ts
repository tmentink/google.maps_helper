/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: marker.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Marker {
    ID: string
    Init: {
      Options: google.maps.MarkerOptions
    }
    Obj: google.maps.Marker
    Type: string 

    constructor(id: string, options: google.maps.MarkerOptions) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = new google.maps.Marker(options)
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return $.Marker[id] }
      }
      this.Type = _C.Object.Type.MARKER
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public addListener(type: string, fn: Function) {
      return GMH.Marker.addListener(this.ID, type, fn)
    }

    public getBounds() {
      return GMH.Marker.getBounds(this.ID)
    }

    public getCenter() {
      return GMH.Marker.getCenter(this.ID)
    }

    public hide() {
      return GMH.Marker.hide(this.ID)
    }

    public not() {
      return GMH.Util.copy($.Marker, this.ID)
    }

    public remove() {
      return GMH.Marker.remove(this.ID)
    }

    public removeAllListeners() {
      return GMH.Marker.removeAllListeners(this.ID)
    }

    public removeListenerType(type: string) {
      return GMH.Marker.removeListenerType(this.ID, type)
    }

    public reset() {
      return GMH.Marker.reset(this.ID)
    }

    public show() {
      return GMH.Marker.show(this.ID)
    }

    public toggle() {
      return GMH.Marker.toggle(this.ID)
    }

    public update(options: google.maps.MarkerOptions) {
      return GMH.Marker.update(this.ID, options)
    }

    public updatePosition(position: any) {
      return GMH.Marker.updatePosition(this.ID, position)
    }
  }

}

