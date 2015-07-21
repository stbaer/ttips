var ACTIVE_CLASS = 'ttip-active';

/**
 * Ttip
 *
 * @class
 * @constructor
 *
 * @param {HTMLElement} el
 * @param {object} el
 */
function Ttip(el, options) {

    options = options || {};
    
    this.element = el;
    this.showOnClick = options.showOnClick || false;

    this.targetEl = this.element.previousElementSibling;

    this.onMouseEnterHandler = this.onMouseEnter.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeave.bind(this);

    if (this.showOnClick) {
        this.targetEl.addEventListener('click', this.onMouseEnterHandler);
    }
    this.targetEl.addEventListener('mouseenter', this.onMouseEnterHandler);
    this.targetEl.addEventListener('mouseleave', this.onMouseLeaveHandler);
}

/**
 * adds / removes the acive class and event listener for scroll and touchmove
 * @param {boolean} [doAdd=false]
 */
Ttip.prototype.addRemoveClassAndEvents = function(doAdd) {
    var addOrRemove = doAdd ? 'add' : 'remove';

    this.element.classList[addOrRemove](ACTIVE_CLASS);
    window[addOrRemove + 'EventListener']('scroll', this.onMouseLeaveHandler);
    window[addOrRemove + 'EventListener']('touchmove', this.onMouseLeaveHandler);
};

/**
 * @param {Event} ev
 */
Ttip.prototype.onMouseEnter = function(ev) {

    ev.stopPropagation();
    var props = ev.target.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var marginLeft = -1 * (this.element.offsetWidth / 2);

    this.element.style.left = left + marginLeft < 0 ? 0 : left + 'px';
    this.element.style.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px';
    this.element.style.top = props.top + props.height + 10 + 'px';

    this.addRemoveClassAndEvents(true);

};

/**
 * @param {Event} ev
 */
Ttip.prototype.onMouseLeave = function(ev) {
    ev.stopPropagation();
    this.addRemoveClassAndEvents();
};

/*
 * Destroy
 */
Ttip.prototype.destroy = function() {
    if (this.element.classList.contains(ACTIVE_CLASS)) {
        this.onMouseLeaveHandler();
    }
    if (this.showOnClick) {
        this.targetEl.removeEventListener('click', this.onMouseEnterHandler);
    }
    this.targetEl.removeEventListener('mouseenter', this.onMouseEnterHandler);
    this.targetEl.removeEventListener('mouseleave', this.onMouseLeaveHandler);
};

module.exports = Ttip;
