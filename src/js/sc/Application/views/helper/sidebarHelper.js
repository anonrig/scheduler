goog.provide('sc.views.helpers.sidebarHelper');


/**
 * Helps with sidebar visibility. Binds touch events to toggle the sidebar.
 */
sc.views.helpers.sidebarHelper = function() {
    goog.events.listen(goog.dom.query('menu')[0], tart.events.EventType.TAP, function(e) {
        if (e.target.getAttribute('data-href'))
            sc.views.helpers.sidebarHelper.openSidebar(false);
    });

    goog.events.listen(goog.dom.query('#menuHandle')[0], tart.events.EventType.TAP, function() {
        sc.views.helpers.sidebarHelper.toggleSidebar();
    });
};


sc.views.helpers.sidebarHelper.handleState = false;


/**
 * Sidebar toggle helper.
 */
sc.views.helpers.sidebarHelper.toggleSidebar = function() {
    var applicationElement = goog.dom.query('#app')[0];
    var bgElement = goog.dom.query('#bg')[0];
    var sidebarElement = goog.dom.query('menu')[0];


    applicationElement.classList.toggle('sidebarOn');
    bgElement.classList.toggle('sidebarOn');
    sidebarElement.classList.toggle('sidebarOn');
};


/**
 * Sidebar open / close helper.
 */
sc.views.helpers.sidebarHelper.openSidebar = function(turnOn) {
    var applicationElement = goog.dom.query('#app')[0];
    var bgElement = goog.dom.query('#bg')[0];
    var sidebarElement = goog.dom.query('menu')[0];

    goog.dom.classes.enable(applicationElement, 'sidebarOn', turnOn);
    goog.dom.classes.enable(sidebarElement, 'sidebarOn', turnOn);
    goog.dom.classes.enable(bgElement, 'sidebarOn', turnOn);
};


/**
 *
 * @param {boolean=} show
 */
sc.views.helpers.sidebarHelper.showHandle = function(show) {
    var that = sc.views.helpers.sidebarHelper;

//    that.swipeLeftHandler && goog.events.unlistenByKey(that.swipeLeftHandler);
//    that.swipeRightHandler && goog.events.unlistenByKey(that.swipeRightHandler);
    if (show !== undefined)
        sc.views.helpers.sidebarHelper.handleState = show;
//
    if (show == true) {
//        that.swipeLeftHandler = goog.events.listen(document.body, tart.events.EventType.SWIPE_LEFT, function() {
//            sc.views.helpers.sidebarHelper.openSidebar(true);
//        }, false);
//
        that.swipeRightHandler = goog.events.listen(document.body, tart.events.EventType.SWIPE_RIGHT, function() {
            sc.views.helpers.sidebarHelper.openSidebar(false);
        }, false);
    }

    var handle = goog.dom.query('#menuHandle')[0];
    handle && goog.dom.classes.enable(handle, 'on', sc.views.helpers.sidebarHelper.handleState);
};
