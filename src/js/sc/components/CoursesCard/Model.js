goog.provide('sc.components.CoursesCard.Model');
goog.require('tart.components.mobile.Model');



/**
 * @extends {tart.components.mobile.Model}
 * @constructor
 */
sc.components.CoursesCard.Model = function() {
    goog.base(this);
    this.state = sc.components.CoursesCard.Model.State.OFF;
    this.courseModel = sc.models.CourseModel.getInstance();
    this.onCoursesUpdated();

    goog.events.listen(this.courseModel,
        [sc.models.CourseModel.EventType.ADD_COURSE, sc.models.CourseModel.EventType.REMOVE_COURSE],
        this.onCoursesUpdated, false, this);
};
goog.inherits(sc.components.CoursesCard.Model, tart.components.mobile.Model);
goog.addSingletonGetter(sc.components.CoursesCard.Model);


/**
 * @enum {string}
 */
sc.components.CoursesCard.Model.State = {
    OFF: 'off',
    TAB: 'tab',
    ON: 'on'
};


/**
 * @enum {string}
 */
sc.components.CoursesCard.Model.EventType = {
    STATE_UPDATED: 'stateUpdated'
};


/**
 *
 * @param {sc.components.CoursesCard.Model.State} newState New state to set the card.
 * @param {boolean=} opt_force Whether to force the new state. Otherwise it will be decided with a state machine.
 */
sc.components.CoursesCard.Model.prototype.setState = function(newState, opt_force) {
    var State = sc.components.CoursesCard.Model.State;

    if (opt_force || (this.state == State.OFF || this.state == State.ON) && (newState == State.TAB) ||
        (this.state == State.TAB) && (newState == State.OFF || newState == State.ON)) {
        this.state = newState;
    }

    this.dispatchEvent(sc.components.CoursesCard.Model.EventType.STATE_UPDATED);
};


sc.components.CoursesCard.Model.prototype.onCoursesUpdated = function() {
    var State = sc.components.CoursesCard.Model.State,
        newState = State.OFF;

    switch(this.state) {
        case State.OFF:
            if (this.courseModel.count() > 0) newState = State.TAB;
            break;
        case State.TAB:
            if (this.courseModel.count() > 0) newState = State.TAB;
            break;
        case State.ON:
            if (this.courseModel.count() > 0) newState = State.ON;
    }

    this.setState(newState);
};
