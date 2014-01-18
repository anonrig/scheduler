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
    this.cardModel = sc.components.CoursesCard.Model.getInstance();
    goog.base(this);
};
goog.inherits(sc.components.CoursesCard.ListController, tart.components.mobile.Controller);



sc.components.CoursesCard.ListController.prototype.viewClass = sc.components.CoursesCard.ListView;


sc.components.CoursesCard.ListController.prototype.bindEvents = function() {
    var State = sc.components.CoursesCard.Model.State;

    goog.events.listen(this.courseModel,
        [sc.models.CourseModel.EventType.ADD_COURSE, sc.models.CourseModel.EventType.REMOVE_COURSE], this.list,
        false, this);

    var mainDiv = this.getDOM();

    goog.events.listen(mainDiv, tart.events.EventType.TAP, function(e){
    	if (this.cardModel.state == State.TAB) {
            this.cardModel.setState(State.ON); console.log("girdi");
            this.view.setState()
        }
    }, false, this);

    goog.events.listen(mainDiv, tart.events.EventType.SWIPE_UP, function(){
    	if (this.cardModel.state == State.TAB) {
            this.cardModel.setState(State.ON); console.log("swipe up");
        }
    }, false, this);

    goog.events.listen(mainDiv, tart.events.EventType.SWIPE_DOWN, function(){
    	if (this.cardModel.state == State.ON) {
            this.cardModel.setState(State.OFF); console.log("swipe down");
        }
    }, false, this);
};


sc.components.CoursesCard.ListController.prototype.list = function() {
    this.view.list(this.courseModel.selectedCourses);
};
