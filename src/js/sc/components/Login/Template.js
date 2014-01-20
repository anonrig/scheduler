goog.provide('sc.components.Login.Template');
goog.require('tart.components.mobile.Template');



/**
 * Login widget template class.
 *
 * @constructor
 * @extends {tart.components.mobile.Template}
 */
sc.components.Login.Template = function() {
    goog.base(this);

    this.domMappings = {
        ITEMS_CONTAINER: '.items',
        PAGER_ITEMS: '.pager span'
    };
};
goog.inherits(sc.components.Login.Template, tart.components.mobile.Template);


sc.components.Login.Template.prototype.base = function(items) {
    return '<div class="loginCarousel">' +
            '<div class="items">' +
                '<div class="item view"><img src="img/search.png" height="60%"/>' +
                    '<div class="itemTitle">Search through courses</div>' +
                    '<div class="itemInfo">Nerede ne çalıyor, hangi müzik senin moduna uyuyor?</div>' +
                '</div>' +
                '<div class="item view"><img src="img/search2.png" height="60%"/>' +
                    '<div class="itemTitle">Advance Search</div>' +
                    '<div class="itemInfo">İstediğin yerde, istediğin şarkıları dinle, müziğe yön ver!</div>' +
                '</div>' +
                '<div class="item view"><img src="img/detailpage.png" height="60%"/>' +
                    '<div class="itemTitle">View detailed descriptions.</div>' +
                    '<div class="itemInfo">İstediğin şarkıları tüm dünyayla paylaş!</div>' +
                '</div>' +
                '<div class="item view"><img src="img/coursecard.png" height="60%"/>' +
                '<div class="itemTitle">Add each course to your card.</div>' +
                '<div class="itemInfo">İstediğin şarkıları tüm dünyayla paylaş!</div>' +
                '</div>' +
                '<div class="item view"><img src="img/schedule.png" height="60%"/>' +
                '<div class="itemTitle">Create your own schedule.</div>' +
                '<div class="itemInfo">İstediğin şarkıları tüm dünyayla paylaş!</div>' +
                '</div>' +
            '</div>' +
            '<div class="pager">' +
                '<span class="selected"></span>' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
            '</div>' +
        '</div>';
};
