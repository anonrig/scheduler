goog.provide('tart.components.NavigationBar');
goog.require('tart.ui.DlgComponent');



/**
 * @constructor
 * @extends {tart.ui.DlgComponent}
 */
tart.components.NavigationBar = function() {
    goog.base(this);
    this.initialized = false;
    this.sidebarIsOpen = false;

    this.config = {};
};
goog.inherits(tart.components.NavigationBar, tart.ui.DlgComponent);


/**
 * @override
 */
tart.components.NavigationBar.prototype.render = function(opt_base, opt_index) {
    goog.base(this, 'render', opt_base, opt_index);
    this.initialized = true;
    this.config.sidebarMenu && this.setSidebarMenu(this.config.sidebarMenu);
};


/**
 * @typedef {{actionButtonText, backButtonText, type, backButtonAction, order, actionButtonAction}}
 */
tart.components.NavigationBarOptions;


/**
 * Unset NavigationBar settings.
 */
tart.components.NavigationBar.prototype.unsetConfig = function() {
    this.setConfig({});
};


/**
 * Set NavigationBar component's config.
 *
 * @param {tart.components.NavigationBarOptions} config of NavigationBar component.
 */
tart.components.NavigationBar.prototype.setConfig = function(config) {
    this.reload(config);
    this.config = config;
};


/**
 * Reload NavigationBar config.
 *
 * @param {tart.components.NavigationBarOptions} config Configuration object that decides the look and animations of the navigation bar.
 */
tart.components.NavigationBar.prototype.reload = function(config) {
    if (config.sidebarMenu)
        this.setSidebarMenu(config.sidebarMenu);

    // the configuration hasn't changed.
    if (this.config.type == config.type &&
        this.config.title == config.title &&
        this.config.order == config.order)
        return;

    if (this.config.type && this.config.type == config.type) {
        if (this.config.order < config.order) {
            this.goForward(config);
        }
        else if (this.config.order > config.order) {
            this.goBack(config);
        }
        else {
            this.go(config);
        }
    }
    else {
        this.go(config);
    }
};


/**
 * @param {tart.components.SidebarMenu} menu Sets a navigation menu.
 */
tart.components.NavigationBar.prototype.setSidebarMenu = function(menu) {

};


/**
 * Redraws the navigation bar with the given configuration, without any animations.
 *
 * @param {tart.components.NavigationBarOptions} config Configuration object that decides the look and animations
 *                                                    of the navigation bar.
 */
tart.components.NavigationBar.prototype.go = function(config) {
    var itemsContainer = this.getChild(this.mappings.ITEMS_CONTAINER);
    itemsContainer && (itemsContainer[0].innerHTML = this.templates_item(config));
};


/**
 * Redraws the navigation bar with the given configuration, with a forward animation; the new navigation bar comes
 * in from the right.
 *
 * @param {tart.components.NavigationBarOptions} config Configuration object that decides the look and animations of the navigation bar.
 */
tart.components.NavigationBar.prototype.goForward = function(config) {
    var that = this;
    var itemsContainer = this.getChild(this.mappings.ITEMS_CONTAINER)[0];
    itemsContainer.innerHTML += this.templates_item(config);

    var items = this.getChild(this.mappings.ITEM);
    setTimeout(function() {
        that.arrangeClasses_(items, null, ['change', 'animate']);
    }, 1);

    this.bindTransitionEndEvent_(items, 0);
};


/**
 * Redraws the navigation bar with the given configuration, with a backward animation; the new navigation bar comes
 * in from the right.
 *
 * @param {tart.components.NavigationBarOptions} config Configuration object that decides the look and animations of the navigation bar.
 */
tart.components.NavigationBar.prototype.goBack = function(config) {
    var that = this;
    var itemsContainer = this.getChild(this.mappings.ITEMS_CONTAINER)[0];
    itemsContainer.innerHTML = this.templates_item(config) + itemsContainer.innerHTML;

    var items = this.getChild(this.mappings.ITEM);
    this.arrangeClasses_(items, null, 'change');

    setTimeout(function() {
        that.arrangeClasses_(items, 'change', 'animate');
    }, 1);

    this.bindTransitionEndEvent_(items, 1);
};


/**
 * Arranges CSS classes of given elements by removing and adding certain classes. Helper method to make code prettier.
 *
 * @private
 * @param {{length: number}} elements Elements array or NodeList as obtained from a goog.dom.query.
 * @param {string|Array.<string>} classesToRemove The CSS class names to be removed from each element.
 * @param {string|Array.<string>} classesToAdd The CSS class names to be added to each element.
 */
tart.components.NavigationBar.prototype.arrangeClasses_ = function(elements, classesToRemove, classesToAdd) {
    goog.array.forEach(elements, function(el) {
        goog.dom.classes.addRemove(el, classesToRemove, classesToAdd);
    });
};


/**
 * Binds transition end events and removes the old navigation bar. Helper method used in navigation bar animations.
 *
 * @private
 * @param {{length: number}} items Elements array or NodeList as obtained from a goog.dom.query. Contains the items
 *                                 that reside in items container; these are the actual navigation bars.
 * @param {number} index Index of the navigation bar to remove.
 */
