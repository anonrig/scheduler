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
    var that = this,
        domMappings = this.view.template.domMappings,
        outsideTapListener,
        listParent = this.getDOM();

    // goog.events.listen(listParent, tart.events.EventType.SWIPE_RIGHT, function(e) {
    //     sc.router.redirectToRoute('search');
    // }, false, this);
};


sc.components.Search.DetailController.prototype.detail = function(id) {
	var course = sc.models.CourseModel.getInstance().find(id);
	this.view.detail(course);
    sc.Registry.get('navigationBar').setConfig({
        title: course['name'],
        backButtonText: 'Back',
        backButtonAction: function() {
            sc.router.redirectToRoute('search');
        },
        type: 'View',
        order: 1
    });
};
