goog.provide('sc.components.CoursesCard.RootController');
goog.require('sc.components.CoursesCard.ListController');
goog.require('sc.components.CoursesCard.RootView');



/**
 * Main controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.CoursesCard.RootController = function() {
    goog.base(this);

    this.listController = new sc.components.CoursesCard.ListController();
    this.view.addSubView(this.listController.view);
    this.view.setActiveView(this.listController.view);
};
goog.inherits(sc.components.CoursesCard.RootController, tart.components.mobile.Controller);


/** @type {function(new:sc.components.CoursesCard.RootView)} */
sc.components.CoursesCard.RootController.prototype.viewClass = sc.components.CoursesCard.RootView;
