// ------------------------------------------------------------------------
// Google Maps Helper v1.0.0: config.ts 
// ------------------------------------------------------------------------

namespace GMH.Config {

  export const Default = {
    Label: {
      fontSize: 14,
      fontColor: "#000",
      strokeColor: '#FFF',
      strokeWeight: 1,
      align: "center"
    },
    Map: {
      zoom: 6,
      center: { lat: 37.5, lng: -120 },
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      clickableIcons: false,
      mapTypeControl: false,
      streetViewControl: false
    },
    Marker: {

    },
    Polygon: {
      strokeColor: '#000',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#0275D8',
      fillOpacity: 0.8
    }
  }

  export const Delimeter = {
    LatLng: ",",
    LatLngPair: "|"
  }

}

