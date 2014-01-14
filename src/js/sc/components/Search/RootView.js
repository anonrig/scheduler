goog.provide('sc.components.Search.RootView');
goog.require('sc.components.Search.Template');
goog.require('tart.components.mobile.View');



/**
 * Main view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 */
sc.components.Search.RootView = function() {
    goog.base(this, this.templateClass.getInstance());
};
goog.inherits(sc.components.Search.RootView, tart.components.mobile.View);


/** @type {function(new:sc.components.Search.Template)} */
sc.components.Search.RootView.prototype.templateClass = sc.components.Search.Template;

