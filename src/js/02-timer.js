import flatpickr from "flatpickr";

import "flatpickr/dist/flatpickr.min.css";
import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const dataStart = document.querySelector('[data-start]');
const dataDay = document.querySelector('[data-days]');
const dataHours = document.querySelector('[data-hours]');
const dataMinutes = document.querySelector('[data-minutes]');
const dataSeconds = document.querySelector('[data-seconds]');
const dataPicker = document.querySelector('#datetime-picker');



dataStart.disabled = true;
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    
      const dateNow = Date.now();
    //   dataStart.disabled = true;
      if (selectedDates[0] < dateNow) {
          
          Notiflix.Notify.failure('Please choose a date in the future')
          return
      }
      const choiceDate = selectedDates[0].getTime()

      dataStart.disabled = false;
      function timer() {
          const intrvalid = setInterval(() => {
              const currentDate = Date.now();
              const delta = choiceDate - currentDate;
            //   console.log(delta)
              dataStart.disabled = true;
              if (delta <= 0) {
                  clearInterval(intrvalid)
                  return
              }
              convertMs(delta)
          }, 1000)
                       
      }
      dataStart.addEventListener('click', timer)
  },
};

flatpickr(dataPicker, options);


function convertMs(ms) {
 
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  
  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);



dataDay.textContent = days;
dataHours.textContent = hours;
dataMinutes.textContent = minutes;
dataSeconds.textContent = seconds;

 return { days, hours, minutes, seconds };
    
}

function addLeadingZero(value) {
    return String(value).padStart(2, '0');
}