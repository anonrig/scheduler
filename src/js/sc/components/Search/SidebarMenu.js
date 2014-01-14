goog.provide('sc.components.Search.SidebarMenu');
goog.require('sc.components.SidebarMenu');



/**
 * @constructor
 * @extends {sc.components.SidebarMenu}
 */
sc.components.Search.SidebarMenu = function() {
    goog.base(this);
};
goog.inherits(sc.components.Search.SidebarMenu, sc.components.SidebarMenu);
goog.addSingletonGetter(sc.components.Search.SidebarMenu);


/** @override */
sc.components.Search.SidebarMenu.prototype.urlHashRegexp = /#!\/draw\/list\/([A-Za-z0-9_ ]+)/;


/**
 * @enum {string}
 */
sc.components.Search.SidebarMenu.prototype.domMappings = {
    FOOTBALL_COUNT: '.football .count',
    BASKETBALL_COUNT: '.basketball .count',
    HANDBALL_COUNT: '.handball .count',
    VOLLEYBALL_COUNT: '.volleyball .count',
    MOTORSPORTS_COUNT: '.motorsports .count',
    TENNIS_COUNT: '.tennis .count',
    ATHLETICS_COUNT: '.athletics .count',
    BILLIARD_COUNT: '.billiard .count',
    BOKS_COUNT: '.boks .count',
    SPECIAL_COUNT: '.special .count'
};


/**
 * @override
 */
sc.components.Search.SidebarMenu.prototype.render = function(opt_base, opt_index) {
    goog.base(this, 'render', opt_base, opt_index);
    this.updateEventCounts();
};


/**
 * Updates all the event counts.
 */
sc.components.Search.SidebarMenu.prototype.updateEventCounts = function() {
    var domMappings = this.domMappings;
};


/** @override */
sc.components.Search.SidebarMenu.prototype.templates_items = function() {
    return '<span class="item">menu</span>' +
           '<div class="subItems">' +
               '<span class="item active" data-href="#!/draw/list/football"><span></span>Cagri Merkezleri</span>' +
               '<span class="item" data-href="#!/draw/list/basketball"><span></span>Numaralar</span>' +
               '<span class="item" data-href="#!/draw/list/handball"><span></span>Hakkimizda</span>' +
               '<span class="item" data-href="#!/draw/list/volleyball"><span></span>Oneri Kutusu</span>' +
           '</div>';
};
