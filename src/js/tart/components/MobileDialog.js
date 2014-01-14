goog.provide('tart.components.MobileDialog');
goog.require('goog.ui.Dialog');



/**
 * @extends {goog.ui.Dialog}
 * @constructor
 *
 * @param {string=} opt_class Optional class name for the root element. Default is modal-dialog.
 */
tart.components.MobileDialog = function(opt_class) {
    goog.base(this, opt_class);
};
goog.inherits(tart.components.MobileDialog, goog.ui.Dialog);


/**
 * @override
 */
tart.components.MobileDialog.prototype.enterDocument = function() {
    goog.base(this, 'enterDocument');
    this.setDraggable(false);

    this.getHandler().removeAll();

    goog.events.listen(this.getButtonElement(), tart.events.EventType.TAP,
        this.onButtonTap, false, this);

    // this is to prevent click event after tap.
    goog.events.listen(this.getButtonElement(), goog.events.EventType.TOUCHSTART, function(e) {
        e.preventDefault();
    });
};


/**
 * @param {goog.events.BrowserEvent} e Browser's event object.
 */
tart.components.MobileDialog.prototype.onButtonTap = function(e) {
    var button = this.findParentButton(/** @type {Element} */ (e.target));
    if (button && !button.disabled) {
        var key = button.name;
        var caption = /** @type {Element|string} */(
            this.getButtonSet().get(key));
        if (this.dispatchEvent(new goog.ui.Dialog.Event(key, caption))) {
            this.setVisible(false);
        }
    }
};


/**
 * Finds the parent button of an element (or null if there was no button
 * parent).
 * @param {Element} element The element that was clicked on.
 * @return {Element} Returns the parent button or null if not found.
 */
tart.components.MobileDialog.prototype.findParentButton = function(element) {
    var el = element;
    while (el != null && el != this.getButtonElement()) {
        if (el.tagName == 'BUTTON') {
            return /** @type {Element} */(el);
        }
        el = el.parentNode;
    }
    return null;
};


/**
 * @override
 */
tart.components.MobileDialog.prototype.focus = function() {
    return;
};


/**
 * @override
 */
tart.components.MobileDialog.prototype.reposition = function() {
    // Get the current viewport to obtain the scroll offset.
    var doc = this.getDomHelper().getDocument();
    var win = goog.dom.getWindow(doc) || window;
    var x = 0;
    var y = 0;
    if (goog.style.getComputedPosition(this.getElement()) != 'fixed') {
        var scroll = this.getDomHelper().getDocumentScroll();
        x = scroll.x;
        y = scroll.y;
    }

    var popupSize = goog.style.getSize(this.getElement());
    var applicationElement = goog.dom.getElement('app');
    var applicationWidth = goog.style.getSize(applicationElement).width;

    var left = (applicationWidth - popupSize.width) / 2;
    var top = win.innerHeight / 2;
    var marginTop = popupSize.height / -2 - 40;

    goog.style.setPosition(this.getElement(), left, top);
    goog.style.setStyle(/** @type {Element} */ (this.getElement()), 'margin-top', marginTop + 'px');
};
