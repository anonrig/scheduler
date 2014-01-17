goog.provide('sc.components.CoursesCard.ListController');
goog.require('sc.components.CoursesCard.ListView');
goog.require('sc.components.CoursesCard.Model');
goog.require('sc.models.CourseModel');
goog.require('tart.components.mobile.Controller');




/**
 * List controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.CoursesCard.ListController = function() {
    this.courseModel = sc.models.CourseModel.getInstance();
    goog.base(this);
};
goog.inherits(sc.components.CoursesCard.ListController, tart.components.mobile.Controller);



sc.components.CoursesCard.ListController.prototype.viewClass = sc.components.CoursesCard.ListView;


sc.components.CoursesCard.ListController.prototype.bindEvents = function() {
    goog.events.listen(this.courseModel,
        [sc.models.CourseModel.EventType.ADD_COURSE, sc.models.CourseModel.EventType.REMOVE_COURSE], this.list,
        false, this);
};


sc.components.CoursesCard.ListController.prototype.list = function() {
    this.view.list(this.courseModel.selectedCourses);
};
