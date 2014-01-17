goog.provide('sc.components.CoursesCard.RootView');
goog.require('sc.components.CoursesCard.Template');
goog.require('tart.components.mobile.View');



/**
 * Main view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 */
sc.components.CoursesCard.RootView = function() {
    goog.base(this, this.templateClass.getInstance());
};
goog.inherits(sc.components.CoursesCard.RootView, tart.components.mobile.View);


/** @type {function(new:sc.components.CoursesCard.Template)} */
sc.components.CoursesCard.RootView.prototype.templateClass = sc.components.CoursesCard.Template;

