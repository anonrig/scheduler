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
    var that = this;

    if (window.location.toString().indexOf('refresh') != -1) this.view.activeView = null;

    setTimeout(function() {
        that.listController.list();
        that.view.setActiveView(that.listController.view);
    }, 1);
};

sc.components.Search.RootController.prototype.detail = function(id) {
    var that = this;

    this.detailController.detawil(id);

    if (window.location.toString().indexOf('refresh') != -1) this.view.activeView = null;

    setTimeout(function() {
        that.view.setActiveView(that.detailController.view);
    }, 1);
};


sc.components.Search.RootController.prototype.schedule = function() {
    var that = this;

    if (window.location.toString().indexOf('refresh') != -1) this.view.activeView = null;

    setTimeout(function() {
        that.scheduleController.schedule();
        that.view.setActiveView(that.scheduleController.view);
    }, 1);
};
