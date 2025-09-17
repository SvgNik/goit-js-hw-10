import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { Result } from 'postcss';

const formEl = document.querySelector('.form');

formEl.addEventListener('submit', onSubmit);
function onSubmit(event) {
  event.preventDefault();
  const delay = event.currentTarget.elements.delay.value;

  const radioBtn = event.currentTarget.elements.state.value;
  createPromise(radioBtn, delay)
    .then(response => {
      iziToast.success({
        message: `✅ Fulfilled promise in ${delay}ms`,
      });
    })
    .catch(error => {
      iziToast.error({
        message: `❌ Rejected promise in ${delay}ms`,
      });
    });

  event.currentTarget.reset();
}

function createPromise(btn, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (btn === 'fulfilled') {
        resolve({ delay });
      } else {
        reject({ delay });
      }
    }, delay);
  });
}
