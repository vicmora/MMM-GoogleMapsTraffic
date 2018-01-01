var NodeHelper = require("node_helper");
var fs = require('fs');
var path = require('path');

module.exports = NodeHelper.create({

        // Override socketNotificationReceived method.

        start: function() {
                console.log("Starting node_helper for module: " + this.name);
        },

        /* socketNotificationReceived(notification, payload)
         * This method is called when a socket notification arrives.
         *
         * argument notification string - The identifier of the noitication.
         * argument payload mixed - The payload of the notification.
         */
        socketNotificationReceived: function(notification, payload) {
                if (notification === "MMM-GOOGLE_MAPS_TRAFFIC-GET") {
                        console.log("Working notification system. Notification:", notification, "payload: ", payload);
                        this.sendNotification(this.getStyleMap(payload.style));
                }
        },

        getStyleMap: function(style) {
                var styledMapType = [];

                try {
                        styledMapType = JSON.parse(fs.readFileSync(path.join(__dirname, 'mapStyle', style), 'utf8'));
                } catch (err) {
                        if (err.code == 'ENOENT') {
                                console.log('File not found!');
                        } else {
                                console.log('Error code: ' + err.code);;
                        }
                        styledMapType = JSON.parse([]);
                }

                return {styledMapType: styledMapType};
        },

        // Function send notification
        sendNotification: function(payload) {
                this.sendSocketNotification("MMM-GOOGLE_MAPS_TRAFFIC-RESPONSE", payload);
        }
});
