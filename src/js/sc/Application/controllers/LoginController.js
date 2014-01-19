goog.provide('sc.controllers.LoginController');
goog.require('sc.views.scripts.login.index');
goog.require('tart.mvc.Controller');



/**
 * @constructor
 * @extends {tart.mvc.Controller}
 */
sc.controllers.LoginController = function() {
    goog.base(this);

    this.widget = sc.Registry.get('LoginWidget', sc.components.Login.Widget);
};
goog.inherits(sc.controllers.LoginController, tart.mvc.Controller);


/**
 * @this {tart.mvc.Action}
 */
sc.controllers.LoginController.indexAction = function() {
	this.view.widget = this.controller.widget;
    this.refresh = false;
    this.setViewScript(sc.views.scripts.login.index);
};