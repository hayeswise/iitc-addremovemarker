## Modules

<dl>
<dt><a href="#module_window.helper.requiredPlugins">window.helper.requiredPlugins</a> : <code>function</code></dt>
<dd><p>Required Plugins helper.</p>
</dd>
<dt><a href="#module_window.helper.ToolboxControlSection">window.helper.ToolboxControlSection</a> : <code>function</code></dt>
<dd><p>Toolbox Control Section helper.</p>
</dd>
<dt><a href="#module_window.plugin.addRemoveMarker">window.plugin.addRemoveMarker</a> : <code>function</code></dt>
<dd><p>Add and Remove Marker IITC plugin.  The plugin and its members can be accessed via
<code>window.plugin.addRemoveMarker</code>.</p>
</dd>
</dl>

## Members

<dl>
<dt><a href="#window.helper.requiredPlugins(2)">window.helper.requiredPlugins</a></dt>
<dd><p>Required Plugins namespace.</p>
</dd>
<dt><a href="#window.plugin.addRemoveMarker(2)">window.plugin.addRemoveMarker</a></dt>
<dd><p>Add and Remove Marker namespace.  <code>self</code> is set to <code>window.plugin.addRemoveMarker</code>.</p>
</dd>
</dl>

<a name="module_window.helper.requiredPlugins"></a>

## window.helper.requiredPlugins : <code>function</code>
Required Plugins helper.

<a name="module_window.helper.requiredPlugins..PluginMetaData"></a>

### window.helper.requiredPlugins~PluginMetaData : <code>Object</code>
Information about a plugin.  The `pluginKey` is the property name of theplugin in the `window.plugin` associative array.  The `name` value is usedin messaging about the plugins (e.g., if it is missing).

