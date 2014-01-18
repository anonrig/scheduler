goog.provide('sc.components.Search.RootController');
goog.require('sc.components.Search.ListController');
goog.require('sc.components.Search.DetailController');
goog.require('sc.components.Search.RootView');



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
    this.view.addSubView(this.listController.view);
    this.view.addSubView(this.detailController.view);
};
goog.inherits(sc.components.Search.RootController, tart.components.mobile.Controller);


/** @type {function(new:sc.components.Search.RootView)} */
sc.components.Search.RootController.prototype.viewClass = sc.components.Search.RootView;


sc.components.Search.RootController.prototype.list = function() {
    this.listController.list();
    this.view.setActiveView(this.listController.view);
};

sc.components.Search.RootController.prototype.detail = function(id) {
    this.detailController.detail(id);
    this.view.setActiveView(this.detailController.view);
};
