goog.provide('sc.components.Search.DetailView');
goog.require('sc.components.Search.Template');
goog.require('goog.style');
goog.require('tart.components.mobile.View');



/**
 * List view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 */
sc.components.Search.DetailView = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.DetailView, tart.components.mobile.View);


/** @type {function(new:sc.components.Search.Template)} */
sc.components.Search.DetailView.prototype.templateClass = sc.components.Search.Template;


/** @override */
sc.components.Search.DetailView.prototype.index = 1;


/**
 * @override
 */
sc.components.Search.DetailView.prototype.render = function() {
    return this.template.detailBase();
};


sc.components.Search.DetailView.prototype.detail = function(item) {
    var markup = '';

    this.getDOM().innerHTML = this.template.detail(item);
};
