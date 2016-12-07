// ==UserScript==
// @id             iitc-plugin-add-remove-marker@hayeswise
// @name           IITC plugin: Add and Remove Marker
// @category       Layer
// @version        1.2016.12.6
// @namespace      https://github.com/hayeswise/iitc-addremovemarker
// @description    Adds an Add Marker and Remove Marker control to the toolbox.
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
// For more information, visit https://github.com/hayeswise/iitc-addremovemarker

//
// Standard IITC wrapper pattern (and JavaScript encapsulation pattern).
// See last three lines of this file where it is used.
//
function wrapper() {
    // In case IITC is not available yet, define the base plugin object
    if (typeof window.plugin !== "function") {
        window.plugin = function () {};
    }
    // Base context/namespace for plugin
    window.plugin.addRemoveMarker = function () {};
    var self = window.plugin.addRemoveMarker;

    // Plugin level properties
    self.portalDataInPortalDetails = null;

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
    // Save the portal details.
    //
    // @param data Object containing the guid, portal object, portalData object, and a portalDetails object.
    //
    self.checkPortalDetailsUpdated = function (data) {
        var fname = "plugin.addRemoveMarker.checkPortalDetailsUpdated";
        var title;
        self.portalDataInPortalDetails = data;
        title = data.portalData.title ? data.portalData.title : "[NO PORTAL DATA FOR portalDetailsUpdated RUNHOOK]";
        console.log(fname + "(data.guid:=" + data.guid + ", data.portalData.title:=" + title + ")");
        console.log(fname + ": Done.");
    };
    //
    // Removes the marker (map pin) on the portal shown in the sidebar portal details.
    //
    self.removeMarker = function () {
        var fname = "plugin.poiMarker.removeMarker";
        var count = 0,
            data = [], // For layer data
            maker = null, //Leaflet Layer()
            portalDetails,
            refreshLayers = false,
            title;
        // 1. Get the marker data. In this case, the poiMarker.checkPortalDetailLoaded() hook
        //    will have saved it when it was loaded into the sidebar portal details area.
        if (!self.portalDataInPortalDetails) {
            alert("Select a portal to load the portal details before attempting to remove a marker.");
            return;
        }
        title = (self.portalDataInPortalDetails && self.portalDataInPortalDetails.portalDetails.title) ? self.portalDataInPortalDetails.portalDetails.title : "[NO PORTAL DATA]";
        console.log(fname + ": guid:=" + self.portalDataInPortalDetails.guid + ", title:=" + title + ", have portal details=" + !!self.portalDataInPortalDetails);
        portalDetails = self.portalDataInPortalDetails.portalDetails;
        // 2. Find the marker
        marker = window.plugin.drawTools.drawnItems.getLayers().find (function(layer) {
            var latLng;
            if (layer instanceof L.Marker) {
                latLng = layer.getLatLng();
                return (latLng.lat == portalDetails.latE6 / 1E6) &&
                    (latLng.lng == portalDetails.lngE6 / 1E6);
            } else {
                return false;
            }
        });
        // 3. If marker found, remove the marker, save, run draw hooks, and notify the ingress planner if it's being used.
        if (marker) { // if not undefined
            console.log(fname + ": Removing marker for portal " + title);
            window.plugin.drawTools.drawnItems.removeLayer(marker);
            window.plugin.drawTools.save();
            runHooks('pluginDrawTools', {
                event: 'import' //event: 'layersDeleted'
            });
            if (window.plugin.ingressplanner) {
                window.plugin.ingressplanner.sendMessage('update-drawing',localStorage['plugin-draw-tools-layer']);
            }
        } else {
            console.log(fname + ": Portal marker not found. Portal title: " + title);
        }
    };
    //
    // Setup function called by IITC.
    //
    self.setup = function init() {
        var fname = "plugin.addRemoveMarker.setup";
        var controlsHTML;
        if (window.plugin.drawTools === undefined) {
            alert('IITC plugin "Add and Remove Marker" requires IITC plugin "draw tools".');
            return;
        }
        // Link to Google Material icons.
        $("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family\=Material+Icons">');
        // Add toolbox controls.
        controlsHTML = '<div><span id="arm-controls"style="display:block;color:#03fe03;">' +
            '<a id="arm-addMarker" onclick="window.plugin.addRemoveMarker.addMarker();false;" title="Click to add a portal marker.">' +
            '<i class="material-icons" style="font-size:16px;color:#ffce00;">add_location</i> Add Marker</a>' +
            ' &nbsp;<a id="arm-removeMarker" onclick="window.plugin.addRemoveMarker.removeMarker();false;" title="Click to remove the portal marker.">' +
            '<i class="material-icons" style="font-size:16px;color:#ffce00;-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);-ms-transform: rotate(1805deg);-o-transform: rotate(180deg);transform: rotate(180deg);">format_color_reset</i>' +
            ' Remove Marker</a>' +
            '</span></div>';
        $("#toolbox").append(controlsHTML);
        // Add hook for portal details updated.
        window.addHook('portalDetailsUpdated', self.checkPortalDetailsUpdated);
        console.log(fname + ": Done.");
        delete self.setup; // Delete setup to ensure init can't be run again.
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
