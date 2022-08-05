import Notiflix from 'notiflix';
import 'notiflix/dist/notiflix-3.2.5.min.css';

const formEl = document.querySelector('.form');

const firstDelay = document.querySelector('.delay');
const stepDelay =  document.querySelector('.step');
const amount =  document.querySelector('.amount');
const submitBtn = document.querySelector('.submit-btn');


formEl.addEventListener('submit', submitForm);


function submitForm(evt) {
  evt.preventDefault();


  let delay = Number(formEl.delay.value)
  const stepValue = Number(formEl.step.value);
  const amountValue = Number(formEl.amount.value);


  for (let position = 1; position <= amountValue; position += 1) {
    createPromise(position, delay)
      .then(({ position, delay }) => {
        
          Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`);
        
      })
      .catch(({ position, delay }) => {
        
         Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`);
        
      });
    delay += stepValue;
  }
}
  

function createPromise(position, delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
}