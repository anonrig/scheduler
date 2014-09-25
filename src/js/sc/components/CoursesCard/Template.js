goog.provide('sc.components.CoursesCard.Template');
goog.require('tart.components.mobile.Template');
goog.require('tart.date');



/**
 * Search widget template class.
 *
 * @constructor
 * @extends {tart.components.mobile.Template}
 */
sc.components.CoursesCard.Template = function() {
    goog.base(this);

    this.domMappings = {
        LIST: '.list',
        COUNT: '.count'
    };
};
goog.inherits(sc.components.CoursesCard.Template, tart.components.mobile.Template);
goog.addSingletonGetter(sc.components.CoursesCard.Template);


/**
 * Main view base template.
 *
 * @return {string} Markup.
 */
sc.components.CoursesCard.Template.prototype.base = function() {
    return '<div class="courses root view"></div>';
};


sc.components.CoursesCard.Template.prototype.listBase = function(items, hours) {
    var markup = items ? items.map(this.item, this).join('') : '';

    return '<div class="coursesList view">' +
            '<div class="bg"></div>' +
            '<div class="bg2"></div>' +
            '<div class="count">' + items.length + ' courses, ' + hours + ' hours.' + '</div>' +
            '<div class="list courses">' +
                this.list(items) +
            '</div>' +
        '</div>';
};


sc.components.CoursesCard.Template.prototype.list = function(items) {
    return '<div class="container">' +
            items.map(this.item, this).join('') +
        '</div>';
};


sc.components.CoursesCard.Template.prototype.item = function(item) {
    var times = item['informationList'].map(function(info) {
        if (info['startDate'] == 'TBA') return 'TBA';

        return this.formatDate_(info['startDate'], true) + ' - ' + this.formatDate_(info['endDate']);
    }, this).join(', ');

    var teachers = item['informationList'].map(function(info) {
        return info['teacher'];
    });

    goog.array.removeDuplicates(teachers);

    var section = item['section'] == '0' ? '' : ' ' + item['section'];

    return '<div class="item" data-courseId="' + item['id'] + '">' +
            '<h3><strong>' + item['name'] + section + '</strong> ' + item['title'] + '</h3>' +
            '<h4>' + item['id'] + ' ' + teachers.join(', ') + '</h4>' +
            '<p>' + times + '</p>' +
        '</div>';
};


/**
 * Formats a Date to a suitable range representation.
 *
 * @param {Date} date Date object to be formatted.
 * @param {boolean} long Whether the return value should include day name.
 * @return {string} Date information.
 * @private
 */
sc.components.CoursesCard.Template.prototype.formatDate_ = function(date, long) {
    var pattern = long ? 'EE H:mm' : 'H:mm';

    return tart.date.formatMilliseconds(date, pattern, goog.i18n.TimeZone.createTimeZone(-120));
};
