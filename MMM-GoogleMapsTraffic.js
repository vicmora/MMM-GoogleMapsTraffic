/* global Module */

/* Magic Mirror
 * Module: MMM-GoogleMapsTraffic
 *
 * By Victor Mora
 * MIT Licensed.
 */

Module.register("MMM-GoogleMapsTraffic", {
	defaults: {
	},

	start: function () {
        Log.info("Starting module: " + this.name);
        var script = document.createElement("script");
        script.type = "text/javascript";
        script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.config.key;
        document.querySelector("body").appendChild(script);
    },

	getStyles: function() {
		return ["MMM-GoogleMapsTraffic.css"];
	},

	getDom: function() {
		var wrapper = document.createElement("div");

		var mapDiv = document.createElement("div");
		mapDiv.setAttribute("id", "map");

        var map = new google.maps.Map(document.getElementById("map"), {
        	zoom: 13,
        	center: {
        		lat: this.config.lat,
        		lng: this.config.lng
        	}
        });

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        wrapper.appendChild(mapDiv);

		return wrapper;
	}

});