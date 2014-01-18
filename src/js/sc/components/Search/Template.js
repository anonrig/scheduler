goog.provide('sc.components.Search.Template');
goog.require('tart.components.mobile.Template');
goog.require('tart.date');



/**
 * Search widget template class.
 *
 * @constructor
 * @extends {tart.components.mobile.Template}
 */
sc.components.Search.Template = function() {
    goog.base(this);

    this.domMappings = {
        SEARCH_INPUT: 'input',
        SEARCH_CLEAR: '.clear',
        LIST: '.list'
    };
};
goog.inherits(sc.components.Search.Template, tart.components.mobile.Template);
goog.addSingletonGetter(sc.components.Search.Template);


/**
 * Main view base template.
 *
 * @return {string} Markup.
 */
sc.components.Search.Template.prototype.base = function() {
    return '<div class="root view"></div>';
};


sc.components.Search.Template.prototype.listBase = function() {
    return '<div class="searchList view">' +
            this.search() +
            '<div class="list courses">' +
                this.empty() +
            '</div>' +
        '</div>';
};


sc.components.Search.Template.prototype.empty = function() {
    return '<div class="empty">' +
            '<p>Search for a course by its ID, code, name or instructor.</p>' +
            '<p>You can then add the course to your schedule.</p>' +
        '</div>';
};


sc.components.Search.Template.prototype.search = function() {
    return '<div class="search">' +
            '<i class="icon-search"></i>' +
            '<form name="search" onsubmit="return false;">' +
                '<input type="text" class="search" placeholder="Enter course ID, code or name" />' +
            '</form>' +
            '<div class="clear" style="display: none"><i class="icon-close"></i></div>' +
        '</div>';
};


sc.components.Search.Template.prototype.item = function(item) {
    var times = item['informationList'].map(function(info) {
        return this.formatDate_(info['startDate'], true) + ' - ' + this.formatDate_(info['endDate']);
    }, this).join(', ');

    var teachers = item['informationList'].map(function(info) {
        return info['teacher'];
    });

    goog.array.removeDuplicates(teachers);

    var section = item['section'] == '0' ? '' : ' - ' + item['section'];

    return '<div class="item" data-courseId="' + item['id'] + '" data-href="#!/detail/' + item['id'] + '">' +
            '<h3><strong>' + item['name'] + section + '</strong> ' + item['title'] + '</h3>' +
            '<h4>' + teachers.join(', ') + '</h4>' +
            '<p>' + times + '</p>' +
            '<div class="icon">〉</div>' +
        '</div>';
};

sc.components.Search.Template.prototype.detailBase = function(item) {
    return '<div class="detail view">' +
//            this.detailItem(item) +
        '</div>';
};

sc.components.Search.Template.prototype.detail = function(item) {
    var times = item['informationList'].map(function(info) {
        return 'Lecturer: ' + info['teacher'] + ', ' + this.formatDate_(info['startDate'], true) + ' - ' + this.formatDate_(info['endDate']) + ' @ ' + info['location'];
    }, this).join('</p><p>');

    var teachers = item['informationList'].map(function(info) {
        return info['teacher'];
    });

    goog.array.removeDuplicates(teachers);

    return '<div class="lecture" data-courseId="' + item['id'] + '">' +
            '<div class="lecture info"><h3><strong>' + item['name'] + ' ' + item['section'] + '</strong> ' + item['title'] + '</h3></div>' +
            '<div class="lecture id"><p>Course ID: ' + item['id'] + '</p>' +
            '<div class="lecture locations"><p>' + times + '</p></div>' +
            '<a class="lecture catalog" href="' + item['catalog'] + '"/>Catalog Link</a>' +
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
sc.components.Search.Template.prototype.formatDate_ = function(date, long) {
    if (!date) return 'TBD';

    var pattern = 'H:m';
    if (long) pattern = 'EE ' + pattern;
    return tart.date.formatMilliseconds(+(new Date(date)), pattern, goog.i18n.TimeZone.createTimeZone(0));
};
