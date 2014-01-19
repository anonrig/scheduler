goog.provide('sc.components.Search.ScheduleController');
goog.require('sc.components.Search.ScheduleView');
goog.require('sc.components.Search.Model');
goog.require('sc.components.Search.SidebarMenu');
goog.require('sc.models.CourseModel');
goog.require('tart.components.mobile.Controller');
goog.require('tart.events');
goog.require('sc.models.CourseModel');



/**
 * List controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.Search.ScheduleController = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.ScheduleController, tart.components.mobile.Controller);



sc.components.Search.ScheduleController.prototype.viewClass = sc.components.Search.ScheduleView;


sc.components.Search.ScheduleController.prototype.bindEvents = function() {
    goog.events.listen(this.getDOM(), tart.events.EventType.SWIPE_LEFT, function() {
         sc.router.redirectToRoute('search');
    }, false, this);
};


sc.components.Search.ScheduleController.prototype.schedule = function() {
	this.view.schedule();
    sc.Registry.get('navigationBar').setConfig({
        title: 'Schedule',
        type: 'Search',
        order: 0
    });
};
