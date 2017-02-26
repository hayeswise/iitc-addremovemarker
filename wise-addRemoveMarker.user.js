// ==UserScript==
// @id             iitc-plugin-add-remove-marker@hayeswise
// @name           IITC plugin: Add and Remove Marker
// @category       Layer
// @version        1.2017.02.05
// @namespace      https://github.com/hayeswise/ingress-intel-total-conversion
// @description    Adds an Add Marker and Remove Marker map control and toolbox controls.
// @updateURL      https://github.com/hayeswise/iitc-shadowops/raw/master/dist/plugins/wise-addremovemarker.meta.js
// @downloadURL    https://github.com/hayeswise/iitc-shadowops/raw/master/dist/plugins/wise-addremovemarker.user.js
// @include        https://*.ingress.com/intel*
// @include        http://*.ingress.com/intel*
// @match          https://*.ingress.com/intel*
// @match          http://*.ingress.com/intel*
// @author         Hayeswise
// @grant          none
// ==/UserScript==
// MIT License, Copyright (c) 2016 Brian Hayes ("Hayeswise")
// For more information, visit https://github.com/hayeswise/iitc-addremovemarker

/**
 * Required Plugins helper.
 * @module {function} "window.helper.requiredPlugins"
 */
 ;(function () {
  "use strict";
  /**
   * Information about a plugin.  The `pluginKey` is the property name of the
   * plugin in the `window.plugin` associative array.  The `name` value is used
   * in messaging about the plugins (e.g., if it is missing).
   * @typedef PluginMetaData
   * @type {Object}
   * @property {String} pluginKey The property name of the plugin in
   *  `window.plugin`.
   * @property {String} name A title or short name of the plugin.
   * @example
   * {
   *   pluginKey: "drawTools",
   *   name: "draw tools"
   * }
   */
  // Aggregate helpers in the window.helper object
  if (typeof window.helper !== "function") {
    window.helper = function () {};
  }
  /**
   * Required Plugins namespace.
   * @alias "window.helper.requiredPlugins"
   * @variation 2
   */
  var self = window.helper.requiredPlugins;
  self.spacename = "helper.requiredPlugins";
  self.version = "0.1.0";

  /**
   * Returns true if all the prerequisite plugins are installed.
   * @param {PluginMetaData[]} prerequisites An array of
   * `RequiredPluginMetaData`.
   * @returns {boolean} Returns `true` if all the prerequisite plugins are
   *  installed; otherwise, returns `false`.
   * @example
   * window.plugin.myPlugin.requiredPlugins = [{
   *   pluginKey: window.plugin.drawTools,
   *   name: "draw tools"
   * }, {
   *   pluginKey: window.plugin.myotherplugin,
   *   name: "My Other Plugin"
   * }]
   * ...
   * if (window.helper.requiredPlugins.areMissing(window.plugin.myPlugin.requiredPlugins)) {
   *    return;
   * }
   */
  self.areMissing = function (prerequisites) {
    var areMissing;
    areMissing = prerequisites.some(function (metadata) {
      return (typeof window.plugin[metadata.pluginKey] === "undefined");
    });
    return areMissing;
  };

  /**
   * Checks if the prerequisite/required plugins are installed.
   * @param {PluginMetaData[]} requiredPlugins An array of plugin meta-data on
   * the required plugins.
   * @returns {PluginMetaData[]}
   * @example
   * window.plugin.myPlugin.requiredPlugins = [{
   *   pluginKey: window.plugin.drawTools,
   *   name: "draw tools"
   * }, {
   *   pluginKey: window.plugin.myotherplugin,
   *   name: "My Other Plugin"
   * }]
   * ...
   * var missing = window.helper.requiredPlugins.missingPluginNames(window.plugin.myPlugin.requiredPlugins);
   * if (missing.length > 0) {
   *   msg = 'IITC plugin "' + pluginName + '" requires IITC plugin' + ((missing.length === 1) ? ' ' : 's ') +
   *     ((missing.length === 1) ? missing[0] : (missing.slice(0,-1).join(", ") + " and " + missing[missing.length - 1])) + '.';
   *   console.warn(msg);
   *   alert(msg);
   * }
   */
  self.missingPluginNames = function (requiredPlugins) {
    var missing = [];
    requiredPlugins.forEach(function (metadata) {
      if (metadata.pluginKey === undefined) {
        missing.push('"' + metadata.name + '"');
      }
    });
    return missing;
  };

  /**
   * Checks if the pre-requisite plugins are installed.  If one or more requisites are not installed, an alert is
   * displayed.
   * @param {RequiredPluginMetaData[]} requiredPlugins An array of plugin meta-data on the required plugins.
   * @param {string} pluginName The name of the plugin requiring the required plugins.  Recommend using
   *    `plugin_info.script.name`.
   * @returns {boolean}
   * @example
   * window.plugin.myPlugin.requiredPlugins = [{
   *   pluginKey: window.plugin.drawTools,
   *   name: "draw tools"
   * }, {
   *   pluginKey: window.plugin.myotherplugin,
   *   name: "My Other Plugin"
   * }]
   * ...
   * if (!window.helper.requiredPlugins.alertIfNotInstalled(window.plugin.myPlugin.requiredPlugins, plugin_info.script.name) {
   *    return;
   * }
   */
  self.alertIfNotInstalled = function (requiredPlugins, pluginName) {
    var missing = [],
      msg;
    missing = self.missingPluginNames(requiredPlugins);
    if (missing.length > 0) {
      msg = 'IITC plugin "' + pluginName + '" requires IITC plugin' + ((missing.length === 1) ? ' ' : 's ') +
        ((missing.length === 1) ? missing[0] : (missing.slice(0, -1).join(", ") + " and " + missing[missing.length - 1])) + '.';
      window.console.warn(msg);
      alert(msg);
    }
    return (missing.length === 0);
  };
}());

