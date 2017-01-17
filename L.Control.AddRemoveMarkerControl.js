    /******************************************************************************************************************
     * L.Control.AddRemoveMarker Class
     *****************************************************************************************************************/
    /**
	 * Creates a new map control for adding and removing markers.
	 * <p>
	 * Example usage:
	 * ```
     * L.Map.mergeOptions({
     *    addRemoveMarkerControl: true // <== allows plugins to disable/enable the control - see L.Control.Zoomslider.js for example
     * });
     * window.map.addControl(L.control.addRemoveMarker());
	 * ```
	 * <p>
	 * Based on L.Control.Zoom from leaflet-src.js.
	 * @class
	 * @param {Object} [options] Optional options to configure the control.
	 */
    L.Control.AddRemoveMarker = L.Control.extend({
        options: {
            position: 'bottomleft',
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
     * Factory for creating L.Control.AddRemoveMarker control objects.
     * @param {Object} [options] Optional options to configure the control.
     */
    L.control.addRemoveMarker = function (options) {
        return new L.Control.AddRemoveMarker(options);
    };