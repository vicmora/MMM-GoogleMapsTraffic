/* global Module */

/* Magic Mirror
 * Module: MMM-GoogleMapsTraffic
 *
 * By Victor Mora
 * MIT Licensed.
 */

Module.register("MMM-GoogleMapsTraffic", {
	defaults: {
		updateInterval: 300000,
		retryDelay: 60000
	},

	getScripts: function() {
		var key = this.config.key;
		var url = "https://maps.googleapis.com/maps/api/js?key="+key; 
		return [url]
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
        	center: {lat: this.config.lat, lng: this.config.lng}
        });

        var trafficLayer = new google.maps.TrafficLayer();
        trafficLayer.setMap(map);

        wrapper.appendChild(mapDiv);

		return wrapper;
	}

});