/**
 * Toolbox Control Section helper.
 * @module {function} "window.helper.ToolboxControlSection"
 */
;(function () {
  "use strict";
  // Aggregate helpers in the window.helper object
  if (typeof window.helper !== "function") {
    window.helper = function () {};
  }
  /**
   * Toolbox Control Section namespace.
   * @alias "window.helper.ToolboxControlSection"
   * @variation 2
   */
  var self = window.helper.ToolboxControlSection;
  self.version = "0.1.0";

  /**
   * ToolboxControlSection Class.  Provides a standardized way of adding toolbox controls and grouping controls in
   * the same "family".
   */
  /**
   * Creates a new ToolboxControlSection.
   *
   * @class
   * @param {String|Element|Text|Array|jQuery} content A object suitable for passing to `jQuery.append()`: a
   * 	DOM element, text node, array of elements and text nodes, HTML string, or jQuery object to insert at the end of
   *	each element in the set of matched elements.
   * @param {String} controlSectionClass The class name for a section of controls, typically in a `div` tag.
   * @param {String} [controlClass] An optional class name of a simple control or collection of controls.
   * @property {String} defaultStyle Global CSS for the toolbox control section.  Set
   *  using `setStyle()`.
   * @property {String} style Global CSS for the toolbox control section.  Set
   *  using `setStyle()`.
   */
  self.ToolboxControlSection = function (content, controlSectionClass, controlClass) {
    this.controlSectionClass = controlSectionClass;
    this.controlClass = controlClass;
    this.merged = false;
    this.jQueryObj = jQuery('<div>').append(content).addClass(controlSectionClass);
  };

  // Default style
  self.ToolboxControlSection.defaultStyle = "div.wise-toolbox-control-section {color:#00C5FF;text-align:center;width:fit-content;border-top: 1px solid #20A8B1;border-bottom: 1px solid #20A8B1;}";
  self.ToolboxControlSection.style = undefined;
  /**
   * See jQuery `.attr()` function.
   *
   * @returns {String}
   * @todo Consider removing this.
   */
  self.ToolboxControlSection.prototype.attr = function (attributeNameOrAttributes, valueOrFunction) {
    if (typeof valueOrFunction === 'undefined') {
      return this.jQueryObj.attr(attributeNameOrAttributes);
    } else {
      return this.jQueryObj.attr(attributeNameOrAttributes, valueOrFunction);
    }
  };

  /**
   * Appends toolbox controls with the same toolbox control section class and toolbox control class.
   * <p>
   * Merge
   * ```
   * <div class="myControlFamily">
   *    ...this control...
   * </div>
   * ```
   * with
   * ```
   * <div class="myControlFamily">
   *    ...other control...
   * </div>
   * ```
   * to get
   * ```
   * <div class="myControlFamily">
   *    ...this control...
   *    ...other control...
   * </div>
   * ```
   */
  self.ToolboxControlSection.prototype.mergeWithFamily = function () {
    var controlFamily,
      that;
    if (!this.merged) {
      that = this;
      controlFamily = jQuery('.' + this.controlSectionClass);
      if (controlFamily.length > 0) {
        controlFamily.each(function () {
          var jQobj = jQuery(this);
          jQobj.css("border-style", "none");
          that.jQueryObj.append(jQobj.removeClass(that.controlSectionClass).addClass(that.controlSectionClass + "-moved")); // remove oringal section so any subsequent merges have a single control section to deal with
        });
        this.merged = true;
      }
      if (typeof this.controlClass !== 'undefined') {
        controlFamily = jQuery(':not(.' + this.controlSectionClass + ') .' + this.controlClass);
        if (controlFamily.length > 0) {
          controlFamily.each(function () {
            that.jQueryObj.append(jQuery(this));
          });
          this.merged = true;
        }
      }
    }
    return this.jQueryObj;
  };

  /**
   * Sets the documents's styling.  Will not add the style if previously used.
   * @param {String} [styling] CSS styles.
   */
  self.ToolboxControlSection.prototype.setStyle = function (styling) {
    if (typeof styling === "undefined") {
      styling = helpers.ToolboxControlSection.defaultStyle;
    }
    if (typeof helpers.ToolboxControlSection.style === 'undefined' || (helpers.ToolboxControlSection.style !== styling)) {
      helpers.ToolboxControlSection.style = styling;
      jQuery("<style>")
        .prop("type", "text/css")
        .html(styling)
        .appendTo("head");
    }
  };

  /**
   * Override valueOf so that we get the desired behavior of getting the jQuery object when we access an object
   * directly.
   * @returns {Object} jQuery object.
   * @example
   * $("#toolbox").append(new ToolboxControlSection(html, "myfamily-control-section", "myfamily-control").mergeWithFamily();
   */
  self.ToolboxControlSection.prototype.valueOf = function () {
    return this.jQueryObj;
  };
}());


