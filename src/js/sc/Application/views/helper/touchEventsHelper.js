goog.provide('sc.views.helpers.touchEventsHelper');
goog.require('goog.dom.query');


/**
 * Handles several touch events such as href routing, form inputs and obd routing on swipe up.
 */
sc.views.helpers.touchEventsHelper = function() {
    sc.views.helpers.touchEventsHelper.bindTouchEvents();
    sc.views.helpers.touchEventsHelper.bindNavigationEvents();
    sc.views.helpers.touchEventsHelper.preventRubberBandEffect();
};


/**
 * Handle data-href attributes and forward them to actual url's.
 */
sc.views.helpers.touchEventsHelper.bindNavigationEvents = function() {
    goog.events.listen(document.body, tart.events.EventType.TAP, function(e) {
        var node = e.target;

        do {
            var href = node.getAttribute && node.getAttribute('data-href');
            if (href) {
                window.location = href;
                return;
            }
        } while (node = node.parentNode);
    }, false);
};


/**
 * Disable forms on blur. This prevents the user from navigating to undisplayed forms by tapping the "next" button.
 */
sc.views.helpers.touchEventsHelper.bindTouchEvents = function() {
    goog.events.listen(document.body, tart.events.EventType.TAP, function(e) {
        var node = e.target;

        if (node.tagName == 'input' || node.tagName == 'INPUT') {
            if (node.form) {
                goog.array.forEach(node.form.elements, function(element) {
                    if (node.tagName == 'input' || node.tagName == 'INPUT') {
                        goog.events.listen(element, goog.events.EventType.FOCUS, function(e) {
                            var allOtherInputs = goog.dom.query('input');
                            for (var i in allOtherInputs) {
                                if (allOtherInputs[i].form && allOtherInputs[i].form.name !== e.target.form.name)
                                    allOtherInputs[i].disabled = 'disabled';
                            }
                            goog.events.listenOnce(e.target, goog.events.EventType.BLUR, function(e) {
                                if (cfg.ENV == 'web') document.body.scrollIntoView();
                                var allOtherInputs = goog.dom.query('input');
                                for (var i in allOtherInputs) {
                                    if (allOtherInputs[i].form) {
                                        if (allOtherInputs[i].getAttribute('data-disabled') != 'disabled')
                                            allOtherInputs[i].removeAttribute('disabled');
                                    }
                                }
                            }, false);
                        });
                    }
                });
            }
        }
    }, false);
};


sc.views.helpers.touchEventsHelper.preventRubberBandEffect = function() {
    document.body.addEventListener('touchstart', function() {
        document.body.addEventListener('touchmove', function moveListener(e) {
            document.body.removeEventListener('touchmove', moveListener, true);

            var el = e.target;

            do {
                if (parseInt(window.getComputedStyle(el, null).height, 10) < el.scrollHeight)
                    return;
            } while (el != document.body && el.parentElement != document.body && (el = el.parentElement));

            e.preventDefault();
        }, true);
    }, true);
};
