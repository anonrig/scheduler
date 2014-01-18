goog.provide('sc.components.CoursesCard.Model');
goog.require('tart.components.mobile.Model');



/**
 * @extends {tart.components.mobile.Model}
 * @constructor
 */
sc.components.CoursesCard.Model = function() {
    goog.base(this);
    this.state = sc.components.CoursesCard.Model.State.OFF;
};
goog.inherits(sc.components.CoursesCard.Model, tart.components.mobile.Model);
goog.addSingletonGetter(sc.components.CoursesCard.Model);


/**
 *
 * @enum {string}
 */
sc.components.CoursesCard.Model.State = {
    OFF: 'widgetOff',
    TAB: 'widgetTab',
    ON: 'widgetOn'
};


sc.components.CoursesCard.Model.prototype.setState = function(newState) {
    var State = sc.components.CoursesCard.Model.State;
    if ((this.state == State.OFF || this.state == State.ON) && (newState == State.TAB) ||
        (this.state == State.TAB) && (newState == State.OFF || newState == State.ON)) {
        this.state = newState;
    }
};
