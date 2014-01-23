goog.provide('sc.components.Login.Template');
goog.require('tart.components.mobile.Template');



/**
 * Login widget template class.
 *
 * @constructor
 * @extends {tart.components.mobile.Template}
 */
sc.components.Login.Template = function() {
    goog.base(this);

    this.domMappings = {
        ITEMS_CONTAINER: '.items',
        PAGER_ITEMS: '.pager span'
    };
};
goog.inherits(sc.components.Login.Template, tart.components.mobile.Template);


sc.components.Login.Template.prototype.base = function(items) {
    return '<div class="loginCarousel">' +
            '<div class="items">' +
                '<div class="item view"><img src="img/search.png" height="60%"/>' +
                    '<div class="itemTitle">Search for courses</div>' +
                    '<div class="itemInfo">Sift through all available courses by their ID or other information.</div>' +
                '</div>' +
                '<div class="item view"><img src="img/search2.png" height="60%"/>' +
                    '<div class="itemTitle">Select Courses To Keep In Schedule</div>' +
                    '<div class="itemInfo">Swipe left on any course to add it to your schedule. Scheduler will notify you if there\'s a collision.</div>' +
                '</div>' +
                '<div class="item view"><img src="img/detailpage.png" height="60%"/>' +
                    '<div class="itemTitle">Detailed Course Information</div>' +
                    '<div class="itemInfo">Tap on any course to see useful information such as lecture details, summary and admission levels.</div>' +
                '</div>' +
                '<div class="item view"><img src="img/coursecard.png" height="60%"/>' +
                '<div class="itemTitle">A Shortcut For All of Your Courses</div>' +
                '<div class="itemInfo">The courses you add to your schedule will be available in the Courses Card. Just tap it.</div>' +
                '</div>' +
                '<div class="item view"><img src="img/schedule.png" height="60%"/>' +
                '<div class="itemTitle">The Whole Week</div>' +
                '<div class="itemInfo">Swipe right on search to see your schedule at a glance, along with all your empty slots.</div>' +
                '</div>' +
            '</div>' +
            '<div class="pager">' +
                '<span class="selected"></span>' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
            '</div>' +
        '</div>';
};
