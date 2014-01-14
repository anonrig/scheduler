goog.require('tart.components.Controller');
goog.require('tart.components.mobile.Model');
goog.require('tart.components.mobile.View');

goog.provide('tart.components.mobile.Controller');



/**
 * @extends {tart.components.Controller}
 * @constructor
 */
tart.components.mobile.Controller = function() {
    goog.base(this);
    this.model = new this.modelClass();
    this.view = new this.viewClass();
    this.buildDOM();
    this.bindEvents();
};
goog.inherits(tart.components.mobile.Controller, tart.components.Controller);


/**
 * Build DOM from view
 *
 * @return {Object} generated DOM of attached View object.
 */
tart.components.mobile.Controller.prototype.buildDOM = function() {
    var dom = /** @type {Element} */(tart.dom.createElement(this.view.render()));
    this.view.setDOM(dom);
    return dom;
};


/**
 * @type {function(new: tart.components.mobile.View)} Login view class
 */
tart.components.mobile.Controller.prototype.viewClass = tart.components.mobile.View;


/**
 * Model class of mobile component.
 * @type {function(new: tart.components.mobile.Model)}
 */
tart.components.mobile.Controller.prototype.modelClass = tart.components.mobile.Model;


/**
 * Defines event handlers.
 */
tart.components.mobile.Controller.prototype.bindEvents = function() {

};
