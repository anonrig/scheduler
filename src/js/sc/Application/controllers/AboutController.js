goog.provide('sc.controllers.AboutController');
goog.require('sc.views.scripts.about.index');
goog.require('tart.mvc.Controller');



/**
 * @constructor
 * @extends {tart.mvc.Controller}
 */
sc.controllers.AboutController = function() {
    goog.base(this);

};
goog.inherits(sc.controllers.AboutController, tart.mvc.Controller);


/**
 * @this {tart.mvc.Action}
 */
sc.controllers.AboutController.indexAction = function() {

    sc.Registry.get('navigationBar').setConfig({
        title: 'About Scheduler',
        type: 'About',
        order: 0
    });

    this.refresh = false;
    this.setViewScript(sc.views.scripts.about.index);
};
