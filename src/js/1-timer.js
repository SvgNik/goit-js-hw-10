import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

let userDate = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
    if (selectedDates[0] < options.defaultDate) {
      iziToast.error({
        message: 'Please choose a date in the future',
      });
    } else {
      btn.disabled = false;
      userDate = selectedDates[0];
    }
  },
};

flatpickr(inputEl, options);

btn.addEventListener('click', onClick);
function onClick(event) {
  btn.disabled = true;
  inputEl.disabled = true;
  const intervalID = setInterval(() => {
    const currentDate = Date.now();
    const diff = userDate - currentDate;
    const { days, hours, minutes, seconds } = convertMs(diff);
    if (diff <= 1000) {
      clearInterval(intervalID);
      iziToast.success({
        message: 'Finish',
      });

      inputEl.disabled = false;
    }
    timer.querySelector('[data-days]').textContent = pad(days);
    timer.querySelector('[data-hours]').textContent = pad(hours);
    timer.querySelector('[data-minutes]').textContent = pad(minutes);
    timer.querySelector('[data-seconds]').textContent = pad(seconds);
    console.log(diff);
  }, 1000);
}

function pad(value) {
  return String(value).padStart(2, 0);
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}
