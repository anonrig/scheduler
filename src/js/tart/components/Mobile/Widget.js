goog.provide('tart.components.mobile.Widget');

goog.require('tart.components.Widget');
goog.require('tart.components.mobile.Controller');



/**
 * @constructor
 * @extends {tart.components.Widget}
 */
tart.components.mobile.Widget = function() {
    this.controller = new this.controllerClass();
    goog.base(this);
};
goog.inherits(tart.components.mobile.Widget, tart.components.Widget);


/** @override */
tart.components.mobile.Widget.prototype.render = function() {
    goog.base(this, 'render');
    this.rendered = true;
};


/** Widget's render flag. */
tart.components.mobile.Widget.prototype.rendered = false;


/** Controller class of the component. */
tart.components.mobile.Widget.prototype.controllerClass = tart.components.mobile.Controller;
