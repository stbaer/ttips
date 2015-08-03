var domInserted = require('dom-inserted');

/**
 * @module ttips
 */

var SELECTOR_CLASS = 'ttip';
var HOST_SELECTOR_CLASS = 'ttip-host';
var ACTIVE_CLASS = 'ttip-active';
var DISTANCE_TO_ELEMENT = 10;

/**
 * @param  {Element} ttipEl
 */
function cloneToHost(ttipEl) {
    removeHostChilds();
    getHostEl().appendChild(ttipEl.cloneNode(true));
}

/**
 */
function removeHostChilds() {
    var hostEl = getHostEl();
    while (hostEl.firstChild) {
        hostEl.removeChild(hostEl.firstChild);
    }
}

/**
 * update the tooltip position
 * @param {Element} targetEl
 */
function updatePosition(targetEl) {

    var ttipHostEl = getHostEl();
    var ttipEl = targetEl.nextElementSibling;

    var targetRect = targetEl.getBoundingClientRect();
    var ttipRect = ttipHostEl.getBoundingClientRect();
    var position = ttipEl.getAttribute('data-ttip-position');
    var ttipStyle = ttipHostEl.style;

    var left, marginLeft;

    if (position === 'left') {

        ttipStyle.left = targetRect.left - ttipRect.width - DISTANCE_TO_ELEMENT + 'px';
        ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px';
        ttipStyle.marginLeft = 0;

    } else if (position === 'right') {

        ttipStyle.left = targetRect.right + DISTANCE_TO_ELEMENT + 'px';
        ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px';
        ttipStyle.marginLeft = 0;

    } else if (position === 'top') {

        left = targetRect.left + (targetRect.width / 2);
        marginLeft = -1 * (ttipHostEl.offsetWidth / 2);

        ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px';
        ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px';
        ttipStyle.top = targetRect.top - ttipRect.height - DISTANCE_TO_ELEMENT + 'px';

    } else {

        // default - bottom
        left = targetRect.left + (targetRect.width / 2);
        marginLeft = -1 * (ttipHostEl.offsetWidth / 2);

        ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px';
        ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px';
        ttipStyle.top = targetRect.top + targetRect.height + DISTANCE_TO_ELEMENT + 'px';
    }
}

function getTtipElFromEvent(ev) {
    var ttipEl;
    if (ev.target.nextElementSibling && ev.target.nextElementSibling.classList.contains('ttip')) {
        ttipEl = ev.target.nextElementSibling;
    } else if (ev.currentTarget.nextElementSibling && ev.currentTarget.nextElementSibling.classList.contains('ttip')) {
        ttipEl = ev.currentTarget.nextElementSibling;
    }
    return ttipEl;
}

/**
 * @param {Event} ev
 */
function onMouseEnter(ev) {
    ev.stopPropagation();

    var ttipEl = getTtipElFromEvent(ev);

    if (!ttipEl) {
        return;
    }

    cloneToHost(ttipEl);
    updatePosition(ttipEl.previousElementSibling);
    getHostEl().classList.add(ACTIVE_CLASS);

    window.addEventListener('scroll', onMouseLeave);
    window.addEventListener('touchmove', onMouseLeave);
}

/**
 * @param {Event} [ev]
 */
function onMouseLeave(ev) {
    if (ev) {
        ev.stopPropagation();
    }
    getHostEl().classList.remove(ACTIVE_CLASS);

    window.removeEventListener('scroll', onMouseLeave);
    window.removeEventListener('touchmove', onMouseLeave);
}

/**
 * Initialize toggle element.
 * @param {Element} ttipEl - The toggle element.
 */
function init(ttipEl) {
    var targetEl;
    if (!ttipEl._ttip) {
        ttipEl._ttip = true;
        targetEl = ttipEl.previousElementSibling;

        targetEl.addEventListener('click', onMouseEnter);
        targetEl.addEventListener('mouseenter', onMouseEnter);
        targetEl.addEventListener('touchstart', onMouseEnter);

        targetEl.addEventListener('mouseleave', onMouseLeave);
        targetEl.addEventListener('blur', onMouseLeave);
    }
}

/**
 * @param {Element} ttipEl
 */
function destroy(ttipEl) {
    var targetEl;
    if (ttipEl._ttip === true) {
        targetEl = ttipEl.previousElementSibling;
        if (ttipEl.classList.contains(ACTIVE_CLASS)) {
            getHostEl.classList.remove(ACTIVE_CLASS);
        }
        targetEl.removeEventListener('click', onMouseEnter);
        targetEl.removeEventListener('mouseenter', onMouseEnter);
        targetEl.removeEventListener('touchstart', onMouseEnter);

        targetEl.removeEventListener('mouseleave', onMouseLeave);
        targetEl.removeEventListener('blur', onMouseLeave);
        ttipEl._ttip = null;
    }
}

/**
 * returns the tooltip elements
 * @return {NodeList}
 */
function getTtipElements() {
    return document.querySelectorAll('.' + SELECTOR_CLASS);
}

function getHostEl() {
    return document.querySelector('.' + HOST_SELECTOR_CLASS);
}

/**
 * [createHost description]
 * @param  {Element} hostParentEl
 */
function createHost(hostParentEl) {

    hostParentEl = hostParentEl || document.body;

    if (getHostEl()) {
        return;
    }
    var hostEl = document.createElement('div');
    hostEl.classList.add(HOST_SELECTOR_CLASS);
    hostParentEl.appendChild(hostEl);
}

/**
 * .ttip element inserted handler
 *
 * @param  {Event} ev
 */
function onTtipElementInserted(ev) {
    init(ev.details.insertedElement);
}

/** module API */
module.exports = {

    initialize: function(hostParentEl) {

        var elements = getTtipElements();
        createHost(hostParentEl);

        for (var i = elements.length - 1; i >= 0; i--) {
            init(elements[i]);
        }
        //listen for new ttip elements being inserted and initialize them
        domInserted.listen(SELECTOR_CLASS);
        document.addEventListener('inserted', onTtipElementInserted, false);
    },
    destroy: function() {
        var elements = getTtipElements();
        var hostEl = getHostEl();

        // destroy the tooltips
        for (var i = elements.length - 1; i >= 0; i--) {
            destroy(elements[i]);
        }
        // remove the host
        hostEl.parentNode.removeChild(hostEl);
        hostEl = null;
    }
};
