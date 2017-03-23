/// <reference path="obj/labelArray.ts" />
/// <reference path="obj/markerArray.ts" />
/// <reference path="obj/polygonArray.ts" />

// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: data.ts 
// ------------------------------------------------------------------------
 
namespace GMH.Data {

  export let Map: GMH.Obj.Map                 = undefined
  export const Labels: GMH.Obj.LabelArray     = new GMH.Obj.LabelArray()
  export const Markers: GMH.Obj.MarkerArray   = new GMH.Obj.MarkerArray()
  export const Polygons: GMH.Obj.PolygonArray = new GMH.Obj.PolygonArray()

}