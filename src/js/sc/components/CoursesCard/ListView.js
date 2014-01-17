goog.provide('sc.components.CoursesCard.ListView');
goog.require('sc.components.CoursesCard.Template');
goog.require('goog.style');
goog.require('tart.components.mobile.View');



/**
 * List view.
 *
 * @constructor
 * @extends {tart.components.mobile.View}
 */
sc.components.CoursesCard.ListView = function() {
    goog.base(this);
};
goog.inherits(sc.components.CoursesCard.ListView, tart.components.mobile.View);


/** @type {function(new:sc.components.CoursesCard.Template)} */
sc.components.CoursesCard.ListView.prototype.templateClass = sc.components.CoursesCard.Template;


/** @override */
sc.components.CoursesCard.ListView.prototype.index = 0;


/**
 * @override
 */
sc.components.CoursesCard.ListView.prototype.render = function() {
    return this.template.listBase();
};


sc.components.CoursesCard.ListView.prototype.list = function(items) {
    var markup = '';

    if (items) {
        markup = items.map(this.template.item, this.template).join('');
    }

    this.get(this.template.domMappings.LIST)[0].innerHTML = markup;
    this.get(this.template.domMappings.COUNT)[0].innerHTML = items.length + ' courses';

    var el = goog.dom.query('.coursesCard')[0];
    el && goog.dom.classes.enable(el, 'tab', items.length);
};
