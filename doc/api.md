## Modules

<dl>
<dt><a href="#module_addRemoveMarker">addRemoveMarker</a> : <code>function</code></dt>
<dd><p>Add and Remove Marker IITC plugin.  The plugin and its members can be accessed via
<code>window.plugin.addRemoveMarker</code>.  The &quot;public&quot; members are documented as module members while the more
friend and private members are documented as part of the <code>wrapper</code> function.</p>
</dd>
<dt><a href="#module_ToolboxControlSection">ToolboxControlSection</a> : <code>function</code></dt>
<dd><p>ToolboxControlSection Class.  Provides a standardized way of adding toolbox controls and grouping controls in 
the same &quot;family&quot;.</p>
</dd>
</dl>

## Functions

<dl>
<dt><a href="#wrapper">wrapper(plugin_info)</a></dt>
<dd><p>Closure function for Portals-in-Polygon.</p>
<p>Standard IITC wrapper pattern used to create the plugin&#39;s closure when
&quot;installed&quot; using <code>document.createElement(&quot;script&quot;.appendChild(document.createTextNode(&#39;(&#39;+ wrapper +&#39;)(&#39;+JSON.stringify(info)+&#39;);&#39;));</code></p>
</dd>
</dl>

<a name="module_addRemoveMarker"></a>

## addRemoveMarker : <code>function</code>
Add and Remove Marker IITC plugin.  The plugin and its members can be accessed via`window.plugin.addRemoveMarker`.  The "public" members are documented as module members while the morefriend and private members are documented as part of the `wrapper` function.

**See**: [wrapper](#wrapper)  
<a name="module_ToolboxControlSection"></a>

## ToolboxControlSection : <code>function</code>
ToolboxControlSection Class.  Provides a standardized way of adding toolbox controls and grouping controls in the same "family".

<a name="wrapper"></a>

## wrapper(plugin_info)
Closure function for Portals-in-Polygon.Standard IITC wrapper pattern used to create the plugin's closure when"installed" using `document.createElement("script".appendChild(document.createTextNode('('+ wrapper +')('+JSON.stringify(info)+');'));`

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| plugin_info | <code>Object</code> | Object containing Greasemonkey/Tampermonkey information about the plugin. |
| plugin_info.script | <code>string</code> | Greasemonkey/Tampermonkey information about the plugin. |
| plugin_info.script.version | <code>string</code> | GM_info.script.version. |
| plugin_info.script.name | <code>string</code> | GM_info.script.name. |
| plugin_info.script.description | <code>string</code> | GM_info.script.description. |


* [wrapper(plugin_info)](#wrapper)
    * [~ToolboxControlSection](#wrapper..ToolboxControlSection)
        * [new ToolboxControlSection(content, controlSectionClass, [controlClass])](#new_wrapper..ToolboxControlSection_new)
        * [.attr()](#wrapper..ToolboxControlSection+attr) ⇒ <code>String</code>
        * [.mergeWithFamily()](#wrapper..ToolboxControlSection+mergeWithFamily)
        * [.valueOf()](#wrapper..ToolboxControlSection+valueOf) ⇒ <code>Object</code>
    * [~self](#wrapper..self) : <code>object</code>
        * [.addItem(item)](#wrapper..self.addItem) ⇒
        * [.addMarker()](#wrapper..self.addMarker) ⇒
        * [.checkPortalDetailsUpdated(data)](#wrapper..self.checkPortalDetailsUpdated)
        * [.isMarked()](#wrapper..self.isMarked)
        * [.removeMarker()](#wrapper..self.removeMarker)
        * [.getToolboxControls()](#wrapper..self.getToolboxControls) ⇒ <code>Object</code>
        * [.setup()](#wrapper..self.setup)

<a name="wrapper..ToolboxControlSection"></a>

### wrapper~ToolboxControlSection
**Kind**: inner class of <code>[wrapper](#wrapper)</code>  

* [~ToolboxControlSection](#wrapper..ToolboxControlSection)
    * [new ToolboxControlSection(content, controlSectionClass, [controlClass])](#new_wrapper..ToolboxControlSection_new)
    * [.attr()](#wrapper..ToolboxControlSection+attr) ⇒ <code>String</code>
    * [.mergeWithFamily()](#wrapper..ToolboxControlSection+mergeWithFamily)
    * [.valueOf()](#wrapper..ToolboxControlSection+valueOf) ⇒ <code>Object</code>

<a name="new_wrapper..ToolboxControlSection_new"></a>

#### new ToolboxControlSection(content, controlSectionClass, [controlClass])
Creates a new ToolboxControlSection.


| Param | Type | Description |
| --- | --- | --- |
| content | <code>String</code> &#124; <code>Element</code> &#124; <code>Text</code> &#124; <code>Array</code> &#124; <code>jQuery</code> | A object suitable for passing to `jQuery.append()`: a 	DOM element, text node, array of elements and text nodes, HTML string, or jQuery object to insert at the end of 	each element in the set of matched elements. |
| controlSectionClass | <code>String</code> | The class name for a section of controls, typically in a `div` tag. |
| [controlClass] | <code>String</code> | An optional class name of a simple control or collection of controls. |

<a name="wrapper..ToolboxControlSection+attr"></a>

#### toolboxControlSection.attr() ⇒ <code>String</code>
See jQuery `.attr()` function.

**Kind**: instance method of <code>[ToolboxControlSection](#wrapper..ToolboxControlSection)</code>  
<a name="wrapper..ToolboxControlSection+mergeWithFamily"></a>

#### toolboxControlSection.mergeWithFamily()
Appends toolbox controls with the same toolbox control section class and toolbox control class.

**Kind**: instance method of <code>[ToolboxControlSection](#wrapper..ToolboxControlSection)</code>  
<a name="wrapper..ToolboxControlSection+valueOf"></a>

#### toolboxControlSection.valueOf() ⇒ <code>Object</code>
Override valueOf so that we get the desired behavior of getting the jQuery object when we access an objectdirectly.  For example,```$("#toolbox").append(new ToolboxControlSection(html, "myfamily-control-section", "myfamily-control").mergeWithFamily();```

**Kind**: instance method of <code>[ToolboxControlSection](#wrapper..ToolboxControlSection)</code>  
**Returns**: <code>Object</code> - jQuery object.  
<a name="wrapper..self"></a>

### wrapper~self : <code>object</code>
Add and Remove Marker namespace.  `self` is set to `window.plugin.portalsinpolygons`.

**Kind**: inner namespace of <code>[wrapper](#wrapper)</code>  

* [~self](#wrapper..self) : <code>object</code>
    * [.addItem(item)](#wrapper..self.addItem) ⇒
    * [.addMarker()](#wrapper..self.addMarker) ⇒
    * [.checkPortalDetailsUpdated(data)](#wrapper..self.checkPortalDetailsUpdated)
    * [.isMarked()](#wrapper..self.isMarked)
    * [.removeMarker()](#wrapper..self.removeMarker)
    * [.getToolboxControls()](#wrapper..self.getToolboxControls) ⇒ <code>Object</code>
    * [.setup()](#wrapper..self.setup)

<a name="wrapper..self.addItem"></a>

#### self.addItem(item) ⇒
Adds a layer item (e.g., a marker) to the map.  Copied from plugin.drawTools.import.

**Kind**: static method of <code>[self](#wrapper..self)</code>  
**Returns**: A Leaflet layer object.  

| Param | Description |
| --- | --- |
| item | An object contain data for the layer. |

<a name="wrapper..self.addMarker"></a>

#### self.addMarker() ⇒
Adds a portal marker (map pin) if the selected portal is not already marked.

**Kind**: static method of <code>[self](#wrapper..self)</code>  
**Returns**: a Leaflet layer object corresponding to the added portal marker  
<a name="wrapper..self.checkPortalDetailsUpdated"></a>

#### self.checkPortalDetailsUpdated(data)
Save the portal details.

**Kind**: static method of <code>[self](#wrapper..self)</code>  

| Param | Description |
| --- | --- |
| data | Object containing the guid, portal object, portalData object, and a portalDetails object. |

<a name="wrapper..self.isMarked"></a>

#### self.isMarked()
Returns true if the portal is already marked on the map; otherwise, returns false.

**Kind**: static method of <code>[self](#wrapper..self)</code>  
<a name="wrapper..self.removeMarker"></a>

#### self.removeMarker()
Removes the marker (map pin) on the portal shown in the sidebar portal details.Only one marker is removed at a time.  If for some reason multiple markers havebeen put at the same location, multiple removes will need to be done.

**Kind**: static method of <code>[self](#wrapper..self)</code>  
<a name="wrapper..self.getToolboxControls"></a>

#### self.getToolboxControls() ⇒ <code>Object</code>
Returns the DOM elements containing the plugin controls to be appended to the IITC toolbox.<br>Controls from other plugins with class "wise-toolbox-control" will be grouped into one subsection (same div tag).

**Kind**: static method of <code>[self](#wrapper..self)</code>  
**Returns**: <code>Object</code> - Object suitable for a jQuery `append()`.  
<a name="wrapper..self.setup"></a>

#### self.setup()
Setup function called by IITC.

**Kind**: static method of <code>[self](#wrapper..self)</code>  