/**
 * Greasemonkey/Tampermonkey information about the plugin.
 * @typedef ScriptInfo
 * @type {Object}
 * @property {String} version This is set to GM_info.script.version.
 * @property {String} name This is set to GM_info.script.name.
 * @property {String} description This is set to GM_info.script.description.
 */
/**
 * Plugin information which includes the Greasemonkey/Tampermonkey information about the plugin.
 * @typedef PluginInfo
 * @type {Object}
 * @property {ScriptInfo} script Greasemonkey/Tampermonkey information about the plugin.
 */
/**
 * Add and Remove Marker IITC plugin.  The plugin and its members can be accessed via
 * `window.plugin.addRemoveMarker`.
 * @module {function} "window.plugin.addRemoveMarker"
*/
/**
 * An object containing information about the plugin. It is provided by the IITC
 * `portalDetailsUpdated` runhook.
 * @typedef ExtendedPortalData
 * @type {Object}
 * @property {String} guid The portal's globally unique identifier.
 * @property {PortalEditingAndOptions} portal
 * @property {Object} portalData
 * @property {Object} portalDetails
 */
/**
 * @typedef PortalEditingAndOptions
 * @type {Object}
 * @property {Object} editing
 * @property {Object} options This contains the data object which a superset of the PortalData object.
 */
/**
 * Closure function for Add and Remove Marker.
 * <p>
 * Standard IITC wrapper pattern used to create the plugin's closure when
 * "installed" using `document.createElement("script".appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));`
 * @param {PluginInfo} plugin_info Plugin information object provided the standard IITC PLUGINEND code.
 */

