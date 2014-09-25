goog.provide('sc.components.Search.ListController');
goog.require('sc.components.Search.ListView');
goog.require('sc.components.Search.Model');
goog.require('sc.components.Search.DetailController');
goog.require('sc.components.Search.SidebarMenu');
goog.require('sc.models.CourseModel');
goog.require('tart.components.mobile.Controller');
goog.require('tart.events');




/**
 * List controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.Search.ListController = function() {
    goog.base(this);
    this.courseModel = sc.models.CourseModel.getInstance();
};
goog.inherits(sc.components.Search.ListController, tart.components.mobile.Controller);



sc.components.Search.ListController.prototype.viewClass = sc.components.Search.ListView;


sc.components.Search.ListController.prototype.bindEvents = function() {
    var that = this,
        domMappings = this.view.template.domMappings,
        outsideTapListener,
        input = this.view.get(domMappings.SEARCH_INPUT)[0],
        clear = this.view.get(domMappings.SEARCH_CLEAR)[0],
        listParent = this.view.get(domMappings.LIST)[0],
        form = this.view.get(domMappings.FORM)[0];


    var search = function(key) {
        /**
         * Pattern used to match given search token.
         *
         * @type {RegExp}
         */
        var pattern = sc.util.generateWordMatchingPattern(key);

        /**
         * Match properties against search token regexp.
         *
         * @param {Array.<string>} properties Property list.
         * @return {boolean} Event match predicate.
         */
        var match = function(properties) {
            return goog.array.some(properties, function(property) {
                property = property.replace(/İ/g, 'i');
                return !!property.match(pattern);
            });
        };

        /**
         * @param {Array.<Object>} items Items.
         * @return {Array.<Object>} Matched items.
         */
        var filter = function(items) {
            return goog.array.filter(items, function(item) {
                var teacher = item['informationList'].map(function(info) { return info['teacher']; });

                var props = [
                    item['title'],
                    item['id'],
                    item['name']
                ].concat(teacher);

                return match(props);
            });
        };

        return filter(that.courseModel.allCourses);
    };

    goog.events.listen(input, goog.events.EventType.KEYUP, function() {
        if (this.searchTimer)
            clearTimeout(this.searchTimer);

        if (input.value) {
            this.view.enableClearButton(true);
            if (input.value.length >= 2) {
                this.searchTimer = setTimeout(function() {
                    that.view.list(search(input.value));
                }, 10);
            }
        }
        else {
            that.view.list();
            this.view.enableClearButton(false);
        }
    }, false, this);

    goog.events.listen(clear, tart.events.EventType.TAP, function() {
        input.value = '';
        that.view.list();
        input.blur();
//        this.view.onSearchBlur();
        this.view.enableClearButton(false);
    }, false, this);

    goog.events.listen(input, tart.events.EventType.TAP, function() {
        input.focus();
        goog.events.listen(document.body, tart.events.EventType.TAP, function(e) {
            if (e.target != input) input.blur();
        });
    });

    goog.events.listen(listParent, tart.events.EventType.SWIPE_LEFT, function(e) {
        var element = e.target;
        do {
            var courseId = element.getAttribute('data-courseId');
            if (!courseId) continue;

            this.onCourseTap(element, courseId);
            break;
        } while ((element = element.parentElement) && element != this.getDOM());
    }, false, this);

    goog.events.listen(listParent, tart.events.EventType.SWIPE_RIGHT, function(e) {
        sc.router.redirectToRoute('schedule');
    }, false, this);

    goog.events.listen(input, goog.events.EventType.BLUR, function() {
        goog.events.unlistenByKey(outsideTapListener);
    });

    goog.events.listen(form, goog.events.EventType.SUBMIT, function(e) {
        e.preventDefault();
        input.blur();
    });
};


sc.components.Search.ListController.prototype.list = function() {
    sc.Registry.get('navigationBar').setConfig({
        title: 'Search Courses',
        backButtonText: '',
        backButtonAction: function() {
            sc.router.redirectToRoute('schedule');
        },
        type: 'Search',
        order: 1
    });
};


/**
 * Adds the tapped course to selected courses list if applicable.
 *
 * @param {HTMLElement} element Tapped element.
 * @param {string} courseId Course ID for the tapped element.
 */
sc.components.Search.ListController.prototype.onCourseTap = function(element, courseId) {
    var chosenCourse = this.courseModel.find(courseId);

    try {
        this.courseModel.add(chosenCourse);
        this.view.enableItemSelection(element, true);
    } catch(e) {
        if (e.message == 'Already in the list.') {
            this.courseModel.remove(chosenCourse);
            this.view.enableItemSelection(element, false);
        }
        else navigator.notification.alert(e.message, null, 'Scheduler');
    }
};
