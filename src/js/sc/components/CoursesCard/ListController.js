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

    goog.events.listen(mainDiv, tart.events.EventType.TAP, function(e) {
        if (this.cardModel.state == State.TAB) this.cardModel.setState(State.ON);
        else if (this.cardModel.state == State.ON && e.target.classList.contains('count'))
            this.cardModel.setState(State.TAB);
    }, false, this);

    goog.events.listen(mainDiv, tart.events.EventType.SWIPE_UP, function() {
        if (this.cardModel.state == State.TAB) this.cardModel.setState(State.ON);
    }, false, this);

    goog.events.listen(mainDiv, tart.events.EventType.SWIPE_DOWN, function(e) {
        if (!e.target.classList.contains('count')) return;

        if (this.cardModel.state == State.ON) this.cardModel.setState(State.TAB);
    }, false, this);

    goog.events.listen(this.cardModel, sc.components.CoursesCard.Model.EventType.STATE_UPDATED, this.onStateUpdated,
        false, this);

    goog.events.listen(sc.Registry.get('eventManager'), sc.Application.EventType.ON_NAVIGATE, function(e) {
        if (e.url.toString().indexOf('search') == -1)
            this.cardModel.setState(State.OFF, true);
        else if (this.courseModel.count() > 0) {
            this.cardModel.setState(State.TAB, true);
        }
    }, false, this);
};


sc.components.CoursesCard.ListController.prototype.list = function() {
    this.view.list(this.courseModel.selectedCourses, this.courseModel.getTotalHours());

    if (this.courseModel.selectedCourses.length > 1)
        setTimeout(function() {
            var element = goog.dom.query('.coursesCard')[0];

            element.style.webkitAnimation = 'hop .5s ease-out';

            element.addEventListener('webkitAnimationEnd', function(){
                element.style.webkitAnimation = '';
            }, false);
        }, 10);
};


sc.components.CoursesCard.ListController.prototype.onStateUpdated = function(e) {
    this.view.setState(this.cardModel.state);
};
