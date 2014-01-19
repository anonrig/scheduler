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
                '<div class="item view"><img class="logo" src="img/logo.png" height="169.5" /></div>' +
                '<div class="item view"><img src="img/slide1.png" height="260"/>' +
                    '<div class="itemTitle">Geceyi Keşfet.</div>' +
                    '<div class="itemInfo">Nerede ne çalıyor, hangi müzik senin moduna uyuyor?</div>' +
                '</div>' +
                '<div class="item view"><img src="img/slide2.png" height="254.5"/>' +
                    '<div class="itemTitle">Müziğe Hükmet.</div>' +
                    '<div class="itemInfo">İstediğin yerde, istediğin şarkıları dinle, müziğe yön ver!</div>' +
                '</div>' +
                '<div class="item view"><img src="img/slide3.png" height="260.5"/>' +
                    '<div class="itemTitle">Sahne Işıkları üzerinde.</div>' +
                    '<div class="itemInfo">İstediğin şarkıları tüm dünyayla paylaş!</div>' +
                '</div>' +
            '</div>' +
            '<div class="pager">' +
                '<span class="selected"></span>' +
                '<span></span>' +
                '<span></span>' +
                '<span></span>' +
            '</div>' +
        '</div>';
};
