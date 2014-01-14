goog.require('tart.ui.DlgComponent');

goog.provide('tart.components.TabBar');



/**
 * @constructor
 * @extends {tart.ui.DlgComponent}
 */
tart.components.TabBar = function() {
    goog.base(this);
};
goog.inherits(tart.components.TabBar, tart.ui.DlgComponent);


/**
 * @return {string} Base template of NavigationBar component.
 */
tart.components.TabBar.prototype.templates_base = function() {
    return '';
};


/**
 * @enum {string} Dom mappings.
 */
tart.components.TabBar.prototype.mappings = {
    ITEMS: '.item',
    ACTIVE: '.active',
};


/**
 * @param {goog.events.BrowserEvent} e Item touch event handler.
 */
tart.components.TabBar.prototype.onItemTap = function(e) {
    this.deactivateActiveItem();
    this.activateItem(e.target);
};


/**
 * Removes active class of active item.
 */
tart.components.TabBar.prototype.deactivateActiveItem = function() {
    var activeItem = this.getChild(this.mappings.ACTIVE);
    if (activeItem && activeItem.length)
        goog.dom.classes.remove(activeItem[0], 'active');
};


/**
 * Adds active class to item.
 * @param {Node} item to be active.
 */
tart.components.TabBar.prototype.activateItem = function(item) {
    if (item)
        goog.dom.classes.add(item, 'active');
};


(function() {
    this.events = {};
    var tap = this.events[goog.events.EventType.TOUCHEND] = {};
    tap[this.mappings.ITEMS] = this.onItemTap;
}).call(tart.components.TabBar.prototype);
