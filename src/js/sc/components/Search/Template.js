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
        LIST: '.list',
        FORM: 'form'
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
            '<div class="scrollFixer"></div>' +
            '<p>Search for a course by its ID, code, name or instructor.</p>' +
            '<p>You can then add the course to your schedule.</p>' +
        '</div>';
};


sc.components.Search.Template.prototype.noResults = function() {
    return '<div class="empty">' +
            '<div class="scrollFixer"></div>' +
            'No results found.<br/>Try another search term.' +
        '</div>';
};


sc.components.Search.Template.prototype.search = function() {
    return '<div class="search">' +
            '<i class="icon-search"></i>' +
            '<form name="search">' +
                '<input type="text" class="search" placeholder="Type at least 3 letters to search" />' +
            '</form>' +
            '<div class="clear" style="display: none"><i class="icon-close"></i></div>' +
        '</div>';
};


sc.components.Search.Template.prototype.list = function(items) {
    return '<div class="scrollFixer"></div>' + items.map(this.item, this).join('');
};


sc.components.Search.Template.prototype.item = function(item) {
    var times = item['informationList'].map(function(info) {
        if (info['startDate'] == 'TBA') return 'TBA';

        return this.formatDate_(info['startDate'], true) + ' - ' + this.formatDate_(info['endDate']);
    }, this).join(', ');

    var teachers = item['informationList'].map(function(info) {
        return info['teacher'];
    });

    goog.array.removeDuplicates(teachers);

    var section = item['section'] == '0' ? '' : ' ' + item['section'];
    var selected = item['selected'] ? 'selected' : '';

    return '<div class="item ' + selected + '" data-courseId="' + item['id'] + '" data-href="#!/detail/' + item['id'] + '">' +
            '<h3><strong>' + item['name'] + section + '</strong> ' + item['title'] + '</h3>' +
            '<h4>' + teachers.join(', ') + '</h4>' +
            '<p>' + times + '</p>' +
            '<div class="icon">〉</div>' +
        '</div>';
};

sc.components.Search.Template.prototype.detailBase = function() {
    return '<div class="detail view"></div>';
};

sc.components.Search.Template.prototype.detail = function(item) {
    var times = item['informationList'].map(this.lecture, this).join('');

    var section = item['section'] == '0' ? '' : ' ' + item['section'];
    var summary = item['summary'] ? '<h2>Summary</h2><p>' + item['summary'] + '</p>' : '';
    var levels = item['levels'] ? '<h2>Levels</h2><p>' + item['levels'] + '</p>' : '';

    return '<h1>' + item['name'] + section + '</h1>' +
            '<h2>' + item['title'] + '</h2>' +
            '<div class="id">Course ID: ' + item['id'] + '</div>' +
            '<ol>' + times + '</ol>' +
            summary +
            levels;
};


sc.components.Search.Template.prototype.lecture = function(lecture) {
    var time = 'TBA';

    if (lecture['startDate'] != 'TBA') time = this.formatDate_(lecture['startDate'], true) + ' - ' +
        this.formatDate_(lecture['endDate']);

    return '<li>' +
            '<div class="lecture">' +
                '<h3>' + time + '</h3>' +
                '<h4>@' + lecture['location'] + '</h4>' +
                '<h5>' + lecture['teacher'] + '</h5>' +
            '</div>' +
        '</li>';
};


/**
 * Formats a Date to a suitable range representation.
 *
 * @param {Date} date Date object to be formatted.
 * @param {boolean=} opt_long Whether the return value should include day name.
 * @return {string} Date information.
 * @private
 */
sc.components.Search.Template.prototype.formatDate_ = function(date, opt_long) {
    var pattern = 'H:mm';
    if (opt_long) pattern = 'EE ' + pattern;
    return tart.date.formatMilliseconds(date, pattern, goog.i18n.TimeZone.createTimeZone(-120));
};


sc.components.Search.Template.prototype.scheduleBase = function() {
    return '<div class="schedule view">' +
        '</div>';
};


(function() {
    var dayNames = 'MTWTFSS'.split(''),
        dayHeight = 0,
        minTop = 1000;

    sc.components.Search.Template.prototype.schedule = function(coursesByDays) {
        minTop = 1000;

        var hasSaturday = !!coursesByDays[5],
            saturdayClass = hasSaturday ? 'hasSaturday' : '',
            days = coursesByDays.map(this.scheduleDay.bind(this, hasSaturday), this).join(''),
            top = minTop == 0 ? 0 : 30 - minTop;

        return '<style>.schedule.view .day { margin-top: ' + top + 'px }</style>' +
            '<div class="titles ' + saturdayClass + '">' +
                coursesByDays.map(this.scheduleDayName, this).join('') +
            '</div>' +
            '<div class="days ' + saturdayClass + '">' +
                '<div class="scrollFixer"></div>' +
                days +
            '</div>';
    };


    sc.components.Search.Template.prototype.scheduleDayName = function(day, index) {
        return '<h2>' + dayNames[index] + '</h2>';
    };


    sc.components.Search.Template.prototype.scheduleDay = function(isSlim, day) {
        dayHeight = 0;

        var dayMarkup = day.map(this.scheduleLecture.bind(this, isSlim), this).join('');

        return '<div class="day" style="height:' + dayHeight + 'px">' + dayMarkup + '</div>';
    };


    sc.components.Search.Template.prototype.scheduleLecture = function(isSlim, lecture) {
        var time = this.formatDate_(lecture.lecture['startDate']) + ' - ' + this.formatDate_(lecture.lecture['endDate']),
            courseDuration = Math.floor((lecture.lecture['endDate'] - lecture.lecture['startDate']) / 50 / 60 / 1000),
            height = courseDuration * 90,
            dayBeginning = new Date(lecture.lecture['startDate']);
            dayBeginning.setUTCHours(6);
            dayBeginning.setUTCMinutes(40);
            var top = Math.floor((lecture.lecture['startDate'] - dayBeginning) / 50 / 60 / 1000) * 90;

        dayHeight = Math.max(dayHeight, height + top);
        if (height > 0) minTop = Math.min(minTop, top);

        return '<div style="height: ' + height + 'px; top: ' + top + 'px" class="lecture">' +
                this.scheduleLectureName(lecture, isSlim) +
                '<div class="time">' + time + '</div>' +
                '<div class="time">' + lecture.lecture['location'] + '</div>' +
            '</div>';
    };
})();


sc.components.Search.Template.prototype.scheduleLectureName = function(lecture, isSlim) {
    var section = lecture.course['section'] == '0' ? '' : ' ' + lecture.course['section'],
        name = lecture.course['name'],// + section,
        maxLength = isSlim ? 90 : 110,
        fontSize = sc.util.calcuteFontSizeForWidth(name, maxLength);

    return '<h2 style="font-size:' + fontSize + 'px">' + name + '</h2>';
};
