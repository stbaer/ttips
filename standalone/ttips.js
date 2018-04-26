(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.ttips = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
'use strict'

function injectStyleTag (document, fileName, cb) {
  var style = document.getElementById(fileName)

  if (style) {
    cb(style)
  } else {
    var head = document.getElementsByTagName('head')[0]

    style = document.createElement('style')
    if (fileName != null) style.id = fileName
    cb(style)
    head.appendChild(style)
  }

  return style
}

module.exports = function (css, customDocument, fileName) {
  var doc = customDocument || document
  /* istanbul ignore if: not supported by Electron */
  if (doc.createStyleSheet) {
    var sheet = doc.createStyleSheet()
    sheet.cssText = css
    return sheet.ownerNode
  } else {
    return injectStyleTag(doc, fileName, function (style) {
      /* istanbul ignore if: not supported by Electron */
      if (style.styleSheet) {
        style.styleSheet.cssText = css
      } else {
        style.innerHTML = css
      }
    })
  }
}

module.exports.byUrl = function (url) {
  /* istanbul ignore if: not supported by Electron */
  if (document.createStyleSheet) {
    return document.createStyleSheet(url).ownerNode
  } else {
    var head = document.getElementsByTagName('head')[0]
    var link = document.createElement('link')

    link.rel = 'stylesheet'
    link.href = url

    head.appendChild(link)
    return link
  }
}

},{}],2:[function(require,module,exports){
require('./ttips.css');

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
 *
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

/**
 * @param  {Event} ev
 * @return {Element}
 */
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
 * @param  {Element} ttipEl
 */
function show(ttipEl) {

    var targetEl = ttipEl.previousElementSibling;

    cloneToHost(ttipEl);
    updatePosition(targetEl);
    getHostEl().classList.add(ACTIVE_CLASS);

    window.addEventListener('scroll', onMouseLeave);
    window.addEventListener('touchmove', onMouseLeave);
}

/**
 * Hide any visible tooltip
 */
function hide(){
    var hostEl = getHostEl();
    if(hostEl.classList.contains(ACTIVE_CLASS)){
        hostEl.classList.remove(ACTIVE_CLASS);
        window.removeEventListener('scroll', onMouseLeave);
        window.removeEventListener('touchmove', onMouseLeave);
        while (hostEl.firstChild) {
            hostEl.removeChild(hostEl.firstChild);
        }
    }
}

/**
 * @param {Event} ev
 */
function onMouseEnter(ev) {
    var ttipEl = getTtipElFromEvent(ev);
    if (ttipEl) {
        show(ttipEl);
    }
}

/**
 * @param {Event} [ev]
 */
function onMouseLeave(ev) {
    hide();
}

/**
 * Initialize the tooltip
 * @param {Element} ttipEl - The toggle element.
 */
function init(ttipEl) {
    var targetEl;
    if (!ttipEl._ttip && !ttipEl.parentNode.classList.contains('ttip-host')) {
        ttipEl._ttip = true;
        targetEl = ttipEl.previousElementSibling;

        targetEl.addEventListener('mouseenter', onMouseEnter);
        targetEl.addEventListener('mouseleave', onMouseLeave);
        targetEl.addEventListener('blur', onMouseLeave);
    }
}

/**
 * @param {Element} ttipEl
 */
function destroySingle(ttipEl) {
    var targetEl;
    if (ttipEl._ttip === true) {
        targetEl = ttipEl.previousElementSibling;
        if (ttipEl.classList.contains(ACTIVE_CLASS)) {
            getHostEl.classList.remove(ACTIVE_CLASS);
        }
        targetEl.removeEventListener('mouseenter', onMouseEnter);
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
/**
 * @return {Element | null}
 */
function getHostEl() {
    return document.querySelector('.' + HOST_SELECTOR_CLASS);
}

/**
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
 *
 */
function update(){
    var elements = getTtipElements();
    for (var i = elements.length - 1; i >= 0; i--) {
        init(elements[i]);
    }
}

/**
 * initialize tooltips
 * @param  {Element} hostParentEl
 */
function initialize(hostParentEl) {
    createHost(hostParentEl);
    update();
}

/**
 * destroy all tooltips
 */
function destroy() {
    var elements = getTtipElements();
    var hostEl = getHostEl();

    // destroy the tooltips
    for (var i = elements.length - 1; i >= 0; i--) {
        destroySingle(elements[i]);
    }
    // remove the host
    hostEl.parentNode.removeChild(hostEl);
    hostEl = null;
}

/**
 * module API
 * @type {Object}
 */
module.exports = {
    initialize: initialize,
    update: update,
    hide: hide,
    destroy: destroy
};

},{"./ttips.css":3}],3:[function(require,module,exports){
var inject = require('./../node_modules/cssify');
var css = "@-webkit-keyframes fadeIn {\n\t0% { opacity: 0 }\n    50% { opacity: 0.99 }\n\t100% { opacity: 1 }\n}\n\n@keyframes fadeIn {\n\t0% { opacity: 0 }\n    50% { opacity: 0.99 }\n\t100% { opacity: 1 }\n}\n\n@-webkit-keyframes fadeOut {\n\t0% { opacity: 1 }\n    50% { opacity: 0.99 }\n\t100% { opacity: 0 }\n}\n\n@keyframes fadeOut {\n\t0% { opacity: 1 }\n    50% { opacity: 0.99 }\n\t100% { opacity: 0 }\n}\n\n.ttip {\n    display: none;\n\tfont-size: 11px;\n    line-height: 14px;\n    padding: 5px;\n\tbackground: rgb(38, 38, 38);\n    color: rgb(255, 255, 255);\n}\n\n.ttip-host {\n\tposition: fixed;\n    display: inline-block;\n\t-webkit-transition: opacity 0.3s ease-in-out;\n\ttransition: opacity 0.3s ease-in-out;\n    -webkit-animation-name: fadeOut;\n            animation-name: fadeOut;\n\topacity: 0;\n\ttop: -9999px;\n    left: -9999px;\n    z-index: 9999;\n}\n.ttip-host .ttip{\n\tdisplay: inline-block;\n}\n\n.ttip-host.ttip-active {\n    -webkit-animation-name: fadeIn;\n            animation-name: fadeIn;\n\topacity: 1;\n    visibility: visible;\n}\n";
inject(css, undefined, '_w2nnss');
module.exports = css;

},{"./../node_modules/cssify":1}]},{},[2])(2)
});
