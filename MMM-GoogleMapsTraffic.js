/* global Module */

/* Magic Mirror
 * Module: MMM-GoogleMapsTraffic
 *
 * By Victor Mora
 * MIT Licensed.
 */

Module.register("MMM-GoogleMapsTraffic", {
	// Module config defaults
	defaults : {
		key: '',
		lat: '',
		lng: '',
		height: '300px',
		width: '300px',
		zoom: 10,
                mapTypeId: 'roadmap',
		styledMapType: 'standard',
		disableDefaultUI: true,
		updateInterval: 900000
	},
	
	start: function() {
                var self = this;
                Log.info("Starting module: " + this.name);

                if (this.config.key === "") {
                        Log.error("MMM-GoogleMapsTraffic: key not set!");
                        return;
                }

                this.sendSocketNotification("MMM-GOOGLE_MAPS_TRAFFIC-GET", {style: this.config.styledMapType});

                setInterval(function() {
                        self.updateDom();
                }, this.config.updateInterval);
        },

	getDom: function() {
        	var lat = this.config.lat;
        	var lng = this.config.lng;

		var wrapper = document.createElement("div");
        	wrapper.setAttribute("id", "map");

        	wrapper.style.height = this.config.height;
        	wrapper.style.width = this.config.width;

        	var script = document.createElement("script");
        	script.type = "text/javascript";
        	script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.config.key;
		script.setAttribute('defer','');
		script.setAttribute('async','');
        	document.body.appendChild(script);

		var self = this;
        	script.onload = function () {
            	var map = new google.maps.Map(document.getElementById("map"), {
            		zoom: self.config.zoom,
                	mapTypeId: self.config.mapTypeId,
            		center: {
            			lat: self.config.lat,
            			lng: self.config.lng
            		},
			styles: self.styledMapType,
			disableDefaultUI: self.config.disableDefaultUI
            	});

            	var trafficLayer = new google.maps.TrafficLayer();
            	trafficLayer.setMap(map);
        	};

		return wrapper;
	}
	
	// socketNotificationReceived from helper
        socketNotificationReceived: function (notification, payload) {
                if(notification === "MMM-GOOGLE_MAPS_TRAFFIC-RESPONSE") {
                        this.styledMapType = payload.styledMapType;
                        console.log = this.styledMapType;
                        this.updateDom();
                }
        },
});
