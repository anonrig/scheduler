goog.provide('sc.components.Login.Widget');
goog.require('sc.components.Login.Controller');
goog.require('tart.components.mobile.Widget');



/**
 * Login widget.
 *
 * @constructor
 * @extends {tart.components.mobile.Widget}
 */
sc.components.Login.Widget = function() {
    goog.base(this);
};
goog.inherits(sc.components.Login.Widget, tart.components.mobile.Widget);


/** @type {function(new:sc.components.Login.Controller)} */
sc.components.Login.Widget.prototype.controllerClass = sc.components.Login.Controller;

sc.components.Login.Widget.prototype.login = function(id) {
    this.controller.login();
};
