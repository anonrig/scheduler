goog.provide('sc.views.layouts.common');
goog.require('sc.views.helpers.sidebarHelper');
goog.require('sc.views.helpers.touchEventsHelper');


/**
 * @this {tart.mvc.Layout}
 */
sc.views.layouts.common = function() {
    var navigationBar = sc.Registry.get('navigationBar');

    this.onRender = function() {
        goog.dom.classes.remove(document.body, 'loading');
        navigator.splashscreen && navigator.splashscreen.hide();

        sc.views.helpers.touchEventsHelper();
        sc.views.helpers.sidebarHelper();
        navigationBar.render(goog.dom.query('.root.header')[0]);
        sc.views.helpers.sidebarHelper.showHandle(true);
    };

    this.markup = '<div id="common">' +
                      '<div id="menuHandle"><i class="icon-menu button"></i></div>' +
                      '<div class="header root"></div>' +
                      '<div id="content">' +
                          this.getContent() +
                      '</div>' +
                  '</div>';
};
