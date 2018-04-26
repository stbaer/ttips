/**
 * @module ttips
 */
const SELECTOR_CLASS = 'ttip'
const HOST_SELECTOR_CLASS = 'ttip-host'
const ACTIVE_CLASS = 'ttip-active'
const DISTANCE_TO_ELEMENT = 10

/**
 *
 */
const removeHostChilds = () => {
  const hostEl = getHostEl()
  while (hostEl.firstChild) {
    hostEl.removeChild(hostEl.firstChild)
  }
}

/**
 * @param  {Element} ttipEl
 */
const cloneToHost = ttipEl => {
  removeHostChilds()
  getHostEl().appendChild(ttipEl.cloneNode(true))
}

/**
 * update the tooltip position
 * @param {Element} targetEl
 */
const updatePosition = (targetEl) => {
  const ttipHostEl = getHostEl()
  const ttipEl = targetEl.nextElementSibling

  const targetRect = targetEl.getBoundingClientRect()
  const ttipRect = ttipHostEl.getBoundingClientRect()
  const position = ttipEl.getAttribute('data-ttip-position')
  const ttipStyle = ttipHostEl.style

  let left, marginLeft

  if (position === 'left') {
    ttipStyle.left = targetRect.left - ttipRect.width - DISTANCE_TO_ELEMENT + 'px'
    ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px'
    ttipStyle.marginLeft = 0
  } else if (position === 'right') {
    ttipStyle.left = targetRect.right + DISTANCE_TO_ELEMENT + 'px'
    ttipStyle.top = targetRect.top + (targetRect.height - ttipRect.height) / 2 + 'px'
    ttipStyle.marginLeft = 0
  } else if (position === 'top') {
    left = targetRect.left + (targetRect.width / 2)
    marginLeft = -1 * (ttipHostEl.offsetWidth / 2)

    ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px'
    ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px'
    ttipStyle.top = targetRect.top - ttipRect.height - DISTANCE_TO_ELEMENT + 'px'
  } else {
    // default - bottom
    left = targetRect.left + (targetRect.width / 2)
    marginLeft = -1 * (ttipHostEl.offsetWidth / 2)

    ttipStyle.left = left + marginLeft < 0 ? 0 : left + 'px'
    ttipStyle.marginLeft = left + marginLeft < 0 ? 0 : marginLeft + 'px'
    ttipStyle.top = targetRect.top + targetRect.height + DISTANCE_TO_ELEMENT + 'px'
  }
}

/**
 * @param  {Event} ev
 * @return {Element|null}
 */
const getTtipElFromEvent = ev => {
  const nextSibling = ev.target.nextElementSibling || ev.currentTarget.nextElementSibling

  if (nextSibling && nextSibling.classList.contains('ttip')) {
    return nextSibling
  }
}

/**
 * @param  {Element} ttipEl
 */
const show = (ttipEl) => {
  const targetEl = ttipEl.previousElementSibling

  cloneToHost(ttipEl)
  updatePosition(targetEl)
  getHostEl().classList.add(ACTIVE_CLASS)

  window.addEventListener('scroll', onMouseLeave)
  window.addEventListener('touchmove', onMouseLeave)
}

/**
 * Hide any visible tooltip
 */
const hide = () => {
  const hostEl = getHostEl()
  if (hostEl.classList.contains(ACTIVE_CLASS)) {
    hostEl.classList.remove(ACTIVE_CLASS)
    window.removeEventListener('scroll', onMouseLeave)
    window.removeEventListener('touchmove', onMouseLeave)
    while (hostEl.firstChild) {
      hostEl.removeChild(hostEl.firstChild)
    }
  }
}

/**
 * @param {Event} ev
 */
const onMouseEnter = ev => {
  const ttipEl = getTtipElFromEvent(ev)
  ttipEl && show(ttipEl)
}

/**
 */
const onMouseLeave = () => hide()

/**
 * Initialize the tooltip
 * @param {Element} ttipEl - The toggle element.
 */
function init (ttipEl) {
  if (!ttipEl._ttip && !ttipEl.parentNode.classList.contains('ttip-host')) {
    ttipEl._ttip = true
    const targetEl = ttipEl.previousElementSibling

    targetEl.addEventListener('mouseenter', onMouseEnter)
    targetEl.addEventListener('mouseleave', onMouseLeave)
    targetEl.addEventListener('blur', onMouseLeave)
  }
}

/**
 * @param {Element} ttipEl
 */
function destroySingle (ttipEl) {
  if (ttipEl._ttip === true) {
    const targetEl = ttipEl.previousElementSibling
    if (ttipEl.classList.contains(ACTIVE_CLASS)) {
      getHostEl.classList.remove(ACTIVE_CLASS)
    }
    targetEl.removeEventListener('mouseenter', onMouseEnter)
    targetEl.removeEventListener('mouseleave', onMouseLeave)
    targetEl.removeEventListener('blur', onMouseLeave)

    ttipEl._ttip = null
  }
}

/**
 * returns the tooltip elements
 * @return {NodeList}
 */
const getTtipElements = () => document.querySelectorAll('.' + SELECTOR_CLASS)
/**
 * @return {Element | null}
 */
const getHostEl = () => document.querySelector('.' + HOST_SELECTOR_CLASS)

/**
 * @param  {Element} hostParentEl
 */
const createHost = (hostParentEl) => {
  hostParentEl = hostParentEl || document.body
  if (!getHostEl()) {
    const hostEl = document.createElement('div')
    hostEl.classList.add(HOST_SELECTOR_CLASS)
    hostParentEl.appendChild(hostEl)
  }
}

/**
 *
 */
const update = () => {
  const elements = getTtipElements()
  for (let i = elements.length - 1; i >= 0; i--) {
    init(elements[i])
  }
}

/**
 * initialize tooltips
 * @param  {Element} hostParentEl
 */
const initialize = (hostParentEl) => {
  createHost(hostParentEl)
  update()
}

/**
 * destroy all tooltips
 */
function destroy () {
  const elements = getTtipElements()
  let hostEl = getHostEl()

  // destroy the tooltips
  for (let i = elements.length - 1; i >= 0; i--) {
    destroySingle(elements[i])
  }
  // remove the host
  hostEl.parentNode.removeChild(hostEl)
  hostEl = null
}

/**
 * module API
 * @type {Object}
 */
const ttips = {
  initialize,
  update,
  hide,
  destroy
}

module.exports = ttips