**Kind**: inner typedef of <code>[window.helper.requiredPlugins](#module_window.helper.requiredPlugins)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| pluginKey | <code>String</code> | The property name of the plugin in  `window.plugin`. |
| name | <code>String</code> | A title or short name of the plugin. |

**Example**  
```js
{  pluginKey: "drawTools",  name: "draw tools"}
```
<a name="module_window.helper.ToolboxControlSection"></a>

## window.helper.ToolboxControlSection : <code>function</code>
Toolbox Control Section helper.


* [window.helper.ToolboxControlSection](#module_window.helper.ToolboxControlSection) : <code>function</code>
    * [~ScriptInfo](#module_window.helper.ToolboxControlSection..ScriptInfo) : <code>Object</code>
    * [~PluginInfo](#module_window.helper.ToolboxControlSection..PluginInfo) : <code>Object</code>

<a name="module_window.helper.ToolboxControlSection..ScriptInfo"></a>

### window.helper.ToolboxControlSection~ScriptInfo : <code>Object</code>
Greasemonkey/Tampermonkey information about the plugin.

**Kind**: inner typedef of <code>[window.helper.ToolboxControlSection](#module_window.helper.ToolboxControlSection)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| version | <code>String</code> | This is set to GM_info.script.version. |
| name | <code>String</code> | This is set to GM_info.script.name. |
| description | <code>String</code> | This is set to GM_info.script.description. |

<a name="module_window.helper.ToolboxControlSection..PluginInfo"></a>

### window.helper.ToolboxControlSection~PluginInfo : <code>Object</code>
Plugin information which includes the Greasemonkey/Tampermonkey information about the plugin.

**Kind**: inner typedef of <code>[window.helper.ToolboxControlSection](#module_window.helper.ToolboxControlSection)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| script | <code>ScriptInfo</code> | Greasemonkey/Tampermonkey information about the plugin. |

<a name="module_window.plugin.addRemoveMarker"></a>

## window.plugin.addRemoveMarker : <code>function</code>
Add and Remove Marker IITC plugin.  The plugin and its members can be accessed via`window.plugin.addRemoveMarker`.


* [window.plugin.addRemoveMarker](#module_window.plugin.addRemoveMarker) : <code>function</code>
    * [~wrapper(plugin_info)](#module_window.plugin.addRemoveMarker..wrapper)
    * [~ExtendedPortalData](#module_window.plugin.addRemoveMarker..ExtendedPortalData) : <code>Object</code>
    * [~PortalEditingAndOptions](#module_window.plugin.addRemoveMarker..PortalEditingAndOptions) : <code>Object</code>

<a name="module_window.plugin.addRemoveMarker..wrapper"></a>

### window.plugin.addRemoveMarker~wrapper(plugin_info)
Closure function for Add and Remove Marker.<p>Standard IITC wrapper pattern used to create the plugin's closure when"installed" using `document.createElement("script".appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));`

**Kind**: inner method of <code>[window.plugin.addRemoveMarker](#module_window.plugin.addRemoveMarker)</code>  

| Param | Type | Description |
| --- | --- | --- |
| plugin_info | <code>PluginInfo</code> | Plugin information object provided the standard IITC PLUGINEND code. |

<a name="module_window.plugin.addRemoveMarker..ExtendedPortalData"></a>

### window.plugin.addRemoveMarker~ExtendedPortalData : <code>Object</code>
An object containing information about the plugin. It is provided by the IITC`portalDetailsUpdated` runhook.

**Kind**: inner typedef of <code>[window.plugin.addRemoveMarker](#module_window.plugin.addRemoveMarker)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| guid | <code>String</code> | The portal's globally unique identifier. |
| portal | <code>PortalEditingAndOptions</code> |  |
| portalData | <code>Object</code> |  |
| portalDetails | <code>Object</code> |  |

<a name="module_window.plugin.addRemoveMarker..PortalEditingAndOptions"></a>

### window.plugin.addRemoveMarker~PortalEditingAndOptions : <code>Object</code>
**Kind**: inner typedef of <code>[window.plugin.addRemoveMarker](#module_window.plugin.addRemoveMarker)</code>  
**Properties**

| Name | Type | Description |
| --- | --- | --- |
| editing | <code>Object</code> |  |
| options | <code>Object</code> | This contains the data object which a superset of the PortalData object. |

<a name="window.helper.requiredPlugins(2)"></a>

## window.helper.requiredPlugins
Required Plugins namespace.

**Kind**: global variable  

* [window.helper.requiredPlugins](#window.helper.requiredPlugins(2))
    * [.areMissing(prerequisites)](#window.helper.requiredPlugins(2).areMissing) ⇒ <code>boolean</code>
    * [.missingPluginNames(requiredPlugins)](#window.helper.requiredPlugins(2).missingPluginNames) ⇒ <code>Array.&lt;PluginMetaData&gt;</code>
    * [.alertIfNotInstalled(requiredPlugins, pluginName)](#window.helper.requiredPlugins(2).alertIfNotInstalled) ⇒ <code>boolean</code>

<a name="window.helper.requiredPlugins(2).areMissing"></a>

### window.helper.requiredPlugins.areMissing(prerequisites) ⇒ <code>boolean</code>
Returns true if all the prerequisite plugins are installed.

**Kind**: static method of <code>[window.helper.requiredPlugins](#window.helper.requiredPlugins(2))</code>  
**Returns**: <code>boolean</code> - Returns `true` if all the prerequisite plugins are installed; otherwise, returns `false`.  

| Param | Type | Description |
| --- | --- | --- |
| prerequisites | <code>Array.&lt;PluginMetaData&gt;</code> | An array of `RequiredPluginMetaData`. |

**Example**  
```js
window.plugin.myPlugin.requiredPlugins = [{  pluginKey: window.plugin.drawTools,  name: "draw tools"}, {  pluginKey: window.plugin.myotherplugin,  name: "My Other Plugin"}]...if (window.helper.requiredPlugins.areMissing(window.plugin.myPlugin.requiredPlugins)) {   return;}
```
<a name="window.helper.requiredPlugins(2).missingPluginNames"></a>

### window.helper.requiredPlugins.missingPluginNames(requiredPlugins) ⇒ <code>Array.&lt;PluginMetaData&gt;</code>
Checks if the prerequisite/required plugins are installed.

**Kind**: static method of <code>[window.helper.requiredPlugins](#window.helper.requiredPlugins(2))</code>  

| Param | Type | Description |
| --- | --- | --- |
| requiredPlugins | <code>Array.&lt;PluginMetaData&gt;</code> | An array of plugin meta-data on the required plugins. |

**Example**  
```js
window.plugin.myPlugin.requiredPlugins = [{  pluginKey: window.plugin.drawTools,  name: "draw tools"}, {  pluginKey: window.plugin.myotherplugin,  name: "My Other Plugin"}]...var missing = window.helper.requiredPlugins.missingPluginNames(window.plugin.myPlugin.requiredPlugins);if (missing.length > 0) {  msg = 'IITC plugin "' + pluginName + '" requires IITC plugin' + ((missing.length === 1) ? ' ' : 's ') +    ((missing.length === 1) ? missing[0] : (missing.slice(0,-1).join(", ") + " and " + missing[missing.length - 1])) + '.';  console.warn(msg);  alert(msg);}
```
<a name="window.helper.requiredPlugins(2).alertIfNotInstalled"></a>

### window.helper.requiredPlugins.alertIfNotInstalled(requiredPlugins, pluginName) ⇒ <code>boolean</code>
Checks if the pre-requisite plugins are installed.  If one or more requisites are not installed, an alert isdisplayed.

**Kind**: static method of <code>[window.helper.requiredPlugins](#window.helper.requiredPlugins(2))</code>  

| Param | Type | Description |
| --- | --- | --- |
| requiredPlugins | <code>Array.&lt;RequiredPluginMetaData&gt;</code> | An array of plugin meta-data on the required plugins. |
| pluginName | <code>string</code> | The name of the plugin requiring the required plugins.  Recommend using    `plugin_info.script.name`. |

**Example**  
```js
window.plugin.myPlugin.requiredPlugins = [{  pluginKey: window.plugin.drawTools,  name: "draw tools"}, {  pluginKey: window.plugin.myotherplugin,  name: "My Other Plugin"}]...if (!window.helper.requiredPlugins.alertIfNotInstalled(window.plugin.myPlugin.requiredPlugins, plugin_info.script.name) {   return;}
```
<a name="window.plugin.addRemoveMarker(2)"></a>

## window.plugin.addRemoveMarker
Add and Remove Marker namespace.  `self` is set to `window.plugin.addRemoveMarker`.

**Kind**: global variable  

* [window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))
    * [.requiredPlugins](#window.plugin.addRemoveMarker(2).requiredPlugins) : <code>Array.&lt;RequiredPluginMetaData&gt;</code>
    * [.portalDataInPortalDetails](#window.plugin.addRemoveMarker(2).portalDataInPortalDetails) : <code>ExtendedPortalData</code>
    * [.addMarker()](#window.plugin.addRemoveMarker(2).addMarker) ⇒
    * [.checkPortalDetailsUpdated(data)](#window.plugin.addRemoveMarker(2).checkPortalDetailsUpdated)
    * [.isMarked()](#window.plugin.addRemoveMarker(2).isMarked)
    * [.removeMarker()](#window.plugin.addRemoveMarker(2).removeMarker)
    * [.getToolboxControls()](#window.plugin.addRemoveMarker(2).getToolboxControls) ⇒ <code>Object</code>
    * [.setup()](#window.plugin.addRemoveMarker(2).setup)

<a name="window.plugin.addRemoveMarker(2).requiredPlugins"></a>

### window.plugin.addRemoveMarker.requiredPlugins : <code>Array.&lt;RequiredPluginMetaData&gt;</code>
An array of objects describing the required plugins.

**Kind**: static property of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
<a name="window.plugin.addRemoveMarker(2).portalDataInPortalDetails"></a>

### window.plugin.addRemoveMarker.portalDataInPortalDetails : <code>ExtendedPortalData</code>
When the extended portal details are loaded into the portal detailssection, the `checkPortalDetailsUpdated()` run hook will save theextended portal details object here.

**Kind**: static property of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
<a name="window.plugin.addRemoveMarker(2).addMarker"></a>

### window.plugin.addRemoveMarker.addMarker() ⇒
Adds a portal marker (map pin) if the selected portal is not already marked.

**Kind**: static method of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
**Returns**: a Leaflet layer object corresponding to the added portal marker  
<a name="window.plugin.addRemoveMarker(2).checkPortalDetailsUpdated"></a>

### window.plugin.addRemoveMarker.checkPortalDetailsUpdated(data)
Save the portal details.

**Kind**: static method of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  

| Param | Description |
| --- | --- |
| data | Object containing the guid, portal object, portalData object, and a portalDetails object. |

<a name="window.plugin.addRemoveMarker(2).isMarked"></a>

### window.plugin.addRemoveMarker.isMarked()
Returns true if the portal is already marked on the map; otherwise, returns false.

**Kind**: static method of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
<a name="window.plugin.addRemoveMarker(2).removeMarker"></a>

### window.plugin.addRemoveMarker.removeMarker()
Removes the marker (map pin) on the portal shown in the sidebar portal details.Only one marker is removed at a time.  If for some reason multiple markers havebeen put at the same location, multiple removes will need to be done.

**Kind**: static method of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
<a name="window.plugin.addRemoveMarker(2).getToolboxControls"></a>

### window.plugin.addRemoveMarker.getToolboxControls() ⇒ <code>Object</code>
Returns the DOM elements containing the plugin controls to be appended to the IITC toolbox.<br>Controls from other plugins with class "wise-toolbox-control" will be grouped into one subsection (same div tag).

**Kind**: static method of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
**Returns**: <code>Object</code> - Object suitable for a jQuery `append()`.  
<a name="window.plugin.addRemoveMarker(2).setup"></a>

### window.plugin.addRemoveMarker.setup()
Setup function to be called or handled by PLUGINEND code provided IITC build script.The function will be called if IITC is already loaded and, if not, saved for later execution.

**Kind**: static method of <code>[window.plugin.addRemoveMarker](#window.plugin.addRemoveMarker(2))</code>  
