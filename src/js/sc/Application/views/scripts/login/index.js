goog.provide('sc.views.scripts.login.index');
goog.require('sc.components.Login.Widget');


/**
 * @this {tart.mvc.View} view of search/index action.
 * @return {string} Output.
 */
sc.views.scripts.login.index = function() {
    var loginComponent = this.widget;

    this.onRender = function() {
        loginComponent.rendered || loginComponent.render();
    };

    this.deconstructor = function() {
        loginComponent.rendered = false;
    };

    return loginComponent.getPlaceholder();
};
