/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: map.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition 
  // ----------------------------------------------------------------------

  export class Map {
    Init: {
      Bounds: google.maps.LatLngBounds
      Options: google.maps.MapOptions
    }
    Type: string
    Obj: google.maps.Map

    constructor(containerID: string, options: google.maps.MapOptions) {
      this.Init = {
        Bounds: undefined,
        Options: options
      }
      this.Obj = new google.maps.Map(document.getElementById(containerID), options)
      this.Obj["GMH"] = { 
        Parent: function() { return GMH._D.Map } 
      }
      this.Type = _C.Object.Type.MAP

      // Save bounds after map has finished loading
      google.maps.event.addListenerOnce(this.Obj, _C.Event.Type.TILES_LOADED, () =>{
        this.Init.Bounds = this.Obj.getBounds()
      })
    }


    // --------------------------------------------------------------------
    // Public Methods 
    // --------------------------------------------------------------------
    
    public addListener(type: string, fn: Function) {
      return GMH.Map.addListener(type, fn)
    }

    public getCenter() {
      return GMH.Map.getCenter()
    }

    public removeAllListeners() {
      return GMH.Map.removeAllListeners()
    }

    public removeListenerType(type: string) {
      return GMH.Map.removeListenerType(type)
    }

    public reset() {
      return GMH.Map.reset()
    }

    public setBounds(type: string | Object[], ids) {
      return GMH.Map.setBounds(type, ids)
    }

    public update(options: google.maps.MapOptions) {
      return GMH.Map.update(options)
    }
  }

}

