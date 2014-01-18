goog.provide('sc.components.Search.Widget');
goog.require('sc.components.Search.RootController');
goog.require('tart.components.mobile.Widget');



/**
 * Search widget.
 *
 * @constructor
 * @extends {tart.components.mobile.Widget}
 */
sc.components.Search.Widget = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.Widget, tart.components.mobile.Widget);


/** @type {function(new:sc.components.Search.RootController)} */
sc.components.Search.Widget.prototype.controllerClass = sc.components.Search.RootController;


sc.components.Search.Widget.prototype.list = function() {
    this.controller.list();
};

sc.components.Search.Widget.prototype.detail = function(id) {
	this.controller.detail(id);
}