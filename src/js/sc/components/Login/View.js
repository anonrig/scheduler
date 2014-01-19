goog.provide('sc.components.Login.View');
goog.require('sc.components.Login.Template');
goog.require('tart.components.mobile.View');



/**
 * Main view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 *
 */
sc.components.Login.View = function() {
    goog.base(this);
};
goog.inherits(sc.components.Login.View, tart.components.mobile.View);


/** @type {function(new:sc.components.Login.Template)} */
sc.components.Login.View.prototype.templateClass = sc.components.Login.Template;


sc.components.Login.View.prototype.moveTo = function(itemIndex) {
    var itemsContainer = this.get(this.template.domMappings.ITEMS_CONTAINER)[0];

    var displacement = -itemIndex * this.viewWidth;
    itemsContainer.style.webkitTransform = 'translateX(' + displacement + 'px)';

    var pagerItems = this.get(this.template.domMappings.PAGER_ITEMS);

    goog.array.forEach(pagerItems, function(item, index) {
        goog.dom.classes.enable(item, 'selected', index == itemIndex);
    });
};
