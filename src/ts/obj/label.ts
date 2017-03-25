/// <reference path="../constants.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: label.ts 
// ------------------------------------------------------------------------

namespace GMH.Obj {


  // ----------------------------------------------------------------------
  // Class Definition
  // ----------------------------------------------------------------------

  export class Label {
    ID: string
    Init: {
      Options: IGoogleLabelOptions
    }
    Obj: google.maps.OverlayView
    Type: string 

    constructor(id: string, options: IGoogleLabelOptions) {
      this.ID = id
      this.Init = {
        Options: options
      }
      this.Obj = new Obj.googleLabel(options)
      this.Obj["GMH"] = { 
        ID: id,
        Parent: function(){ return $.Label[id] }
      }
      this.Type = _C.Object.Type.LABEL
    }


    // ----------------------------------------------------------------------
    // Public Methods 
    // ----------------------------------------------------------------------

    public getBounds() {
      return GMH.Label.getBounds(this.ID)
    }

    public getCenter() {
      return GMH.Label.getCenter(this.ID)
    }

    public hide() {
      return GMH.Label.hide(this.ID)
    }

    public not() {
      return GMH.Util.copy($.Label, this.ID)
    }

    public remove() {
      return GMH.Label.remove(this.ID)
    }

    public reset() {
      return GMH.Label.reset(this.ID)
    }

    public show() {
      return GMH.Label.show(this.ID)
    }

    public toggle() {
      return GMH.Label.toggle(this.ID)
    }

    public update(options: IGoogleLabelOptions) {
      return GMH.Label.update(this.ID, options)
    }

    public updatePosition(position: any) {
      return GMH.Label.updatePosition(this.ID, position)
    }
  }

}