goog.provide('sc.Application');
goog.require('sc.controllers.SearchController');
goog.require('sc.views.layouts.common');
goog.require('tart.dom');
goog.require('tart.mvc');
goog.require('tart.mvc.MobileRenderer');
goog.require('tart.ui.DlgComponent');



/**
 * @constructor
 * @extends {tart.mvc.Application}
 */
sc.Application = function() {
    setTimeout(function() {
        sc.app.enableBridgeModeToIframe(false);
    }, 1000);


    this.defaultRoute = new tart.mvc.uri.Route({
        name: 'default',
        format: 'search',
        controller: sc.controllers.SearchController,
        action: sc.controllers.SearchController.indexAction
    });

    goog.base(this, /** @type {HTMLElement} */(goog.dom.getElement('app')));

    goog.events.listen(sc.Registry.get('eventManager'), sc.Application.EventType.REFRESH, this.onNavigate, false, this);
};
goog.inherits(sc.Application, tart.mvc.Application);


/**
 * @enum {string} Event type enum.
 */
sc.Application.EventType = {
    ON_NAVIGATE: 'onNavigate',
    REFRESH: 'refresh'
};


/**
 * @override
 */
sc.Application.prototype.onNavigate = function() {
    goog.base(this, 'onNavigate');
    sc.Registry.get('eventManager').dispatchEvent({
        type: sc.Application.EventType.ON_NAVIGATE,
        url: window.location
    });
};


/**
 * @return {tart.mvc.MobileRenderer} Renderer for the application.
 */
sc.Application.prototype.getRenderer = function() {
    if (!this.renderer_)
        this.renderer_ = new tart.mvc.MobileRenderer(this.defaultLayout, this.dom);

    return this.renderer_;
};


/**
 * @override
 */
sc.Application.prototype.basePath = (new goog.Uri(window.location).getPath());


/**
 * @override
 */
sc.Application.prototype.defaultLayout = sc.views.layouts.common;


/**
 * @override
 */
sc.Application.prototype.initRouting = function() {
    var router = this.getRouter();
    sc.router = router;

    router.addRoute(new tart.mvc.uri.Route({
        name: 'search',
        format: 'search',
        controller: sc.controllers.SearchController,
        action: sc.controllers.SearchController.indexAction
    }));

    router.addRoute(new tart.mvc.uri.Route({
        name: 'detail',
        format: 'detail/:id',
        controller: sc.controllers.SearchController,
        action: sc.controllers.SearchController.detailAction
    }));

    router.addRoute(new tart.mvc.uri.Route({
        name: 'schedule',
        format: 'schedule',
        controller: sc.controllers.SearchController,
        action: sc.controllers.SearchController.scheduleAction
    }));

    router.addRoute(new tart.mvc.uri.Route({
        name: 'search',
        format: 'search/:refresh',
        controller: sc.controllers.SearchController,
        action: sc.controllers.SearchController.indexAction
    }));

    router.addRoute(new tart.mvc.uri.Route({
        name: 'schedule',
        format: 'schedule/:refresh',
        controller: sc.controllers.SearchController,
        action: sc.controllers.SearchController.scheduleAction
    }));
};


/**
 * Sets cordova's bridge mode to iframe, if enable is true. It runs just on in iOS and Android app.
 * @param {boolean} enable Whether Cordova should be in bridge mode.
 */
sc.Application.prototype.enableBridgeModeToIframe = function(enable) {
    var exec = cordova.require('cordova/exec');
    var bridgeMode = exec.jsToNativeModes.XHR_NO_PAYLOAD;
    if (enable)
        bridgeMode = exec.jsToNativeModes.IFRAME_NAV;

    exec.setJsToNativeBridgeMode(bridgeMode);
};


/**
 * Exits application.
 */
sc.Application.prototype.exit = function() {
    navigator.app.exitApp();
};