function wrapper(plugin_info) {
// ensure plugin framework is there, even if iitc is not yet loaded
if(typeof window.plugin !== 'function') window.plugin = function() {};

//PLUGIN AUTHORS: writing a plugin outside of the IITC build environment? if so, delete these lines!!
//(leaving them in place might break the 'About IITC' page or break update checks)
plugin_info.buildName = 'wise';
plugin_info.dateTimeVersion = '20170225.64239';
plugin_info.pluginId = 'wise-addremovemarker';
//END PLUGIN AUTHORS NOTE


// PLUGIN START ////////////////////////////////////////////////////////
<<<<<<< HEAD
    window.plugin.addRemoveMarker = function () {};
=======
// Plugin code is enclosed by a wrapper function to be called within a <script> tag.
    /**

	 * Add and Remove Marker IITC plugin.  The plugin and its members can be accessed via
	 * `window.plugin.addRemoveMarker`.  The "public" members are documented as module members while the more
	 * friend and private members are documented as part of the `wrapper` function.
	 * @see {@link wrapper}
	 * @module {function} addRemoveMarker
	 */
    window.plugin.addRemoveMarker = function () {
    };
>>>>>>> origin/new-build
	/**
	 * Add and Remove Marker namespace.  `self` is set to `window.plugin.addRemoveMarker`.
	 * @alias "window.plugin.addRemoveMarker"
     * @variation 2
	 */
    var self = window.plugin.addRemoveMarker;
    self.spacename = "addRemoveMarker";

    /**
	 * An array of objects describing the required plugins.
     * @type {RequiredPluginMetaData[]} Array of required plugin meta-data.
	 */
    self.requiredPlugins = [{
        object: window.plugin.drawTools,
        name: "draw tools"
    }];

    // Plugin level properties
    /**
      * When the extended portal details are loaded into the portal details
      * section, the `checkPortalDetailsUpdated()` run hook will save the
      * extended portal details object here.
      *
      * @type {ExtendedPortalData}
      */
    self.portalDataInPortalDetails = null;

    /**
     * Adds a layer item (e.g., a marker) to the map.  Copied from plugin.drawTools.import.
     * @name window.plugin.addRemoveMarker.addItem
     * @param item An object contain data for the layer.
     * @returns A Leaflet layer object.
     */
    self.addItem = function(item) {
        var fname = self.spacename + ".addItem";
        var layer = null;
        var extraOpt = {};
        var extraMarkerOpt = {};
        if (item.color) {extraOpt.color = item.color;}

        switch(item.type) {
            case "polyline":
                layer = L.geodesicPolyline(item.latLngs, L.extend({},window.plugin.drawTools.lineOptions,extraOpt));
                break;
            case "polygon":
                layer = L.geodesicPolygon(item.latLngs, L.extend({},window.plugin.drawTools.polygonOptions,extraOpt));
                break;
            case "circle":
                layer = L.geodesicCircle(item.latLng, item.radius, L.extend({},window.plugin.drawTools.polygonOptions,extraOpt));
                break;
            case "marker":
                if (item.color) extraMarkerOpt.icon = window.plugin.drawTools.getMarkerIcon(item.color);
                layer = L.marker(item.latLng, L.extend({},window.plugin.drawTools.markerOptions,extraMarkerOpt));
                window.registerMarkerForOMS(layer);
                break;
            default:
                console.warn('unknown layer type "'+item.type+'" when loading draw tools layer');
                break;
        }
        if (layer) {
            window.plugin.drawTools.drawnItems.addLayer(layer);
            //runHooks('pluginDrawTools', {event: 'import'});
            window.runHooks('pluginDrawTools', {
                event: 'layerCreated',
                layer: layer
            }); // Per draw-tools line #665 the map.on('draw:created', ...) function
        }

        return layer;
    };

    /**
     * Adds a portal marker (map pin) if the selected portal is not already marked.
     * @returns a Leaflet layer object corresponding to the added portal marker
     */
    self.addMarker = function () {
        var fname = self.spacename + ".addMarker";
        var isMarked,
            item,
            layer = null,
            portalDetails,
            title;
        if (!self.portalDataInPortalDetails) {
            alert("Please select a portal and wait for the portal details to be displayed before attempting to add a marker.");
            return null;
        }
        isMarked = self.isMarked(self.portalDataInPortalDetails.portalDetails);
        title = (self.portalDataInPortalDetails && self.portalDataInPortalDetails.portalDetails.title) ? self.portalDataInPortalDetails.portalDetails.title : "[NO PORTAL DATA]";
        console.log(fname + ": guid:=" + self.portalDataInPortalDetails.guid + ", title:=" + title + ", have portal details=" + !!self.portalDataInPortalDetails + ", isMarked=" + isMarked);
        if (!isMarked) {
            portalDetails = self.portalDataInPortalDetails.portalDetails;
            item = {
                type: 'marker',
                latLng: {
                    lat: portalDetails.latE6 / 1E6,
                    lng: portalDetails.lngE6 / 1E6
                },
            };
            layer = self.addItem(item);  // calls runhooks
        }
        if (layer !== null) {
            console.log(fname + ": calling window.plugin.drawTools.save();");
            window.plugin.drawTools.save();
        }
        return layer;
    };

    /**
     * Save the portal details.
     *
     * @param data Object containing the guid, portal object, portalData object, and a portalDetails object.
     */
    self.checkPortalDetailsUpdated = function (data) {
        var fname = self.spacename + ".checkPortalDetailsUpdated";
        var title;
        self.portalDataInPortalDetails = data;
        title = data.portalData.title ? data.portalData.title : "[NO PORTAL DATA FOR portalDetailsUpdated RUNHOOK]";
        console.log(fname + "(data.guid:=" + data.guid + ", data.portalData.title:=" + title + ")");
    };

    /**
     * Returns true if the portal is already marked on the map; otherwise, returns false.
     */
    self.isMarked = function (portalDetails) {
        var fname = self.spacename + ".isMarked";
        var index,
            theLayers; // Leaflet Layer[]
        theLayers = window.plugin.drawTools.drawnItems.getLayers();
        index = theLayers.findIndex(function(layer, i, array) {
            var foundMarker = false,
                item = {};
            if (layer instanceof L.Marker) {
                item.latLng = layer.getLatLng();
                //				console.log (fname + ": layer.getLatLng()=" + JSON.stringify(item.latLng) + "portalDetails.latE6=" + portalDetails.latE6 + ", portalDetails.lngE6=" + portalDetails.lngE6);
                foundMarker = ((item.latLng.lat == portalDetails.latE6 / 1E6) &&
                               (item.latLng.lng == portalDetails.lngE6 / 1E6));
                //				console.log (fname + ": foundMarker=" + foundMarker + ", layer.getLatLng()=" + JSON.stringify(item.latLng) + "portalDetails.latE6=" + portalDetails.latE6 + ", portalDetails.lngE6=" + portalDetails.lngE6);
            }
            return foundMarker;
        });
        return (index != -1);
    };

    /**
     * Removes the marker (map pin) on the portal shown in the sidebar portal details.
	 * Only one marker is removed at a time.  If for some reason multiple markers have
	 * been put at the same location, multiple removes will need to be done.
     */
    self.removeMarker = function () {
        var fname = self.spacename + ".removeMarker";
        var marker = null, //Leaflet Layer()
            portalDetails,
            title;
        // 1. Get the marker data. In this case, the poiMarker.checkPortalDetailLoaded() hook
        //    will have saved it when it was loaded into the sidebar portal details area.
        if (!self.portalDataInPortalDetails) {
            alert("Please select a portal and wait for the portal details to be displayed before attempting to remove a marker.");
            return;
        }
        title = (self.portalDataInPortalDetails && self.portalDataInPortalDetails.portalDetails.title) ? self.portalDataInPortalDetails.portalDetails.title : "[NO PORTAL DATA]";
        console.log(fname + ": guid:=" + self.portalDataInPortalDetails.guid + ", title:=" + title + ", have portal details=" + !!self.portalDataInPortalDetails);
        portalDetails = self.portalDataInPortalDetails.portalDetails;
        // 2. Find the first marker with the same latitude and longitude.
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
            window.runHooks('pluginDrawTools',{event:'layersDeleted'}); // Per draw-tools line #670 in the map.on('draw:deleted', ...) function
            console.log(fname + ": calling window.plugin.drawTools.save();");
            window.plugin.drawTools.save();
        } else {
            console.log(fname + ": Portal marker not found. Portal title: " + title);
        }
    };

    /**
	 * Returns the DOM elements containing the plugin controls to be appended to the IITC toolbox.
	 * <br>
	 * Controls from other plugins with class "wise-toolbox-control" will be grouped into one subsection (same div tag).
	 * @returns {Object} Object suitable for a jQuery `append()`.
	 */
    self.getToolboxControls = function () {
        var	pluginControl,
            controlsHtml;
        controlsHtml = '<span id="addRemoveMarker-controls" style="display:block;color:#03fe03;">' +
            '<a id="addRemoveMarker-addMarker" onclick="window.plugin.addRemoveMarker.addMarker();false;" title="Click to add a portal marker.">' +
            '<i class="material-icons" style="font-size:16px;color:#ffce00;">add_location</i> Add Marker</a>&nbsp; ' +
            '<a id="addRemoveMarker-removeMarker" onclick="window.plugin.addRemoveMarker.removeMarker();false;" title="Click to remove the portal marker.">' +
            '<i class="material-icons" style="font-size:16px;color:#ffce00;-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);-ms-transform: rotate(1805deg);-o-transform: rotate(180deg);transform: rotate(180deg);">format_color_reset</i>' +
            ' Remove Marker</a>' +
            '</span>';
        pluginControl = new window.helpers.ToolboxControlSection(controlsHtml, "wise-toolbox-control-section", "wise-toolbox-control");
        pluginControl.attr("id", self.spacename + "-controls");
        pluginControl = pluginControl.mergeWithFamily();
        window.helpers.ToolboxControlSection.setStyle();
        return pluginControl;
    };

    /**
     * Setup function to be called or handled by PLUGINEND code provided IITC build script.
     * The function will be called if IITC is already loaded and, if not, saved for later execution.
     */
    self.setup = function init() {
        var fname = self.spacename + ".setup";
		console.log (fname + ": Start, version " + (!!plugin_info ? plugin_info.script.version : "unknown"));

        /**************************************************************************************************************
         * L.Control.AddRemoveMarkerControl Class
         *************************************************************************************************************/
        /**
	     * Creates a new map control for adding and removing markers.
		 * <p>
		 * Example usage:
		 * ```
		 * L.Map.mergeOptions({
		 *    AddRemoveMarkerControl: true // <== allows plugins to disable/enable the control - see L.Control.Zoomslider.js for example
		 * });
		 * window.map.addControl(L.control.AddRemoveMarkerControl());
		 * ```
		 * <p>
		 * Based on L.Control.Zoom from leaflet-src.js.
		 * @class
		 * @param {Object} [options] Optional options to configure the control.
		 */
        L.Control.AddRemoveMarkerControl = L.Control.extend({
            options: {
                position: 'topleft',
                addMarkerHtml: '<i class="material-icons" style="font-size:18px;vertical-align:middle;">add_location</i>',
                addMarkerTitle: "Add marker",
                removeMarkerHtml: '<i class="material-icons" style="font-size:18px;vertical-align:middle;-webkit-transform: rotate(180deg);-moz-transform: rotate(180deg);-ms-transform: rotate(1805deg);-o-transform: rotate(180deg);transform: rotate(180deg);">format_color_reset</i>',
                removeMarkerTitle: "Remove marker"
            },

            onAdd: function (map) {
                var controlName = 'wise-addRemoveMarker-control',
                    container = L.DomUtil.create('div', controlName + ' leaflet-bar');
                container.setAttribute("id", controlName);

                this._map = map;

                this._addMarkerButton  = this._createButton(
                    this.options.addMarkerHtml, this.options.addMarkerTitle,
                    controlName + '-add',  container, this._addMarker,  this);
                this._removeMarkerButton = this._createButton(
                    this.options.removeMarkerHtml, this.options.removeMarkerTitle,
                    controlName + '-remove', container, this._removeMarker, this);

                this._updateDisabled();
                map.on('zoomend zoomlevelschange', this._updateDisabled, this);

                return container;
            },

            onRemove: function (map) {
                map.off('zoomend zoomlevelschange', this._updateDisabled, this);
                //@todo remove listeners
                L.DomEvent.off(this._addMarkerButton, 'click', this);
                L.DomEvent.off(this._removeMarkerButton, 'click', this);
            },

            _addMarker: function (e) {
                window.plugin.addRemoveMarker.addMarker();
            },

            _removeMarker: function (e) {
                window.plugin.addRemoveMarker.removeMarker();
            },

            _createButton: function (html, title, className, container, fn, context) {
                var link = L.DomUtil.create('a', className, container);
                link.innerHTML = html;
                link.href = '#';
                link.title = title;

                var stop = L.DomEvent.stopPropagation;

                L.DomEvent
                    .on(link, 'click', stop)
                    .on(link, 'mousedown', stop)
                    .on(link, 'dblclick', stop)
                    .on(link, 'click', L.DomEvent.preventDefault)
                    .on(link, 'click', fn, context)
                    .on(link, 'click', this._refocusOnMap, context);

                return link;
            },

            _updateDisabled: function () {
                var map = this._map,
                    className = 'leaflet-disabled';
                L.DomUtil.removeClass(this._addMarkerButton, className);
                L.DomUtil.removeClass(this._removeMarkerButton, className);
            }
        });

        /**
		 * Factory for creating L.Control.AddRemoveMarkerControl control objects.
		 * @param {Object} [options] Optional options to configure the control.
		 */
        L.control.AddRemoveMarkerControl = function (options) {
            return new L.Control.AddRemoveMarkerControl(options);
        };

        ///////////////////////////////////////////////////////////////////////
        // Start
        ///////////////////////////////////////////////////////////////////////
        if (!window.helpers.prerequisitePluginsInstalled(self.requiredPlugins, plugin_info.script.name)) {
            return;
        }
        // Link to Google Material icons.
        $("head").append('<link rel="stylesheet" href="https://fonts.googleapis.com/icon?family=Material+Icons">');
        // Standard sytling for "wise" family of toolbox controls
        $("<style>")
            .prop("type", "text/css")
            .html("div.wise-toolbox-control-section {color:#00C5FF;text-align:center;width:fit-content;border-top: 1px solid #20A8B1;border-bottom: 1px solid #20A8B1;}")
            .appendTo("head");
        // Add toolbox controls.
        $("#toolbox").append(self.getToolboxControls());
        // Add map controls
        L.Map.mergeOptions({
            addRemoveMarkerControl: true // <== allows plugins to disable/enable the control - see L.Control.Zoomslider.js for example
        });
        window.map.addControl(L.control.AddRemoveMarkerControl());
        // Add hook for portal details updated.
        window.addHook('portalDetailsUpdated', self.checkPortalDetailsUpdated);
        console.log(fname + ": Done.");
        delete self.setup; // Delete setup to ensure init can't be run again.
    };

    /*
     * Set the required setup function that is called or handled by PLUGINEND code provided IITC build script.
     * The function will be called if IITC is already loaded and, if not, saved for later execution.
     */
    var setup = self.setup;
//PLUGIN END //////////////////////////////////////////////////////////

setup.info = plugin_info; //add the script info data to the function as a property
if(!window.bootPlugins) window.bootPlugins = [];
window.bootPlugins.push(setup);
// if IITC has already booted, immediately run the 'setup' function
if(window.iitcLoaded && typeof setup === 'function') setup();
} // wrapper end
// inject code into site context
var script = document.createElement('script');
var info = {};
if (typeof GM_info !== 'undefined' && GM_info && GM_info.script) info.script = {version: GM_info.script.version, name: GM_info.script.name, description: GM_info.script.description };
script.appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));
(document.body || document.head || document.documentElement).appendChild(script);


