goog.require('tart.components.SidebarMenu');
goog.provide('sc.components.SidebarMenu');



/**
 * @constructor
 * @extends {tart.components.SidebarMenu}
 */
sc.components.SidebarMenu = function() {
    goog.base(this);
    this.bindEvents();
};
goog.inherits(sc.components.SidebarMenu, tart.components.SidebarMenu);


/**
 * Default coupon list url suffix. It will be used to reduce url hash and that part
 * that is left as a string is the coupon listing type. Coupon listing type and sidebar
 * menu class have the same name so that we can use this as a menu item indicator. By
 * getting the menu item indicator we can add class or manipulate dom to show to user
 * which menu item is selected.
 *
 * @type {RegExp}
 */
sc.components.SidebarMenu.prototype.urlHashRegexp = /#!\/(.*)/;


/**
 * Bind the events for sidebar menu.
 */
sc.components.SidebarMenu.prototype.bindEvents = function() {
    var that = this;
    goog.events.listen(sc.Registry.get('eventManager'), sc.Application.EventType.ON_NAVIGATE, function(e) {
        var matchedUrl = e.url.hash.match(that.urlHashRegexp);

        goog.array.forEach(goog.dom.query('.item.active', this.getElement()), function(item) {
            goog.dom.classes.remove(item, 'active');
        });

        if (matchedUrl) {
            for (var i = 1; i < matchedUrl.length; i++) {
                matchedUrl[i] = matchedUrl[i] && matchedUrl[i].replace(' ', '');
                goog.array.forEach(goog.dom.query('.item.' + matchedUrl[i], this.getElement()), function(item) {
                    goog.dom.classes.add(item, 'active');
                });
            }
        }
    }, false, this);
};
