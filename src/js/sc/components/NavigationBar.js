goog.require('tart.components.NavigationBar');
goog.provide('sc.components.NavigationBar');



/**
 * @constructor
 * @extends {tart.components.NavigationBar}
 */
sc.components.NavigationBar = function() {
    goog.base(this);
};
goog.inherits(sc.components.NavigationBar, tart.components.NavigationBar);


/**
 * @override
 */
sc.components.NavigationBar.prototype.setSidebarMenu = function(menu) {
    if (this.initialized) {
        if (this.sidebarMenu && this.sidebarMenu == menu) return;

        this.sidebarMenu = menu;
        //        tm.views.helpers.viewHelper.setSidebarMenu(menu);
    }
};


/**
 * @override
 */
sc.components.NavigationBar.prototype.setConfig = function(config) {
    var that = this;

    //    if (config.order > 0)
    //        document.removeEventListener("backbutton", tm.views.helpers.viewHelper.exitApplication, false);
    //    else
    //        document.addEventListener("backbutton", tm.views.helpers.viewHelper.exitApplication, false);

    goog.base(this, 'setConfig', config);
};


/**
 * @override
 */
sc.components.NavigationBar.prototype.bindModelEvents = function() {
    goog.base(this, 'bindModelEvents');
    goog.events.listen(sc.Registry.get('eventManager'), sc.Application.EventType.ON_NAVIGATE, function() {
        this.sidebarIsOpen && this.toggleSidebar();
    }, false, this);
};


(function() {
    this.events = {};
    var tap = this.events[tart.events.EventType.TAP] = {};
    tap[this.mappings.BACK_BUTTON] = this.onBackButtonTap;
    tap[this.mappings.ACTION_BUTTON] = this.onActionButtonTap;
    tap[this.mappings.MENU_BUTTON] = this.onMenuButtonTap;
    //    tap[this.mappings.NOTIFICATION_CENTER] = this.onNotificationCenterTap;
}).call(sc.components.NavigationBar.prototype);

