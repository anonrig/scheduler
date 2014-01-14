goog.provide('sc.views.scripts.search.index');
goog.require('sc.components.Search.Widget');


/**
 * @this {tart.mvc.View} view of search/index action.
 * @return {string} Output.
 */
sc.views.scripts.search.index = function() {
    var searchComponent = this.widget;

    this.onRender = function() {
        searchComponent.rendered || searchComponent.render();
    };

    this.deconstructor = function() {
        searchComponent.rendered = false;
    };

    return searchComponent.getPlaceholder();
};
