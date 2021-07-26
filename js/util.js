/**
 * @file Define a bunch of utility & helper functions for the Modelbot application.
 */

"use strict";

/* eslint-disable no-unused-vars */
/* eslint-disable no-redeclare */

/**
 * A shortcut for access `document.getElementById`.
 *
 * @example
 * $id("dino");
 *
 * @param {string} sel The ID selector to pass to `getElementById`.
 * @returns {Element} The selected element from the document.
 */
const $id = (sel) => document.getElementById(sel);

/**
 * A shortcut for access `document.querySelector`.
 *
 * @example
 * $(".dino");
 *
 * const div = document.getElementById("jurassic");
 * $(".dino", div);
 *
 * @param {string} sel The CSS selector to pass to `querySelector`.
 * @param {Element} elem The parent element to run `querySelector` on.
 * @returns {Element} The selected element inside the parent.
 */
const $ = (sel, elem = document) => elem.querySelector(sel);

/**
 * A shortcut for access `document.querySelectorAll`.
 *
 * @example
 * $$(".dino");
 *
 * const div = document.getElementById("jurassic");
 * $$(".dino", div);
 *
 * @param {string} sel The CSS selector to pass to `querySelectorAll`.
 * @param {Element} elem The parent element to run `querySelectorAll` on.
 * @returns {Element} The selected element inside the parent.
 */
const $$ = (sel, elem = document) => elem.querySelectorAll(sel);

/**
 * A debounce function for slowing down successive function calls.
 * Creates a new function that can be executed in a debounce fashion.
 *
 * @example
 * const myFunc = debounce(() => {
 *   console.log("Heyo!");
 * }, 75);
 * myFunc();
 * myFunc(); // Only one of them will execute
 *
 * @param {Function} func The function to execute when the debounce occurs.
 * @param {number} wait The time, in seconds, to wait.
 * @param {boolean} immediate Whether to fire immediately or not.
 * @returns {null} Nothing is returned, just a function executed.
 */
const debounce = (func, wait, immediate) => {
  "use strict";
  let timeout;
  return (...allArgs) => {
    // eslint-disable-next-line no-invalid-this
    const context = this;
    const args = allArgs;
    const later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) {
      func.apply(context, args);
    }
  };
};

/**
 * Recurse up parent chain to find a matching parent element, based on selector.
 *
 * @example
 * const td = document.getElementById("the-cell");
 * const tbody = parentElement(td, "tbody");
 *
 * @param {object} elem The HTML element object to find the parent for.
 * @param {string} sel The CSS selector to use with `matches()` for confirming parentage.
 * @returns {object, false} The parent element, or `false` if nothing matches.
 */
const parentElem = (elem, sel) => {
  "use strict";
  if (!elem.parentNode) {
    return false;
  }
  if (elem.parentNode.matches(sel)) {
    return elem.parentNode;
  }
  return parentElem(elem.parentNode, sel);
};

/**
 * Find the next matching element sibling, based on a CSS selector.
 *
 * @param {HTMLElement} elem The current element for comparison.
 * @param {string} sel The CSS selector to use with `matches()`.
 * @returns {HTMLElement, false} The next sibling element, or `false` if nothing matches.
 */
const nextMatchingSiblingElement = (elem, sel) => {
  let count = 0;
  while (elem.nextElementSibling && count < 100) {
    if (elem.nextElementSibling.matches(sel)) {
      return elem.nextElementSibling;
    }
    count++;
    return nextMatchingSiblingElement(elem.nextElementSibling, sel);
  }
  return false;
};

/**
 * Find the previous matching element sibling, based on a CSS selector.
 *
 * @param {HTMLElement} elem The current element for comparison.
 * @param {string} sel The CSS selector to use with `matches()`.
 * @returns {HTMLElement, false} The previous sibling element, or `false` if nothing matches.
 */
const previousMatchingSiblingElement = (elem, sel) => {
  let count = 0;
  while (elem.previousElementSibling && count < 100) {
    if (elem.previousElementSibling.matches(sel)) {
      return elem.previousElementSibling;
    }
    count++;
    return previousMatchingSiblingElement(elem.previousElementSibling, sel);
  }
  return false;
};
