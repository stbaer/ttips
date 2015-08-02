(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.Ttip = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
var ACTIVE_CLASS = 'ttip-active';
var DISTANCE_TO_ELEMENT = 10;

/**
 * Ttip
 *
 * @class
 * @constructor
 *
 * @param {Element} el
 * @param {object} options
 * @property {boolean} options.showOnClick
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
 * adds / removes the active class and event listener for scroll and touchmove
 * @param {boolean} [doAdd=false]
 */
Ttip.prototype.addRemoveClassAndEvents = function(doAdd) {
    var addOrRemove = doAdd ? 'add' : 'remove';

    this.element.classList[addOrRemove](ACTIVE_CLASS);
    window[addOrRemove + 'EventListener']('scroll', this.onMouseLeaveHandler);
    window[addOrRemove + 'EventListener']('touchmove', this.onMouseLeaveHandler);
};

/**
 * update the tooltip position
 * @param {Element} targetEl
 */
Ttip.prototype.updatePosition = function(targetEl) {

    var targetRect = targetEl.getBoundingClientRect();
    var ttipRect = this.element.getBoundingClientRect();
    var position = this.element.getAttribute('data-ttip-position');
    var ttipStyle = this.element.style;
    var left, marginLeft;

    if (position === 'left') {

        ttipStyle.left = targetRect.left - ttipRect.width - DISTANCE_TO_ELEMENT + 'px';
        ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px';

    } else if (position === 'right') {

        ttipStyle.left = targetRect.right + DISTANCE_TO_ELEMENT + 'px';
        ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px';

    } else if (position === 'top') {

        left = targetRect.left + (targetRect.width / 2);
        marginLeft = -1 * (this.element.offsetWidth / 2);

        ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px';
        ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px';
        ttipStyle.top = targetRect.top - ttipRect.height - DISTANCE_TO_ELEMENT + 'px';

    } else {

        // default - bottom

        left = targetRect.left + (targetRect.width / 2);
        marginLeft = -1 * (this.element.offsetWidth / 2);

        ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px';
        ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px';
        ttipStyle.top = targetRect.top + targetRect.height + DISTANCE_TO_ELEMENT + 'px';
    }
};

/**
 * @param {Event} ev
 */
Ttip.prototype.onMouseEnter = function(ev) {
    ev.stopPropagation();

    this.addRemoveClassAndEvents(true);
    this.updatePosition(ev.target);
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

},{}]},{},[1])(1)
});