goog.provide('sc.components.Search.Model');
goog.require('tart.components.mobile.Model');



/**
 * @extends {tart.components.mobile.Model}
 * @constructor
 */
sc.components.Search.Model = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.Model, tart.components.mobile.Model);
goog.addSingletonGetter(sc.components.Search.Model);
