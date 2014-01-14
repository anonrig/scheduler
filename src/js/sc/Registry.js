goog.provide('sc.Registry');
goog.require('tart.Registry');


/**
 *
 * @param {string} key is index.
 * @param {Function=} ctor Function for route.
 */
sc.Registry.get = function(key, ctor) {
    sc.Registry.registry = sc.Registry.registry || new tart.Registry();

    var tempObj = sc.Registry.registry.get(key);
    if (tempObj) {
        return tempObj;
    }
    else if (/** @constructor */ctor) {
        tempObj = new ctor();
        sc.Registry.registry.set(key, tempObj);
        return tempObj;
    }
    return undefined;
};


/**
 * Set registry function.
 * @param {string} key is index..
 * @param {*} value is type of model.
 */
sc.Registry.set = function(key, value) {
    sc.Registry.registry = sc.Registry.registry || new tart.Registry();
    sc.Registry.registry.set(key, value);
};


/**
 *  Remove registry function.
 * @param {string} key is index.
 */
sc.Registry.remove = function(key) {
    sc.Registry.registry = sc.Registry.registry || new tart.Registry();
    sc.Registry.registry.remove(key);
};
