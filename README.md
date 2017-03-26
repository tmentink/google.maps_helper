<h4 align="center">
<b><a href="#getting-started">Getting Started</a></b>
|
<b><a href="http://projects.trentmentink.com/google_maps_helper/">Demo</a></b>
|
<b><a href="#documentation">Documentation</a></b>
|
<b><a href="#credits">Credits</a></b>
|
<b><a href="#license">License</a></b>
|
<b><a href="http://www.trentmentink.com">Author</a></b>
</h4>

![Google Maps Helper](https://s26.postimg.org/b8g6ryr3d/google_maps_helper_short.png)

## Getting Started

Add [Google Maps JavaScript API v3](https://developers.google.com/maps/documentation/javascript/)
```html
<script type="text/javascript" src="https://maps.googleapis.com/maps/api/js?v=3.exp"></script>
```

Download and add [Google Maps Helper](https://raw.githubusercontent.com/tmentink/google.maps_helper/master/dist/google.maps-helper.min.js)
```html
<script type="text/javascript" src="google.maps-helper.min.js"></script>
```

## Demo
Here is a [demo](http://projects.trentmentink.com/projects/google_maps_helper/) showing how the library would be used in a "real-life" scenario.
<br>
More demos showcasing specific features and methods are coming soon!


## Documentation
<ul>
  <li><a href="#data">Data</a></li>
  <li>
    <a href="#defaults">Defaults</a>
    <ul>
      <li><a href="#defaults-set">set</a></li>
      <li><a href="#defaults-update">update</a></li>
    </ul>
  </li>
  <li>
    <a href="#utility">Utility</a>
    <ul>
      <li><a href="#utility-copy">copy</a></li>
      <li><a href="#utility-getIDs">getIDs</a></li>
      <li><a href="#utility-toLatLng">toLatLng</a></li>
      <li><a href="#utility-toLatLngArray">toLatLngArray</a></li>
    </ul>
  </li>
  <li>
    <a href="#map">Map</a>
    <ul>
      <li><a href="#map-init">init</a></li>
      <li><a href="#map-reset">reset</a></li>
      <li><a href="#map-update">update</a></li>
      <li><a href="#map-setBounds">setBounds</a></li>
      <li><a href="#map-addListener">addListener</a></li>
      <li><a href="#map-removeListenerType">removeListenerType</a></li>
      <li><a href="#map-removeAllListeners">removeAllListeners</a></li>
    </ul>
  </li>
  <li>
    <a href="#label">Label</a>
    <ul>
      <li><a href="#label-add">add</a></li>
      <li><a href="#label-delete">delete</a></li>
      <li><a href="#label-hide">hide</a></li>
      <li><a href="#label-show">show</a></li>
      <li><a href="#label-toggle">toggle</a></li>
      <li><a href="#label-reset">reset</a></li>
      <li><a href="#label-update">update</a></li>
      <li><a href="#label-updatePosition">updatePosition</a></li>
      <li><a href="#label-getBounds">getBounds</a></li>
      <li><a href="#label-getCenter">getCenter</a></li>
    </ul>
  </li>
  <li>
    <a href="#marker">Marker</a>
    <ul>
      <li><a href="#marker-add">add</a></li>
      <li><a href="#marker-delete">delete</a></li>
      <li><a href="#marker-hide">hide</a></li>
      <li><a href="#marker-show">show</a></li>
      <li><a href="#marker-toggle">toggle</a></li>
      <li><a href="#marker-reset">reset</a></li>
      <li><a href="#marker-update">update</a></li>
      <li><a href="#marker-updatePosition">updatePosition</a></li>
      <li><a href="#marker-getBounds">getBounds</a></li>
      <li><a href="#marker-getCenter">getCenter</a></li>
      <li><a href="#marker-addListener">addListener</a></li>
      <li><a href="#marker-removeListenerType">removeListenerType</a></li>
      <li><a href="#marker-removeAllListeners">removeAllListeners</a></li>
    </ul>
  </li>
  <li>
    <a href="#polygon">Polygon</a>
    <ul>
      <li><a href="#polygon-add">add</a></li>
      <li><a href="#polygon-delete">delete</a></li>
      <li><a href="#polygon-hide">hide</a></li>
      <li><a href="#polygon-show">show</a></li>
      <li><a href="#polygon-toggle">toggle</a></li>
      <li><a href="#polygon-reset">reset</a></li>
      <li><a href="#polygon-update">update</a></li>
      <li><a href="#polygon-updatePath">updatePath</a></li>
      <li><a href="#polygon-getBounds">getBounds</a></li>
      <li><a href="#polygon-getCenter">getCenter</a></li>
      <li><a href="#polygon-addListener">addListener</a></li>
      <li><a href="#polygon-removeListenerType">removeListenerType</a></li>
      <li><a href="#polygon-removeAllListeners">removeAllListeners</a></li>
    </ul>
  </li>
</ul>


### Data
Whenever a new GMH object is created, it is automatically stored in the Data class by **type** and **id**.

Currently you are only allowed to use one map.

```javascript
Data.Map = object

Data.Marker = {
  id: object,
  id: object
}

Data.Polygon = {
  id: object,
  id: object
}
```

<p align="right"><a href="#documentation">:arrow_up:</a></p>
### Defaults

The default options for each object type are stored here.

* [Map Options](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions)
* [Marker Options](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions)
* [Polygon Options](https://developers.google.com/maps/documentation/javascript/3.exp/reference#PolygonOptions)

<h4 id="defaults-set">set(type, options)</h4>
Completely replaces the defaults with the user supplied options.

```javascript
// Before
GMH.Defaults.Polygon = {
  strokeColor: '#000',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: '#1984AE',
  fillOpacity: 0.8
}

// Set
GMH.Defaults.set("polygon", {fillColor: "#000"});

// After
GMH.Defaults.Polygon = {
  fillColor: '#000'
}
```

<h4 id="defaults-update">update(type, options)</h4>
Merges the defaults with the user supplied options.

```javascript
// Before
GMH.Defaults.Polygon = {
  strokeColor: '#000',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: '#1984AE',
  fillOpacity: 0.8
}

// Update
GMH.Defaults.update("polygon", {fillColor: "#000"});

// After
GMH.Defaults.Polygon = {
  strokeColor: '#000',
  strokeOpacity: 0.8,
  strokeWeight: 1,
  fillColor: '#000',
  fillOpacity: 0.8
}
```

<p align="right"><a href="#documentation">:arrow_up:</a></p>
### Utility

<h4 id="utility-copy">copy(source, exclude)</h4>
Returns a copy of the `source` minus the values of `exclude`

* `exclude` can be a comma separated string, an array or an object

```javascript
GMH.Data.Polygon = {
  0: polygon,
  1: polygon,
  "removeMe": polygon,
  "andMeToo": polygon
};

var remove = {
  "removeMe": polygon,
  "andMeToo": polygon
};

GMH.Utility.copy(GMH.Data.Polygon, "removeMe, andMeToo");

GMH.Utility.copy(GMH.Data.Polygon, ["removeMe", "andMeToo"]);

GMH.Utility.copy(GMH.Data.Polygon, remove);

// all three return 
{ 0: polygon, 1: polygon }
```

<h4 id="utility-getIDs">getIDs(obj)</h4>
Returns an array of the object's ids

```javascript
GMH.Data.Marker = {
  0: marker,
  1: marker,
  "myMarkerID": marker
};

GMH.Utility.getIDs(GMH.Data.Marker);

// returns
[0,1,"myMarkerID"]
```

<h4 id="utility-toLatLng">toLatLng(str)</h4>
Converts a comma separated string into a [google.maps.LatLng](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLng) object

* The `,` is used to split the Lat and Lng

```javascript
var formattedStr = "1.618, 3.1415";

GMH.Utility.toLatLng(formattedStr);
```

<h4 id="utility-toLatLngArray">toLatLngArray(str)</h4>
Converts a specifically formatted string into an array of [google.maps.LatLng](https://developers.google.com/maps/documentation/javascript/3.exp/reference#LatLng) objects

* The `|` is used to split the LatLng pairs.
* The `,` is used to split the Lat and Lng

```javascript
var formattedStr = "25.774, -80.190|18.466, -66.118|32.321, -64.757|25.774, -80.190";

GMH.Utility.toLatLngArray(formattedStr);
```

<p align="right"><a href="#documentation">:arrow_up:</a></p>
### Map

<h4 id="map-init">init(container, options)</h4>
Creates a map in the given HTML container and stores a reference in **GMH.Data.Map**

* Container must be the id of a HTML element, typically a **DIV** 
* [Options](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MapOptions) are merged with **GMH.Defaults.Map**

```javascript
// map with default options
GMH.Map.init("map");

// map with user options
GMH.Map.init("map", {zoom: 6});
```


<h4 id="map-reset">reset()</h4>
Resets the map back to its intialized sate

```javascript
GMH.Map.reset();
```


<h4 id="map-update">update(options)</h4>
Updates the map's options 

* If options is null, the map's options will be set to **GMH.Defaults.Map**

```javascript
// default options
GMH.Map.update();

// user options
GMH.Map.update({zoom: 8, mapTypeId: google.maps.MapTypeId.HYBRID});

```


<h4 id="map-setBounds">setBounds(type, id)</h4>
Sets the map's bounds to objects in **GMH.Data**

* Pass in "init" or "initial" to reset map bounds to when it was first initialized
* Can leave id null to select all objects of that type

```javascript
// set to bounds when map was initialized
GMH.Map.setBounds("init");

// single type and id
GMH.Map.setBounds("polygon", 0);

// single type and multiple ids
GMH.Map.setBounds("polygon", [0,1,2,"myPolyID"]);

// single type and all ids
GMH.Map.setBounds("marker");

// multiple types and ids
GMH.Map.setBounds([
 { marker: "myMarkerID" },
 { polygon: [0,1,2, "myPolyID"] }
]);

// multiple types and all ids
GMH.Map.setBounds([
 { marker: null },
 { polygon: null }
]);
```

<h4 id="map-addListener">addListener(type, fn)</h4>
Adds an event listener to the map

```javascript
// single listener
GMH.Map.addListener("click", function(){alert("Click!")});

// multiple listeners
GMH.Map.addListener([
  { click: function(){alert("Click")} },
  { rightclick: function(){alert("Right Click")} }
]);
```

<h4 id="map-removeListenerType">removeListenerType(type)</h4>
Removes all the listeners of the specified type from the map

```javascript
// single listener
GMH.Map.removeListenerType("click");

// multiple listeners
GMH.Map.removeListenerType(["click", "right click"]);
```

<h4 id="map-removeAllListeners">removeAllListeners()</h4>
Removes all the listeners from the map

```javascript
GMH.Map.removeAllListeners();
```


<p align="right"><a href="#documentation">:arrow_up:</a></p>
### Label

<h4 id="label-add">add(id, text, position, options)</h4>
Creates a label object, adds it to the map and then stores a reference in **GMH.Data.label**

* If id is null, it will use an auto-incrementing id
* If text is null, it will use the id
* If position is a string, it will use **GMH.Utility.toLatLng()**
* Options are merged with **GMH.Defaults.label**
  * fontSize
  * fontColor
  * fontFamily
  * strokeColor
  * strokeWeight
  * align
  * zIndex

```javascript
// string position and default options
GMH.Label.add(0, "My Label", "1.618, 3.1415");

// auto id, text, and user options
GMH.Label.add(null, null, {lat: 1.618, lng: 3.1415}, {fontSize: 12});

// multiple labels
GMH.Label.add([
  { id: null, text: null, position: "1.618, 3.1415" },
  { id: "mylabel", text: "Hello" position: {lat: 1.618, lng: 3.1415} },
  { id: 1, text: "This is a label" position: "33,43", options: {fontSize: 12, align: center} }
]);
```

<h4 id="label-delete">delete(id)</h4>
Removes the label(s) from the map and **GMH.Data.label**

```javascript
// single label
GMH.Label.delete(0);

// multiple labels
GMH.Label.delete(["myLabelID", 0,1]);
```

<h4 id="label-hide">hide(id)</h4>
Sets the label's visibility to false

```javascript
// single label
GMH.Label.hide(0);

// multiple labels
GMH.Label.hide(["myLabelID", 0,1]);
```

<h4 id="label-show">show(id)</h4>
Sets the label's visibility to true

```javascript
// single label
GMH.Label.show(0);

// multiple labels
GMH.Label.show(["myLabelID", 0,1]);
```

<h4 id="label-toggle">toggle(id)</h4>
Toggles the label's visibility

```javascript
// single label
GMH.Label.toggle(0);

// multiple labels
GMH.Label.toggle(["myLabelID", 0,1]);
```

<h4 id="label-reset">reset(id)</h4>
Reset the label to its intial state

```javascript
// single label
GMH.Label.reset(0);

// multiple labels
GMH.Label.reset(["myLabelID", 0,1]);
```


<h4 id="label-update">update(id, options)</h4>
Updates the label's options 

* If options is null, the label's options will be set to **GMH.Defaults.label**

```javascript
// single label
GMH.Label.update(0, {strokeWeight: 2});

// single label with defaults
GMH.Label.update(0);

// multiple labels
GMH.Label.update([0,1,"myLabelID"], {strokeColor: "#000"});
```

<h4 id="label-updatePosition">updatePosition(id, position)</h4>
Updates the label's position 

* If position is a string, it will use **GMH.Utility.toLatLng()** 

```javascript
// single label
GMH.Label.updatePosition(0, "33,43");

// multiple labels
GMH.Label.updatePosition([0,1], "33,43");
```


<h4 id="label-getBounds">getBounds(id)</h4>
Returns the bounds of the label(s)

```javascript
// single label
GMH.Label.getBounds(0);

// multiple labels
GMH.Label.getBounds(["myLabelID", 0,1]);
```


<h4 id="label-getCenter">getCenter(id)</h4>
Returns the center of the label(s)

```javascript
// single label
GMH.Label.getCenter(0);

// multiple labels
GMH.Label.getCenter(["myLabelID", 0,1]);
```


<p align="right"><a href="#documentation">:arrow_up:</a></p>
### Marker

<h4 id="marker-add">add(id, position, options)</h4>
Creates a marker object, adds it to the map and then stores a reference in **GMH.Data.Marker**

* If id is null, it will use an auto-incrementing id
* If position is a string, it will use **GMH.Utility.toLatLng()**
* [Options](https://developers.google.com/maps/documentation/javascript/3.exp/reference#MarkerOptions) are merged with **GMH.Defaults.Marker**

```javascript
// string position and default options
GMH.Marker.add("myMarkerID", "1.618, 3.1415");

// auto id and user options
GMH.Marker.add(null, {lat: 1.618, lng: 3.1415}, {title: "My Marker"});

// multiple markers
GMH.Marker.add([
  { id: null, position: "1.618, 3.1415" },
  { id: "myMarker", position: {lat: 1.618, lng: 3.1415} },
  { id: 1, position: "33,43", options: {title: "My Marker"} }
]);
```

<h4 id="marker-delete">delete(id)</h4>
Removes the marker(s) from the map and **GMH.Data.Marker**

```javascript
// single marker
GMH.Marker.delete(0);

// multiple markers
GMH.Marker.delete(["myMarkerID", 0,1]);
```

<h4 id="marker-hide">hide(id)</h4>
Sets the marker's visibility to false

```javascript
// single marker
GMH.Marker.hide(0);

// multiple markers
GMH.Marker.hide(["myMarkerID", 0,1]);
```

<h4 id="marker-show">show(id)</h4>
Sets the marker's visibility to true

```javascript
// single marker
GMH.Marker.show(0);

// multiple markers
GMH.Marker.show(["myMarkerID", 0,1]);
```

<h4 id="marker-toggle">toggle(id)</h4>
Toggles the marker's visibility

```javascript
// single marker
GMH.Marker.toggle(0);

// multiple markers
GMH.Marker.toggle(["myMarkerID", 0,1]);
```

<h4 id="marker-reset">reset(id)</h4>
Reset the marker to its intial state

```javascript
// single marker
GMH.Marker.reset(0);

// multiple markers
GMH.Marker.reset(["myMarkerID", 0,1]);
```


<h4 id="marker-update">update(id, options)</h4>
Updates the marker's options 

* If options is null, the marker's options will be set to **GMH.Defaults.Marker**

```javascript
// single marker
GMH.Marker.update(0, {title: "myTitle"});

// single marker with defaults
GMH.Marker.update(0);

// multiple markers
GMH.Marker.update([0,1,"myMarkerID"], {title: "myTitle"});
```

<h4 id="marker-updatePosition">updatePosition(id, position)</h4>
Updates the marker's position 

* If position is a string, it will use **GMH.Utility.toLatLng()** 

```javascript
// single marker
GMH.Marker.updatePosition(0, "33,43");

// multiple markers
GMH.Marker.updatePosition([0,1], "33,43");
```


<h4 id="marker-getBounds">getBounds(id)</h4>
Returns the bounds of the marker(s)

```javascript
// single marker
GMH.Marker.getBounds(0);

// multiple markers
GMH.Marker.getBounds(["myMarkerID", 0,1]);
```


<h4 id="marker-getCenter">getCenter(id)</h4>
Returns the center of the marker(s)

```javascript
// single marker
GMH.Marker.getCenter(0);

// multiple markers
GMH.Marker.getCenter(["myMarkerID", 0,1]);
```


<h4 id="marker-addListener">addListener(id, type, fn)</h4>
Adds an event listener to the marker(s)

```javascript
// single marker
GMH.Marker.addListener(0, "click", function(){alert("Click!")});

// multiple markers
GMH.Marker.addListener([0,1,"myMarkerID"], "click", function(){alert("You clicked my marker")});
```

<h4 id="marker-removeListenerType">removeListenerType(id, type)</h4>
Removes all the listeners of the specified type from the marker(s)

```javascript
// single marker
GMH.Marker.removeListenerType(0, "click");

// multiple markers 
GMH.Marker.removeListenerType([0,1,"myMarkerID"], "click");
```

<h4 id="marker-removeAllListeners">removeAllListeners(id)</h4>
Removes all the listeners from the marker(s)

```javascript
// single marker
GMH.Marker.removeAllListeners(0);

// multiple markers 
GMH.Marker.removeAllListeners([0,1,"myMarkerID"]);
```

<p align="right"><a href="#documentation">:arrow_up:</a></p>
### Polygon

<h4 id="polygon-add">add(id, path, options)</h4>
Creates a polygon object, adds it to the map and then stores a reference in **GMH.Data.Polygon**

* If id is null, it will use an auto-incrementing id
* If path is a string, it will use **GMH.Utility.toLatLngArray()**
* [Options](https://developers.google.com/maps/documentation/javascript/3.exp/reference#PolygonOptions) are merged with **GMH.Defaults.Polygon**

```javascript
// string path and default options
GMH.Polygon.add("myPolygonID", "25.774,-80.190|18.466,-66.118|32.321,-64.757");

// auto id and user options
GMH.Polygon.add(null, "25.774,-80.190|18.466,-66.118|32.321,-64.757", {fillColor: "#000"});

// multiple Polygons
GMH.Polygon.add([
  { id: null, path: [{lat: 25.774, lng: -80.190}, {lat: 18.466, lng: -66.118}, {lat: 32.321, lng: -64.757}] },
  { id: "myPolygon", path: "25.774,-80.190|18.466,-66.118|32.321,-64.757", options: {fillColor: "#000", fillOpacity: 1} }
]);
```

<h4 id="polygon-delete">delete(id)</h4>
Removes the polygon(s) from the map and **GMH.Data.Polygon**

```javascript
// single polygon
GMH.Polygon.delete(0);

// multiple polygons
GMH.Polygon.delete(["myPolygonID", 0,1]);
```

<h4 id="polygon-hide">hide(id)</h4>
Sets the polygon's visibility to false

```javascript
// single Polygon
GMH.Polygon.hide(0);

// multiple polygons
GMH.Polygon.hide(["myPolygonID", 0,1]);
```

<h4 id="polygon-show">show(id)</h4>
Sets the polygon's visibility to true

```javascript
// single polygon
GMH.Polygon.show(0);

// multiple polygons
GMH.Polygon.show(["myPolygonID", 0,1]);
```

<h4 id="polygon-toggle">toggle(id)</h4>
Toggles the polygon's visibility

```javascript
// single polygon
GMH.Polygon.toggle(0);

// multiple polygons
GMH.Polygon.toggle(["myPolygonID", 0,1]);
```


<h4 id="polygon-reset">reset(id)</h4>
Reset the polygon to its intial state

```javascript
// single polygon
GMH.Polygon.reset(0);

// multiple polygons
GMH.Polygon.reset(["myPolygonID", 0,1]);
```


<h4 id="polygon-update">update(id, options)</h4>
Updates the polygon's options 

* If options is null, the polygon's options will be set to **GMH.Defaults.Polygon**

```javascript
// single polygon
GMH.Polygon.update(0, {fillColor: "#000"});

// single polygon with defaults
GMH.Polygon.update(0);

// multiple polygons
GMH.Polygon.update([0,1], {fillColor: "#000"});
```

<h4 id="polygon-updatePath">updatePath(id, path)</h4>
Updates the polygon's path 

* If path is a string, it will use **GMH.Utility.toLatLngArray()** 

```javascript
// single polygon
GMH.Polygon.updatePath(0, "25.774,-80.190|18.466,-66.118|32.321,-64.757");

// multiple polygons
GMH.Polygon.updatePath([0,1], "25.774,-80.190|18.466,-66.118|32.321,-64.757");
```


<h4 id="polygon-getBounds">getBounds(id)</h4>
Returns the bounds of the polygon(s)

```javascript
// single polygon
GMH.Polygon.getBounds(0);

// multiple polygons
GMH.Polygon.getBounds(["myPolygonID", 0,1]);
```


<h4 id="polygon-getCenter">getCenter(id)</h4>
Returns the center of the polygon(s)

```javascript
// single polygon
GMH.Polygon.getCenter(0);

// multiple polygons
GMH.Polygon.getCenter(["myPolygonID", 0,1]);
```


<h4 id="polygon-addListener">addListener(id, type, fn)</h4>
Adds an event listener to the polygon(s)

```javascript
// single polygon
GMH.Polygon.addListener(0, "click", function(){alert("Click!")});

// multiple polygons
GMH.Polygon.addListener([0,1], "click", function(){alert("You clicked my Polygon")});
```

<h4 id="polygon-removeListenerType">removeListenerType(id, type)</h4>
Removes all the listeners of the specified type from the polygon(s)

```javascript
// single polygon
GMH.Polygon.removeListenerType(0, "click");

// multiple polygons 
GMH.Polygon.removeListenerType([0,1,"myPolygonID"], "click");
```

<h4 id="polygon-removeAllListeners">removeAllListeners(id)</h4>
Removes all the listeners from the polygon(s)

```javascript
// single polygon
GMH.Polygon.removeAllListeners(0);

// multiple polygons 
GMH.Polygon.removeAllListeners([0,1,"myPolygonID"]);
```

<p align="right"><a href="#documentation">:arrow_up:</a></p>
## Credits
Google - for creating the [Google Maps Javscript API](https://developers.google.com/maps/documentation/javascript/)

## License
```
The MIT License (MIT)

Copyright (c) 2016 Trent Mentink

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## Author
#### [Trent Mentink](http://www.trentmentink.com)