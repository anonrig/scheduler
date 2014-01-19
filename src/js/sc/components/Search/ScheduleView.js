goog.provide('sc.components.Search.ScheduleView');
goog.require('goog.style');
goog.require('sc.components.Search.Template');
goog.require('tart.components.mobile.View');



/**
 * List view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 */
sc.components.Search.ScheduleView = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.ScheduleView, tart.components.mobile.View);


/** @type {function(new:sc.components.Search.Template)} */
sc.components.Search.ScheduleView.prototype.templateClass = sc.components.Search.Template;


/** @override */
sc.components.Search.ScheduleView.prototype.index = 0;


/**
 * @override
 */
sc.components.Search.ScheduleView.prototype.render = function() {
    return this.template.scheduleBase();
};


sc.components.Search.ScheduleView.prototype.schedule = function(item) {
    this.getDOM().innerHTML = this.template.schedule(item);
};
