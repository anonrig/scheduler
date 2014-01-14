goog.require('tart.components.View');
goog.require('tart.components.mobile.Template');
goog.require('tart.dom');

goog.provide('tart.components.mobile.View');



/**
 * @param {tart.components.mobile.Template=} opt_template Template instance.
 * @extends {tart.components.View}
 * @constructor
 */
tart.components.mobile.View = function(opt_template) {
    goog.base(this);
    this.subviews = [];
    this.template = opt_template || new this.templateClass();
};
goog.inherits(tart.components.mobile.View, tart.components.View);


/**
 * Currently active view.
 */
tart.components.mobile.View.prototype.activeView;


/**
 * Width of a view that spans the entire screen. Reflects (or caches) window's innerWidth property.
 *
 * @type {number}
 */
tart.components.mobile.View.WIDTH = window.innerWidth;


/**
 * Currently active view's width.
 */
tart.components.mobile.View.prototype.viewWidth = tart.components.mobile.View.WIDTH;


/**
 * Currently active view's index.
 */
tart.components.mobile.View.prototype.index = 0;


/**
 * Active view transform animation's transition time.
 */
tart.components.mobile.View.prototype.transitionDuration = 800;


/**
 * Template class of mobile component.
 */
tart.components.mobile.View.prototype.templateClass;


/**
 * Activates current view.
 */
tart.components.mobile.View.prototype.activate = function() {
    goog.dom.classes.add(this.getDOM(), 'active');
};


/**
 * Deactivates current view.
 */
tart.components.mobile.View.prototype.deactivate = function() {
    var that = this;
    setTimeout(function() {
        goog.dom.classes.remove(that.getDOM(), 'active');
    }, this.transitionDuration);
};


/**
 * @override
 * @return {Element} Current DOM reference.
 */
tart.components.mobile.View.prototype.getDOM = function() {
    return /** @type {Element} */(goog.base(this, 'getDOM'));
};


/**
 * @param {tart.components.mobile.View} view sub-view.
 */
tart.components.mobile.View.prototype.setActiveView = function(view) {
    if (this.activeView == view) return;

    var animate = false;
    if (this.activeView) {
        this.activeView.deactivate();
        animate = true;
    }

    view.activate();
    this.activeView = view;
    this.goToActiveView(animate);
    this.fromClick = false;
};


/**
 * @param {Array.<tart.components.mobile.View>} subviews subviews array.
 */
tart.components.mobile.View.prototype.setSubViews = function(subviews) {
    this.subviews = [];
    goog.array.forEach(subviews, this.addSubView, this);
};


/**
 * @param {tart.components.mobile.View} subview Subview to add to the view.
 */
tart.components.mobile.View.prototype.addSubView = function(subview) {
    this.subviews.push(subview);

    if (!subview.getDOM())
        subview.setDOM(/** @type {Element} */(tart.dom.createElement(subview.render())));

    goog.dom.append(/** @type {!Node} */(this.getDOM()), /** @type {!Node} */(subview.getDOM()));
};


/**
 * @return {string} Returns base template.
 */
tart.components.mobile.View.prototype.render = function() {
    return this.template.base();
};


/**
 * @param {boolean} animate Ensures to show active view on screen.
 */
tart.components.mobile.View.prototype.goToActiveView = function(animate) {
    var that = this,
        dom = this.getDOM();

    goog.dom.classes.enable(dom, 'transition', animate);
    var viewIndex = this.activeView.index;
    setTimeout(function() {
        dom.style.webkitTransform = 'translateX(' + (- viewIndex * that.viewWidth) + 'px)';
    }, 1);
};


/**
 * Sets scroll top value to zero of current view's dom.
 */
tart.components.mobile.View.prototype.scrollToTop = function() {
    this.getDOM().scrollTop = 0;
};
