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
 * @param {Event} event
 * @private
 */
Ttip.prototype.onMouseEnter = function(event) {

  event.stopPropagation();
  var props = event.target.getBoundingClientRect();
  var left = props.left + (props.width / 2);
  var marginLeft = -1 * (this.element.offsetWidth / 2);

  if (left + marginLeft < 0) {
    this.element.style.left = 0;
    this.element.style.marginLeft = 0;
  } else {
    this.element.style.left = left + 'px';
    this.element.style.marginLeft = marginLeft + 'px'; 
  }

  this.element.style.top = props.top + props.height + 10 + 'px';
  this.element.classList.add(ACTIVE_CLASS);
  window.addEventListener('scroll', this.onMouseLeaveHandler, false);
  window.addEventListener('touchmove', this.onMouseLeaveHandler, false);
};

/**
 * Handle mouseleave
 * @param {Event} event
 * @private
 */
Ttip.prototype.onMouseLeave = function(event) {

  event.stopPropagation();
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
