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

const addOrderRow = nameDrink => {
  const newItem = document.createElement('li');
  newItem.textContent = `⏳ ${nameDrink} · у роботi...`;
  newItem.classList.add('row-pending');
  listOrder.append(newItem);

  return newItem;
};

form.addEventListener('submit', e => {
  e.preventDefault();

  const formData = new FormData(form);
  const status = {
    drink: formData.get('drink'),
    state: formData.get('state'),
  };

  const row = addOrderRow(status.drink);

  const delay = PREP_TIME[status.drink];
  const shouldResolve = status.state === 'fulfilled';
});
