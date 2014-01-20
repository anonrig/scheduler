goog.provide('sc.components.Search.ListView');
goog.require('sc.components.Search.Template');
goog.require('goog.style');
goog.require('tart.components.mobile.View');



/**
 * List view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 */
sc.components.Search.ListView = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.ListView, tart.components.mobile.View);


/** @type {function(new:sc.components.Search.Template)} */
sc.components.Search.ListView.prototype.templateClass = sc.components.Search.Template;


/** @override */
sc.components.Search.ListView.prototype.index = 1;


/**
 * @override
 */
sc.components.Search.ListView.prototype.render = function() {
    return this.template.listBase();
};


sc.components.Search.ListView.prototype.list = function(items) {
    var markup = this.template.empty();

    if (items)
        markup = items.length ? this.template.list(items) : this.template.noResults();

    this.get(this.template.domMappings.LIST)[0].innerHTML = markup;
};


/**
 * Shows or hides the clear button.
 * @param {boolean} showButton Clear Button will be shown if its true.
 */
sc.components.Search.ListView.prototype.enableClearButton = function(showButton) {
    var clearButton = this.get(this.template.domMappings.SEARCH_CLEAR)[0];
    goog.style.showElement(clearButton, showButton);
};


sc.components.Search.ListView.prototype.enableItemSelection = function(element, selected) {
    element.style.webkitAnimation = 'selection .5s ease-out';

    goog.dom.classes.enable(element, 'selected', selected);

    element.addEventListener('webkitAnimationEnd', function(){
        element.style.webkitAnimation = '';
    }, false);
};
