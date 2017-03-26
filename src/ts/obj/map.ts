/// <reference path="../map/map--bounds.ts" />
/// <reference path="../map/map--listener.ts" />
/// <reference path="../map/map--update.ts" />
/// <reference path="../constants.ts" />
/// <reference path="../data.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v2.0.0: map.ts 
// ------------------------------------------------------------------------

namespace GMH.__gmh__.Obj {

  import _C   = GMH.__gmh__.Constants
  import _D   = GMH.__gmh__.Data
  import _Map = GMH.__gmh__.Map


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
        Parent: function() { return _D.Map } 
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
      return _Map.addListener(type, fn)
    }

    public getCenter() {
      return _Map.getCenter()
    }

    public removeAllListeners() {
      return _Map.removeAllListeners()
    }

    public removeListenerType(type: string) {
      return _Map.removeListenerType(type)
    }

    public reset() {
      return _Map.reset()
    }

    public setBounds(type: string | Object[], ids) {
      return _Map.setBounds(type, ids)
    }

    public update(options: google.maps.MapOptions) {
      return _Map.update(options)
    }
  }

}

