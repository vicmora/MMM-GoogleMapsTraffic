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
		updateInterval: 900000,
        backgroundColor: 'rgba(0, 0, 0, 0)',
	},
  scriptloaded: false,
  script: null,
	self: null,
	start: function() {
        self = this;
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

      let self = this;
      var wrapper = document.createElement("div");
        	wrapper.setAttribute("id", "map");

        	wrapper.style.height = this.config.height;
        	wrapper.style.width = this.config.width;
     
      Log.log(this.name+" in getDom() loaded="+self.scriptloaded);
      
      if(self.scriptloaded){
        Log.log(self.name+" in getDom() in loaded");
        // don't search, have wrapper object already
        // changes each time thru the getdom function.. 
        // could be optimized here.. 
        var map = new google.maps.Map(wrapper , {
            zoom: self.config.zoom,
            mapTypeId: self.config.mapTypeId,
            center: {
                lat: self.config.lat,
                lng: self.config.lng
            },
            styles: self.styledMapType,
            disableDefaultUI: self.config.disableDefaultUI,
            backgroundColor: self.config.backgroundColor
        });
        Log.log(self.name+" map object created");
        var trafficLayer = new google.maps.TrafficLayer();
          trafficLayer.setMap(map);
        Log.log(self.name+" traffic layer set");
        // watch out for the lost config error
        if(self.config.markers !== undefined){
          for(var marker of  self.config.markers) {
            //var marker = self.config.markers[i];
            var markerOptions = {
                map: map,
                position: {
                    lat: marker.lat,
                    lng: marker.lng,
                }
            };
            markerOptions.icon = {
                path: 'M11 2c-3.9 0-7 3.1-7 7 0 5.3 7 13 7 13 0 0 7-7.7 7-13 0-3.9-3.1-7-7-7Zm0 9.5c-1.4 0-2.5-1.1-2.5-2.5 0-1.4 1.1-2.5 2.5-2.5 1.4 0 2.5 1.1 2.5 2.5 0 1.4-1.1 2.5-2.5 2.5Z',
                scale: 1,
                anchor: new google.maps.Point(11, 22),
                fillOpacity: 1,
                fillColor: marker.fillColor,
                strokeOpacity: 0
            };                
            var markerLayer = new google.maps.Marker(markerOptions);
          }
        }
        else 
          Log.error(this.name+ " lost access to config options!!!!!");
        Log.log(self.name+" done with marker options");
    	}

		return wrapper;
	},
	
	// socketNotificationReceived from helper
        socketNotificationReceived: function (notification, payload) {
                if(notification === "MMM-GOOGLE_MAPS_TRAFFIC-RESPONSE") {
                        this.styledMapType = payload.styledMapType;
                        console.log = this.styledMapType;
                        this.updateDom();
                }
        },
  // notifications from system or other modules        
        notificationReceived(notification, payload, source){
            // if the dom is created
            if(notification ===  "DOM_OBJECTS_CREATED"){
              // add the script to it
              this.script = document.createElement("script");
                this.script.type = "text/javascript";
                this.script.src = "https://maps.googleapis.com/maps/api/js?key=" + this.config.key;
                this.script.setAttribute('defer','');
                this.script.setAttribute('async','');
              // add this script to the mirror body, once
              document.body.appendChild(this.script);
              Log.log(this.name+" loading api script")

              this.script.onload = function () {
                Log.log(this.s.name+" api script loaded ")
                this.s.scriptloaded=true;
                this.s.updateDom(10);          
              }.bind({s:this}) 
            }
      },
        
});
