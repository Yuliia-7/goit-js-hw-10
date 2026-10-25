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

  let row = addOrderRow(status.drink);

  const delay = PREP_TIME[status.drink];
  const shouldResolve = status.state === 'fulfilled';

  makeOrder(delay, shouldResolve)
    .then(value => {
      row.textContent = `✅ ${status.drink} · готове · ${value} ms`;
      row.classList.remove('row-pending');
      row.classList.add('row-ok');
    })
    .catch(error => {
      row.textContent = `❌ ${status.drink} · скасовано · ${error} ms`;
      row.classList.remove('row-pending');
      row.classList.add('row-err');
    })
    .finally(() => {
      row.textContent += ` · ${new Date().toLocaleTimeString('uk-UA')}`;
    });
});
