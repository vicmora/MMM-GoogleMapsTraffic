# MMM-GoogleMapsTraffic

![Alt text](/img/mmm-googlemapstraffic.png "A preview of the MMM-GoogleMapsTraffic module.")

A module for the [MagicMirror²](https://github.com/MichMich/MagicMirror/) that displays a map, centered at provided coordinates, with Google Maps Traffic information.

## Using the module

To use this module, clone this repo to your `MagicMirror/modules/` directory.

`git clone https://github.com/vicmora/MMM-GoogleMapsTraffic.git`

And add the following configuration block to the modules array in the `config/config.js` file:
```js
var config = {
    modules: [
        {
            module: 'MMM-GoogleMapsTraffic',
            position: 'top_left',
            config: {
                key: 'YOUR_KEY',
                lat: 37.8262306,
                lng: -122.2920096,
                height: '300px',
                width: '300px'
            }
        }
    ]
}
```

## Configuration options

| Option               | Description
|--------------------- |-----------
| `key`                | *Required* Google api key. See below for help.
| `lat`                | *Required* Latitude used to center the map. See below for help. <br><br>**Type:** `float`
| `lng`                | *Required* Longitude used to center the map. See below for help. <br><br>**Type:** `float`
| `height`             | Height of the map. <br><br>**Type:** `string` (pixels) <br> **Default value:** `300px`
| `width`              | Width of the map. <br><br>**Type:** `string` (pixels) <br> **Default value:** `300px`
| `zoom`               | Zoom value to display from lat/lng. <br><br>**Type:** `integer` <br> **Default value:** `10`
| `mapTypeId`          | The map type to display (roadmap, satellite, hybrid, terrain).  <br><br>**Type:** `string` <br> **Default value:** `roadmap`
| `disableDefaultUI`   | Disable default UI buttons (Zoom and Street View). <br><br>**Type:** `boolean` <br> **Default value:** `true`

## Google API Key

Obtain an api at [Google Developer's page](https://developers.google.com/maps/documentation/javascript/).

## Coordinates

The easiest way to obtain latitude and longitude coordinates is via [Google Maps](https://maps.google.com). Type an address, location, or center the map where you'd like it centered. The coordinates will appear in the address bar as seen below.

![Alt text](/img/coordinates.png "Google Maps coordinates.")
