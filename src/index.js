var ACTIVE_CLASS = 'ttip-active';

/**
 * @class
 * @constructor
 * @param {HTMLElement} el
 */
function Ttip(el) {

    this.element = el;
    this.targetElement = this.element.parentNode;

    this.onMouseEnterHandler = this.onMouseEnter.bind(this);
    this.onMouseLeaveHandler = this.onMouseLeave.bind(this);
    this.targetElement.addEventListener('mouseenter', this.onMouseEnterHandler, false);
    this.targetElement.addEventListener('click', this.onMouseEnterHandler, false);
    this.targetElement.addEventListener('mouseleave', this.onMouseLeaveHandler);
}

/**
 * @param {Event} ev
 * @private
 */
Ttip.prototype.onMouseEnter = function(ev) {

    ev.stopPropagation();
    var props = ev.target.getBoundingClientRect();
    var left = props.left + (props.width / 2);
    var marginLeft = -1 * (this.element.offsetWidth / 2);

    this.element.style.left = left + marginLeft < 0 ? 0 : left + 'px';
    this.element.style.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px';
    this.element.style.top = props.top + props.height + 10 + 'px';

    this.element.classList.add(ACTIVE_CLASS);

    window.addEventListener('scroll', this.onMouseLeaveHandler, false);
    window.addEventListener('touchmove', this.onMouseLeaveHandler, false);
};

/**
 * Handle mouseleave
 * @param {Event} ev
 * @private
 */
Ttip.prototype.onMouseLeave = function(ev) {

    ev.stopPropagation();
    this.element.classList.remove(ACTIVE_CLASS);
    window.removeEventListener('scroll', this.onMouseLeaveHandler);
    window.removeEventListener('touchmove', this.onMouseLeaveHandler, false);
};

/*
 * Destroy
 */
Ttip.prototype.destroy = function() {
    this.targetElement.removeEventListener('mouseenter', this.onMouseEnterHandler, false);
    this.targetElement.removeEventListener('click', this.onMouseEnterHandler, false);
    this.targetElement.removeEventListener('mouseleave', this.onMouseLeaveHandler);
};

module.exports = Ttip;
