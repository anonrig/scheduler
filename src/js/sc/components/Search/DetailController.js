goog.provide('sc.components.Search.DetailController');
goog.require('sc.components.Search.DetailView');
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
sc.components.Search.DetailController = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.DetailController, tart.components.mobile.Controller);



sc.components.Search.DetailController.prototype.viewClass = sc.components.Search.DetailView;


sc.components.Search.DetailController.prototype.bindEvents = function() {
    goog.events.listen(this.getDOM(), tart.events.EventType.SWIPE_RIGHT, function() {
         sc.router.redirectToRoute('search');
    }, false, this);
};


sc.components.Search.DetailController.prototype.detail = function(id) {
	var course = sc.models.CourseModel.getInstance().find(id);
	this.view.detail(course);
    setTimeout(function() {
        sc.Registry.get('navigationBar').setConfig({
            title: course['name'] + ' Details',
            backButtonText: '',
            backButtonAction: function() {
                sc.router.redirectToRoute('search');
            },
            type: 'Search',
            order: 2
        });
    }, 1);
};
