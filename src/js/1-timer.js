import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const inputEl = document.querySelector('#datetime-picker');
const btn = document.querySelector('[data-start]');
const timer = document.querySelector('.timer');

let userDate = null;
let intervalID = null;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < new Date()) {
      iziToast.error({
        message: 'Please choose a date in the future',
        position: 'topRight',
      });
    } else {
      btn.disabled = false;
      userDate = selectedDates[0];
    }
  },
};

flatpickr(inputEl, options);

btn.addEventListener('click', onClick);

function onClick() {
  btn.disabled = true;
  inputEl.disabled = true;

  intervalID = setInterval(() => {
    const currentDate = Date.now();
    const diff = userDate - currentDate;

    if (diff <= 0) {
      clearInterval(intervalID);
      iziToast.success({
        message: '⏰ Countdown finished!',
        position: 'topRight',
      });
      updateTimer(0, 0, 0, 0);
      btn.disabled = false;
      inputEl.disabled = false;
      return;
    }

    const { days, hours, minutes, seconds } = convertMs(diff);
    updateTimer(days, hours, minutes, seconds);
  }, 1000);
}

function updateTimer(days, hours, minutes, seconds) {
  timer.querySelector('[data-days]').textContent = pad(days);
  timer.querySelector('[data-hours]').textContent = pad(hours);
  timer.querySelector('[data-minutes]').textContent = pad(minutes);
  timer.querySelector('[data-seconds]').textContent = pad(seconds);
}

function pad(value) {
  return String(value).padStart(2, '0');
}

function convertMs(ms) {
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
