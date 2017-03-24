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

    constructor(containerID:string, options: {}) {
      this.Init = {
        Bounds: undefined,
        Options: options
      }
      this.Type = _C.Object.Type.MAP
      this.Obj = new google.maps.Map(document.getElementById(containerID), options)
      this.Obj["GMH"] = { Parent: function() { return GMH.$.Map } }

      // Save bounds after map has finished loading
      google.maps.event.addListenerOnce(this.Obj, _C.Event.Type.TILES_LOADED, () =>{
        this.Init.Bounds = this.Obj.getBounds()
      })
    }
  }
}

