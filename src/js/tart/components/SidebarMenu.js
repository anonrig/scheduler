goog.require('tart.ui.DlgComponent');

goog.provide('tart.components.SidebarMenu');



/**
 * @constructor
 * @extends {tart.ui.DlgComponent}
 */
tart.components.SidebarMenu = function() {
    goog.base(this);
};
goog.inherits(tart.components.SidebarMenu, tart.ui.DlgComponent);


/**
 * @type {string} Sidebar menu title.
 */
tart.components.SidebarMenu.prototype.title = '';

/**
 * @type {string} optional container class.
 */
tart.components.SidebarMenu.prototype.optionalClass = '';


/**
 * @return {string} Base template of NavigationBar component.
 */
tart.components.SidebarMenu.prototype.templates_base = function() {
    return '<div class="sidebarMenu ' + this.optionalClass + '" id="' + this.id + '">' +
               '<h2>' + this.title + '</h2>' +
               '<div class="items">' +
                    this.templates_items() +
               '</div>' +
           '</div>';
};


/**
 * @return {string} Sidebar items.
 */
tart.components.SidebarMenu.prototype.templates_items = function() {
    return '';
};


tart.components.SidebarMenu.prototype.onItemTap = function(e) {
    if (!e.target.getAttribute('data-href'))
        goog.dom.classes.toggle(e.target, 'open');
};


tart.components.SidebarMenu.prototype.mappings = {
    ITEM: '.item'
};


(function() {
    this.events = {};
    var tap = this.events[tart.events.EventType.TAP] = {};
    tap[this.mappings.ITEM] = this.onItemTap;
}).call(tart.components.SidebarMenu.prototype);
