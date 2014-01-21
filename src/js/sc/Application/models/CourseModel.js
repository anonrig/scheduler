goog.provide('sc.models.CourseModel');
goog.require('tart.components.mobile.Model');
goog.require('tart.storage.Storage');



/**
 * @extends {tart.components.mobile.Model}
 * @constructor
 */
sc.models.CourseModel = function() {
    goog.base(this);
    this.selectedCourses = [];
    this.allCourses = db;

    this.localStorage = new tart.storage.Storage();

    var selectedIds = this.localStorage.get('selectedCourses') || [];
    selectedIds.forEach(function(id) {
        this.add(this.find(id));
    }, this);
};
goog.inherits(sc.models.CourseModel, tart.components.mobile.Model);
goog.addSingletonGetter(sc.models.CourseModel);



/**
 *
 * @enum {string}
 */
sc.models.CourseModel.EventType = {
    ADD_COURSE: 'addCourse',
    REMOVE_COURSE: 'removeCourse'
};


/**
* Checks if list includes chosen course object
* @param {Object} chosenCourse
* @return {boolean}
**/
sc.models.CourseModel.prototype.includes = function(chosenCourse) {
   return goog.array.some(this.selectedCourses, function(course) { return course['id'] == chosenCourse['id']; });
};

/**
* Checks if the chosen course object collides with existing list
* @param {Object} chosenCourse
* @return {boolean}
**/
sc.models.CourseModel.prototype.collides = function(chosenCourse) {
    return goog.array.find(this.selectedCourses, function(course) {
        return goog.array.find(course['informationList'], function(eachLesson){
            return this.collideHelper(eachLesson, chosenCourse);
        }, this);
    }, this);
};

sc.models.CourseModel.prototype.collideHelper = function(infoElement, course) {
    return goog.array.find(course['informationList'], function(eachLecture) {
        return (infoElement['startDate'] >= eachLecture['startDate'] && infoElement['startDate'] < eachLecture['endDate']) || (infoElement['endDate'] > eachLecture['startDate'] && infoElement['endDate'] <= eachLecture['endDate']);
    }, this);
};

/**
* Adds selected course object to array
* @param {Object} chosenCourse
**/
sc.models.CourseModel.prototype.add = function(chosenCourse) {
    if (this.includes(chosenCourse)) throw new Error('Already in the list.');
    var course = this.collides(chosenCourse);
    if (course) throw new Error(chosenCourse['name'] + '-' + chosenCourse['section'] + ' has a collision with ' + course['name'] + '-' + course['section'] + ' with id ' + course['id'] + '.\nTry a different section.');

    this.selectedCourses.push(chosenCourse);
    chosenCourse['selected'] = true;

    this.localStorage.set('selectedCourses', this.selectedCourses.map(function(c) { return c['id'];}));

    this.dispatchEvent(sc.models.CourseModel.EventType.ADD_COURSE);
};

/**
* Find the course with the selected course id
* @param {string} chosenCourseId
* @return {Object}
**/
sc.models.CourseModel.prototype.find = function(chosenCourseId) {
    return goog.array.find(this.allCourses, function(course) { return course['id'] == chosenCourseId; });
};

/**
* @return {number}
**/
sc.models.CourseModel.prototype.count = function() {
    return this.selectedCourses.length;
};

/**
* Removes chosen course object from array
* @param {Object} chosenCourse
* @return {boolean}
**/
sc.models.CourseModel.prototype.remove = function(chosenCourse) {
    var rv = goog.array.remove(this.selectedCourses, chosenCourse);

    rv && (chosenCourse['selected'] = false);
    rv && this.dispatchEvent(sc.models.CourseModel.EventType.REMOVE_COURSE);

    this.localStorage.set('selectedCourses', this.selectedCourses.map(function(c) { return c['id'];}));

    return rv;
};


sc.models.CourseModel.prototype.getTotalHours = function() {
    return this.selectedCourses.reduce(function(i, v) {
        return i + v['informationList'].reduce(function(i, v) {
            var hours = v['startDate'] == 'TBA' ? 0 : Math.floor((v['endDate'] - v['startDate']) / 50 / 60 / 1000);
            return i + hours;
        }, 0);
    }, 0);
};


sc.models.CourseModel.prototype.getDaysWithCourses = function() {
    var days = {};
    this.selectedCourses.forEach(function(course) {
        course['informationList'].forEach(function(lecture) {
            days[new Date(lecture['startDate']).getDay()] = true;
        });
    });

    return days;
};


sc.models.CourseModel.prototype.getCoursesByDays = function() {
    var days = [[], [], [], [], []];
    this.selectedCourses.forEach(function(course) {
        course['informationList'].forEach(function(lecture) {
            var dayNumber = new Date(lecture['startDate']).getDay() - 1,
                day = days[dayNumber] = days[dayNumber] || [];

            day.push({
                course: course,
                lecture: lecture
            });
        });
    });

    return days;
};
