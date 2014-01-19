goog.provide('sc.components.Login.Controller');
goog.require('sc.components.Login.View');
goog.require('tart.components.mobile.Controller');
goog.require('tart.storage.Storage');

/**
 * Main controller.
 *
 * @constructor
 * @extends {tart.components.mobile.Controller}
 */
sc.components.Login.Controller = function() {
    this.localStorage = new tart.storage.Storage();
    goog.base(this);

    this.activeItem = 0;


};
goog.inherits(sc.components.Login.Controller, tart.components.mobile.Controller);


/** @type {function(new:sc.components.Login.View)} */
sc.components.Login.Controller.prototype.viewClass = sc.components.Login.View;


sc.components.Login.Controller.prototype.bindEvents = function() {
    var itemsContainer = this.view.get(this.view.template.domMappings.ITEMS_CONTAINER)[0];

    this.localStorage.set('seenCarousel', true);

    goog.events.listen(itemsContainer, tart.events.EventType.SWIPE_LEFT, function() {
        this.go(1);
    }, false, this);
    goog.events.listen(itemsContainer, tart.events.EventType.SWIPE_RIGHT, function() {
        this.go(-1);
    }, false, this);
};


sc.components.Login.Controller.prototype.go = function(amount) {
    this.activeItem += amount;
    this.activeItem = Math.min(3, Math.max(this.activeItem, 0));

    this.view.moveTo(this.activeItem);
};
