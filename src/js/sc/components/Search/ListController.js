goog.provide('sc.components.Search.ListController');
goog.require('sc.components.Search.ListView');
goog.require('sc.components.Search.Model');
goog.require('sc.components.Search.SidebarMenu');
goog.require('tart.components.mobile.Controller');



/**
 * List controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.Search.ListController = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.ListController, tart.components.mobile.Controller);



sc.components.Search.ListController.prototype.viewClass = sc.components.Search.ListView;


sc.components.Search.ListController.prototype.bindEvents = function() {
    var that = this,
        domMappings = this.view.template.domMappings,
        outsideTapListener,
        input = this.view.get(domMappings.SEARCH_INPUT)[0],
        clear = this.view.get(domMappings.SEARCH_CLEAR)[0];

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
                    item['courseID'],
                    item['name']
                ].concat(teacher);

                return match(props);
            });
        };

        return filter(db);
    };

    goog.events.listen(input, goog.events.EventType.KEYUP, function() {
        if (this.searchTimer)
            clearTimeout(this.searchTimer);

        if (input.value) {
            this.searchTimer = setTimeout(function() {
                that.view.list(search(input.value));
            }, 10);
            this.view.enableClearButton(true);
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

    goog.events.listen(input, goog.events.EventType.BLUR, function() {
        goog.events.unlistenByKey(outsideTapListener);
    });
};


sc.components.Search.ListController.prototype.list = function() {
    sc.Registry.get('navigationBar').setConfig({
        title: 'Search Courses',
        type: 'Search',
        order: 0
    });
};
