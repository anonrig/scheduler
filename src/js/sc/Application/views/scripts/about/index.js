goog.provide('sc.views.scripts.about.index');


/**
 * @this {tart.mvc.View} view of about/index action.
 * @return {string} Output.
 */
sc.views.scripts.about.index = function() {
    return '<div class="container">' +
        '<div class="detail view active">' +
        '<h1>The Team</h1>' +
        '<h2>Armagan Amcalar</h2>' +
        '<h2>Yagiz Nizipli</h2>' +
        '<h2>Mert Tacir</h2>' +
        '<h1>Contact Us</h1>' +
        '<h3>Via http://schedul.re</h3>'
        '</div>' +
        '</div>';
};
