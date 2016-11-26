// ==UserScript==
// @id             iitc-plugin-add-remove-marker@hayeswise
// @name           IITC plugin: Add and Remove Marker
// @category       Layer
// @version        0.2016.11.26
// @namespace      https://github.com/jonatkins/ingress-intel-total-conversion
// @description    Automatically marks and un-marks portals of interest.  Also includes a Add Marker and Remove Marker control to the toolbox.
// @updateURL      https://github.com/hayeswise/iitc-addremovemarker/raw/master/wise-addRemoveMarker.user.js
// @downloadURL	   https://github.com/hayeswise/iitc-addremovemarker/raw/master/wise-addRemoveMarker.user.js
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @author         Hayeswise
// @grant          none
// ==/UserScript==
// MIT License, Copyright (c) 2016 Brian Hayes ("Hayeswise")
// For more information, visit https://github.com/hayeswise/iitc-addremovemarker.

function wrapper() {
    // In case IITC is not available yet, define the base plugin object
    if (typeof window.plugin !== "function") {
        window.plugin = function () {};
    }
    // Base context for plugin
    window.plugin.addRemoveMarker = function () {};
    var self = window.plugin.addRemoveMarker;

    // Plugin level properties
    self.portalDataInPortalDetails = null;
    self.autoMarkEnabled = false;
    self.autoRemoveMarkEnabled = false;
    self.poiColor = "#AAAAAA";
    // Portals of interest conditions (OR conditions)
    self.minHubLinks = 6;
    self.minPortalLevel = 7.5;
    self.minAXAs = 1;
    //
    // Add marker
    //
    self.addMarker = function () {
        var fname = "plugin.addRemoveMarker.addMarker";
        var count = 0,
            data = [], // For layer data
            item,
            portalDetails,
            title;
        if (!self.portalDataInPortalDetails) {
            alert("Select a portal to load the portal details before attempting to add a marker.");
            return;
        }
        title = (self.portalDataInPortalDetails && self.portalDataInPortalDetails.portalDetails.title) ? self.portalDataInPortalDetails.portalDetails.title : "[NO PORTAL DATA]";
        console.log(fname + ": guid:=" + self.portalDataInPortalDetails.guid + ", title:=" + title + ", have portal details=" + !!self.portalDataInPortalDetails);
        portalDetails = self.portalDataInPortalDetails.portalDetails;
        item = {
            type: 'marker',
            latLng: {
                lat: portalDetails.latE6 / 1E6,
                lng: portalDetails.lngE6 / 1E6
            },
        };
        window.plugin.drawTools.import([item]); // requires an array of items
        window.plugin.drawTools.save();
    };
    //
    // If the portal is already marked on the map, return true; otherwise,
    // return false.
    //
    self.isMarked = function (portalDetails) {
        var fname = "plugin.addRemoveMarker.isMarked";
        var theLayers; // Leaflet Layer[]
        theLayers = window.plugin.drawTools.drawnItems.getLayers();
        index = theLayers.findIndex(function(layer, i, array) {
            var foundMarker = false,
                item = {};
            if (layer instanceof L.Marker) {
                item.latLng = layer.getLatLng();
                item.color = layer.options.icon.options.color;
                foundMarker = ((item.latLng.lat == portalDetails.latE6 / 1E6) &&
                               (item.latLng.lng == portalDetails.lngE6 / 1E6));
            }
            return foundMarker;
        });
        return (index != -1);
    };
    //
    // Remove the marker on the portal shown in the sidebar portal details.
    //
    self.removeMarker = function () {
        var fname = "plugin.addRemoveMarker.removeMarker";
        var count = 0,
            data = [], // For layer data
            portalDetails,
            refreshLayers = false,
            title;
        // 1. Get the marker data. In this case, the addRemoveMarker.checkPortalDetailLoaded() hook
        //    will have saved it when it was loaded into the sidebar portal details area.
        if (!self.portalDataInPortalDetails) {
            alert("Select a portal to load the portal details before attempting to remove a marker.");
            return;
        }
        title = (self.portalDataInPortalDetails && self.portalDataInPortalDetails.portalDetails.title) ? self.portalDataInPortalDetails.portalDetails.title : "[NO PORTAL DATA]";
        console.log(fname + ": guid:=" + self.portalDataInPortalDetails.guid + ", title:=" + title + ", have portal details=" + !!self.portalDataInPortalDetails);
        portalDetails = self.portalDataInPortalDetails.portalDetails;
        // 2. Save all but the marker.
        window.plugin.drawTools.drawnItems.eachLayer(function (layer) { // drawnItems is a leaflet FeatureGroup.  See window.plugin.drawTools.boot().
            var foundMarker = false,
                item = {};
            count++;
            if (layer instanceof L.GeodesicCircle || layer instanceof L.Circle) {
                item.type = 'circle';
                item.latLng = layer.getLatLng();
                item.radius = layer.getRadius();
                item.color = layer.options.color;
            } else if (layer instanceof L.GeodesicPolygon || layer instanceof L.Polygon) {
                item.type = 'polygon';
                item.latLngs = layer.getLatLngs();
                item.color = layer.options.color;
            } else if (layer instanceof L.GeodesicPolyline || layer instanceof L.Polyline) {
                item.type = 'polyline';
                item.latLngs = layer.getLatLngs();
                item.color = layer.options.color;
            } else if (layer instanceof L.Marker) {
                item.type = 'marker';
                item.latLng = layer.getLatLng();
                item.color = layer.options.icon.options.color;
                foundMarker = ((item.latLng.lat == portalDetails.latE6 / 1E6) &&
                               (item.latLng.lng == portalDetails.lngE6 / 1E6));
           } else {
                console.warn('Unknown layer type when saving draw tools layer');
                return; //.eachLayer 'continue'
            }
            if (!foundMarker) {
                data.push(item);
            } else {
                console.log(fname + " [" + count + "] " + JSON.stringify(item) + ", foundMarker=" + foundMarker);
                refreshLayers = true; // We do not break from the loop since we need to save all the other items/layers for the refresh
            }
        });
        // TODO: Investigate using Leaflet removeLayer (use drawnItems.getLayers() with drawnItems.removeLayer(...)
        if (refreshLayers) {
            console.log(fname + ": Marker found on portal " + title);
            // 3. Save the layer data (which doesn't contain the marker) to local storage
            localStorage['plugin-draw-tools-layer'] = JSON.stringify(data); //  markers and other stuff saved here
            // 4. Refresh the layers
            window.plugin.drawTools.drawnItems.clearLayers();
            window.plugin.drawTools.import(data);
            window.plugin.drawTools.save();
        } else {
            console.log(fname + ": Marker not found on portal " + title);
        }
    };

    // setup function called by IITC
    self.setup = function init() {
        var fname = "plugin.addRemoveMarker.setup";
        var controlsHTML;
        if (window.plugin.drawTools === undefined) {
            alert("IITC plugin \"Add and Remove Marker\" requires IITC plugin \"draw tools\".");
            return;
        }
        // Link to Google Material icons.
        $("head").append("<link rel=\"stylesheet\" href=\"https://fonts.googleapis.com/icon?family\=Material+Icons\">");
		// Add toolbox controls.
        controlsHTML = 
            "<div><span id=\"addremovemarker-controls\"style=\"display:block;color:#03fe03;\">" +
				"<a id=\"addMarker\" onclick=\"window.plugin.addRemoveMarker.addMarker();false;\" title=\"Click to add a portal marker.\">" +
				"<i class=\"material-icons\" style=\"font-size:16px;color:#ffce00;\">add_location</i> Add Marker</a>" +
                " &nbsp;<a id=\"removeMarker\" onclick=\"window.plugin.addRemoveMarker.removeMarker();false;\" title=\"Click to remove the portal marker.\">" +
                "<i class=\"material-icons\" style=\"font-size:16px;color:#ffce00;-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);-ms-transform: rotate(1805deg);-o-transform: rotate(180deg);transform: rotate(180deg);\">format_color_reset</i>" +
                " Remove Marker</a>" +
             "</span></div>";
        $("#toolbox").append(controlsHTML);
		
        console.log(fname + ": Done.");
        // delete setup to ensure init can't be run again
        delete self.setup;
    };
    // IITC plugin setup
    if (window.iitcLoaded && typeof self.setup === "function") {
        self.setup();
    } else if (window.bootPlugins) {
        window.bootPlugins.push(self.setup);
    } else {
        window.bootPlugins = [self.setup];
    }
}

var script = document.createElement("script");
script.appendChild(document.createTextNode("(" + wrapper + ")();"));
(document.body || document.head || document.documentElement).appendChild(script);
