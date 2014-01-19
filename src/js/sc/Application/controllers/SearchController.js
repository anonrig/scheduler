goog.provide('sc.controllers.SearchController');
goog.require('sc.views.scripts.search.index');
goog.require('tart.mvc.Controller');



/**
 * @constructor
 * @extends {tart.mvc.Controller}
 */
sc.controllers.SearchController = function() {
    goog.base(this);

    this.widget = sc.Registry.get('SearchWidget', sc.components.Search.Widget);
};
goog.inherits(sc.controllers.SearchController, tart.mvc.Controller);


/**
 * @this {tart.mvc.Action}
 */
sc.controllers.SearchController.indexAction = function() {
    this.view.widget = this.controller.widget;

    this.view.widget.list();

    this.refresh = false;

    this.setViewScript(sc.views.scripts.search.index);
};


/**
 * @this {tart.mvc.Action}
 */
sc.controllers.SearchController.detailAction = function() {
	this.view.widget = this.controller.widget;

    this.view.widget.detail(this.params['id']);

    this.refresh = false;

    this.setViewScript(sc.views.scripts.search.index);
};


/**
 * @this {tart.mvc.Action}
 */
sc.controllers.SearchController.scheduleAction = function() {
	this.view.widget = this.controller.widget;

    this.view.widget.schedule();

    this.refresh = false;

    this.setViewScript(sc.views.scripts.search.index);
};
