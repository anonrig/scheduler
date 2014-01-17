goog.provide('sc.models.CourseModel');
goog.require('tart.components.mobile.Model');


/**
 * @extends {tart.components.mobile.Model}
 * @constructor
 */
sc.models.CourseModel = function() {
    goog.base(this);
    this.selectedCourses = [];
    this.allCourses = db;

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
    return goog.array.some(this.selectedCourses, function(course) { 
        return goog.array.some(course['informationList'], function(eachLesson){
            return this.collideHelper(eachLesson, chosenCourse);
        }, this);
    }, this);
};

sc.models.CourseModel.prototype.collideHelper = function(infoElement, course) {
    return goog.array.some(course['informationList'], function(eachLecture) {
        return (infoElement['startDate'] >= eachLecture['startDate'] && infoElement['startDate'] < eachLecture['endDate']) || (infoElement['endDate'] > eachLecture['startDate'] && infoElement['endDate'] <= eachLecture['endDate']); 
    }, this);
};

/**
* Adds selected course object to array
* @param {Object} chosenCourse
**/
sc.models.CourseModel.prototype.add = function(chosenCourse) {
    if (this.includes(chosenCourse)) throw new Error('Already in the list');
    if (this.collides(chosenCourse)) throw new Error(chosenCourse['title'] + ' Collides');

    this.selectedCourses.push(chosenCourse);

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

    rv && this.dispatchEvent(sc.models.CourseModel.EventType.REMOVE_COURSE);

    return rv;
};