tart.components.NavigationBar.prototype.bindTransitionEndEvent_ = function(items, index) {
    var blockerOverlay = goog.dom.query('[id=blockerOverlay]')[0];

    goog.dom.classes.add(blockerOverlay, 'active');
    goog.events.listenOnce(goog.dom.query('.title', items[index])[0], 'webkitTransitionEnd', function() {
        this.arrangeClasses_(items, ['change', 'animate']);
        goog.dom.classes.remove(blockerOverlay, 'active');
        goog.dom.removeNode(items[index]);
    }, false, this);
};


/**
 * @return {string} Base template of NavigationBar component.
 */
tart.components.NavigationBar.prototype.templates_base = function() {
    return '<div class="navigationBar" id="' + this.id + '">' +
        '<div class="itemsContainer">' +
        this.templates_item(this.config) +
                '</div>' +
           '</div>';
};


/**
 * Returns a navigation bar markup based on given configuration.
 *
 * @param {tart.components.NavigationBarOptions} config Configuration object that decides the look and animations of the navigation bar.
 * @return {string} A navigation bar markup.
 */
tart.components.NavigationBar.prototype.templates_item = function(config) {
    var menuButton = '',
        arrow = ' blank',
        title = config.title || '',
        actionButton = '',
        backButton = '',
        backButtonText = config.backButtonText || '&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;',
        actionButtonText = config.actionButtonText || '',
        notificationCenter = '';

    if (config.backButtonText) arrow = '';

    if (config.sidebarMenu) menuButton = '<span class="button menu">&nbsp;&nbsp;&nbsp;&nbsp;</span>';

    if (config.actionButtonAction) {
        actionButton = '<span class="button action active">' + actionButtonText + '</span>';
        notificationCenter = '';
    }

    if (config.backButtonAction) backButton = '<i class="icon-left button back' + arrow + '">' + backButtonText + '</i>';

    title = title.length > 25 ? title.substring(0, 25) + '...' : title;
    return '<div class="item">' +
        backButton +
        menuButton +
        '<span class="title">' + title + '</span>' +
        actionButton +
        notificationCenter +
        '</div>';
};


/**
 * Execute backButtonAction.
 */
tart.components.NavigationBar.prototype.onBackButtonTap = function() {
    this.config.backButtonAction();
};


/**
 * Action button tap event listener.
 */
tart.components.NavigationBar.prototype.onActionButtonTap = function() {
    this.config.actionButtonAction();
};


/**
 * Menu Button touch event handler.
 */
tart.components.NavigationBar.prototype.onMenuButtonTap = function() {
    this.toggleSidebar();
};


/**
 * Sidebar overlay touch event handler.
 */
tart.components.NavigationBar.prototype.onSidebarOverlayTap = function() {
    this.toggleSidebar();
};


/**
 * Sidebar toggler.
 */
tart.components.NavigationBar.prototype.toggleSidebar = function() {
    this.sidebarIsOpen = !this.sidebarIsOpen;
    this.dispatchEvent({
        type: tart.components.NavigationBar.EventTypes.TOGGLE_SIDEBAR
    });

    goog.dom.classes.toggle(this.getChild(this.mappings.MENU_BUTTON)[0], 'active');

    if (this.sidebarIsOpen) {
        this.sidebarOverlay = goog.dom.query(this.mappings.SIDEBAR_OVERLAY)[0];
        goog.events.listenOnce(this.sidebarOverlay, tart.events.EventType.TAP, this.onSidebarOverlayTap, false, this);
    }

    goog.dom.classes.toggle(this.sidebarOverlay, 'active');
};


/**
 * Opens the sidebar menu if there is one, and it's closed.
 */
tart.components.NavigationBar.prototype.openSidebar = function() {
    this.config.sidebarMenu && !this.sidebarIsOpen && this.toggleSidebar();
};


/**
 * Closes the sidebar menu if there is one, and it's open.
 */
tart.components.NavigationBar.prototype.closeSidebar = function() {
    this.config.sidebarMenu && this.sidebarIsOpen && this.toggleSidebar();
};


/**
 * Toggle action Button.
 * @param {boolean} toggle Action button display predicate.
 */
tart.components.NavigationBar.prototype.toggleActionButton = function(toggle) {
    var actionButton = this.getChild(this.mappings.ACTION_BUTTON)[0];
    if (!actionButton) return;

    goog.dom.classes.enable(actionButton, 'active', toggle);
};


/**
 * NavigationBar domMappings.
 * @enum {string}
 */
tart.components.NavigationBar.prototype.mappings = {
    TITLE: '.title',
    BACK_BUTTON: '.button.back',
    ACTION_BUTTON: '.button.action',
    MENU_BUTTON: '.button.menu',
    SIDEBAR_OVERLAY: '#sidebarOverlay',
    NOTIFICATION_CENTER: '.notificationCenter',
    NOTIFICATION_CENTER_BADGE: '.notificationCenter .countBadge',
    ITEMS_CONTAINER: '.itemsContainer',
    ITEM: '.item'
};


/**
 * @enum {string} Event types.
 */
tart.components.NavigationBar.EventTypes = {
    TOGGLE_SIDEBAR: 'toggleSidebar'
};


(function() {
    this.events = {};
    var tap = this.events[tart.events.EventType.TAP] = {};
    tap[this.mappings.BACK_BUTTON] = this.onBackButtonTap;
    tap[this.mappings.ACTION_BUTTON] = this.onActionButtonTap;
    tap[this.mappings.MENU_BUTTON] = this.onMenuButtonTap;
}).call(tart.components.NavigationBar.prototype);
