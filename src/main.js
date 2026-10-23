import { PREP_TIME } from './js/menu.js';

const form = document.querySelector('.form');
const listOrder = document.querySelector('.order-log');

const makeOrder = (delay, shouldResolve) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (shouldResolve === true) {
        resolve(delay);
      } else {
        reject(delay);
      }
    }, delay);
  });
};
