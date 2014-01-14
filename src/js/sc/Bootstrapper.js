goog.provide('sc.Bootstrapper');
goog.require('sc.Application');
goog.require('sc.Registry');
goog.require('sc.components.NavigationBar');
goog.require('sc.util');
goog.require('goog.dom');
goog.require('tart.ui.ComponentManager');



/**
 * Bootstrapper class includes things to do on startup.
 * @constructor
 */
sc.Bootstrapper = function() {
    sc.disableEvents();
    sc.setSwipeWindow();
    sc.preventLayoutFlicker();
    sc.setViewClass();
    sc.Registry.get('eventManager', goog.events.EventTarget);
    var navigationBar = sc.Registry.get('navigationBar', sc.components.NavigationBar);

    sc.app = new sc.Application();
};


/**
 * Disable unnecessary event listeners for tart.ui.ComponentManager.
 */
sc.disableEvents = function() {
    tart.ui.ComponentManager.eventTypes = [
        goog.events.EventType.FOCUSIN,
        goog.events.EventType.FOCUSOUT,
        goog.events.EventType.TOUCHSTART,
        goog.events.EventType.TOUCHMOVE,
        goog.events.EventType.TOUCHEND,
        tart.events.EventType.TAP,
        tart.events.EventType.SWIPE_LEFT,
        tart.events.EventType.SWIPE_RIGHT,
        tart.events.EventType.SWIPE_UP,
        tart.events.EventType.SWIPE_DOWN
    ];

    tart.events.HoverHandler = function() {
        goog.base(this);
    }
    goog.inherits(tart.events.HoverHandler, goog.events.EventTarget);
};


sc.setSwipeWindow = function() {
    tart.events.GestureHandler.prototype.onTouchmove = function(e) {
        var touches = this.touches,
            browserEvent = e.getBrowserEvent(),
            changedTouch = browserEvent.changedTouches[0];

        if (Math.abs(changedTouch.pageX - touches[1]) > 10 ||
            Math.abs(changedTouch.pageY - touches[2]) > 10)
            this.canTap = false;

        if (this.canSwipe) {
            touches.push(browserEvent.timeStamp, changedTouch.pageX, changedTouch.pageY);
            if (+new Date() > touches[0] + 100) {
                this.canSwipe = false;
                return;
            }

            // Filter the touches
            var date = browserEvent.timeStamp;
            touches = goog.array.filter(touches, function(touch, index, arr) {
                var relatedTimeStamp = arr[index - (index % 3)];
                return relatedTimeStamp > date - 500;
            });


            if ((touches.length / 3) > 1) {
                var firstTouch = new goog.math.Coordinate(touches[1], touches[2]);
                var lastTouch = new goog.math.Coordinate(touches[touches.length - 2],
                    touches[touches.length - 1]);

                // calculate distance. must be min 60px
                var distance = goog.math.Coordinate.distance(firstTouch, lastTouch);
                if (distance < 30) return;

                // calculate angle.
                var angle = goog.math.angle(firstTouch.x, firstTouch.y, lastTouch.x, lastTouch.y);

                var eventType = tart.events.EventType.SWIPE_RIGHT;
                if (angle > 45 && angle < 135) {
                    eventType = tart.events.EventType.SWIPE_DOWN;
                }
                else if (angle > 135 && angle < 225) {
                    eventType = tart.events.EventType.SWIPE_LEFT;
                }
                else if (angle > 225 && angle < 315) {
                    eventType = tart.events.EventType.SWIPE_UP;
                }

                var swipe = document.createEvent("Event");
                swipe.initEvent(eventType, true, true);
                e.target.dispatchEvent(swipe);

                this.canSwipe = false;
            }
        }
    };
};


sc.preventLayoutFlicker = function() {
    tart.mvc.Layout.prototype.zIndex = 0;

    /**
     * Renders the layout.
     */
    tart.mvc.Layout.prototype.render = function(body) {
        var that = this;

        if (this.resetLayout == true) {
            body.innerHTML = this.markup;
            this.resetLayout = false;
            goog.typeOf(this.onRender) == 'function' && this.onRender();
        }
        else {
            var oldEl = this.getContentArea(body).children[0];
            var el = tart.dom.createElement(this.getContent());
            el.style.position = 'absolute';
            el.style.top = 0;
            el.style.left = 0;
            el.style.zIndex = ++this.zIndex;
            this.getContentArea(body).appendChild(el);
            setTimeout(function() {
                that.getContentArea(body).removeChild(oldEl);
            }, 20);
        }
    };
};

goog.exportSymbol('sc.Bootstrapper', sc.Bootstrapper);


sc.setViewClass = function() {
    var width = window.innerWidth;

    var style = document.createElement('style');
    style.type = 'text/css';
    style.innerText = '.view { width: ' + width + 'px; }';
    document.getElementsByTagName('head')[0].appendChild(style);
};

