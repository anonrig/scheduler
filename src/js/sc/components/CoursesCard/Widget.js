goog.provide('sc.components.CoursesCard.Widget');
goog.require('sc.components.CoursesCard.RootController');
goog.require('tart.components.mobile.Widget');



/**
 * Search widget.
 *
 * @constructor
 * @extends {tart.components.mobile.Widget}
 */
sc.components.CoursesCard.Widget = function() {
    goog.base(this);
};
goog.inherits(sc.components.CoursesCard.Widget, tart.components.mobile.Widget);
goog.addSingletonGetter(sc.components.CoursesCard.Widget);



/** @type {function(new:sc.components.CoursesCard.RootController)} */
sc.components.CoursesCard.Widget.prototype.controllerClass = sc.components.CoursesCard.RootController;


/**
 * Component's placeholder template
 * @return {string} placheolder markup.
 */
sc.components.CoursesCard.Widget.prototype.templates_placeholder = function () {
    return '<div class="coursesCard widgetPlaceholder" id="' + this.getId() + '"></div>';
};

