goog.provide('sc.components.Search.RootController');
goog.require('sc.components.Search.DetailController');
goog.require('sc.components.Search.ListController');
goog.require('sc.components.Search.RootView');
goog.require('sc.components.Search.ScheduleController');



/**
 * Main controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.Search.RootController = function() {
    goog.base(this);

    this.listController = new sc.components.Search.ListController();
    this.detailController = new sc.components.Search.DetailController();
    this.scheduleController = new sc.components.Search.ScheduleController();
    this.view.setSubViews([this.scheduleController.view, this.listController.view, this.detailController.view]);
};
goog.inherits(sc.components.Search.RootController, tart.components.mobile.Controller);


/** @type {function(new:sc.components.Search.RootView)} */
sc.components.Search.RootController.prototype.viewClass = sc.components.Search.RootView;


sc.components.Search.RootController.prototype.list = function() {
    this.listController.list();

    if (window.location.toString().indexOf('refresh') != -1) this.view.activeView = null;

    this.view.setActiveView(this.listController.view);
};

sc.components.Search.RootController.prototype.detail = function(id) {
    this.detailController.detail(id);

    if (window.location.toString().indexOf('refresh') != -1) this.view.activeView = null;

    this.view.setActiveView(this.detailController.view);
};


sc.components.Search.RootController.prototype.schedule = function() {
    this.scheduleController.schedule();

    if (window.location.toString().indexOf('refresh') != -1) this.view.activeView = null;

    this.view.setActiveView(this.scheduleController.view);
};
