const timer = document.querySelector('.countdown');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');
const message = document.querySelector('.message');

const plusmin = document.querySelector('.plusmin');
const minusmin = document.querySelector('.minusmin');
const plussec = document.querySelector('.plussec');
const minussec = document.querySelector('.minussec');
const start = document.querySelector('.start');
const restart = document.querySelector('.restart');


let countSec = 0;
let countMin = 0;

const updateText = () =>{   
  minutes.value = (0 + String(countMin)).slice(-2);
  seconds.value = (0 + String(countSec)).slice(-2);
}
updateText();

let timeinterval;
const countDown = () => {   
  if (isNaN(minutes.value) || isNaN(seconds.value)) {
    alert('Нечисловое значение');
    return;
  }
  countSec = seconds.value;
  countMin = minutes.value;
  if ((countSec > 59) || (countSec < 0)) {
    alert('Неверное значение секунд: 0..59');
    return;
  }
  if ((countMin > 59) || (countMin < 0)) {
    alert('Неверное значение минут: 0..59');
    return;
  }
  let total = countSec + countMin * 60;
  timeinterval = setTimeout(countDown, 1000);
  if (total <= 0) {
    clearInterval(timeinterval);
    timer.style.display = 'none';
    message.innerHTML = '<p>I am done...</p>'
    start.disabled = false;
    restart.innerHTML = 'restart';
    }
  if(countSec > 0) countSec--;
  else{
    countSec = 59;
    countMin--;
  } 
  updateText();
}

plussec.onclick = () =>{
  countSec = seconds.value;
  if(countSec < 59) ++countSec;
  else{
    countSec = 0;
  }
  updateText()
}

minussec.onclick = () =>{
  countSec = seconds.value;
  if(countMin <= 0 && countSec===0){
    countSec = 0;
    countMin = 0;
    return;
  }
  if(countSec > 0) --countSec;
  else{
    countSec = 59;
  }
  updateText();
}

plusmin.onclick = () =>{
  countMin = minutes.value;
  if(countMin < 59) ++countMin;
  else{
    countMin = 0;
  }
  updateText()
}

minusmin.onclick = () =>{
  countMin = minutes.value;
  if(countMin <= 0){
    countMin = 59;
    updateText();
    return;
  }
  if(countMin > 0) --countMin;
  else{
    countMin = 59;
  }
  updateText();
}

start.onclick = () => {
  countDown();
  start.disabled = minutes.disabled = seconds.disabled = true;
  plusmin.disabled = minusmin.disabled = plussec.disabled = minussec.disabled = true;
  restart.innerHTML = 'stop';
}

restart.onclick = () => {
  if (!start.disabled) location.reload();
  clearInterval(timeinterval);
  start.disabled = minutes.disabled = seconds.disabled = false;
  plusmin.disabled = minusmin.disabled = plussec.disabled = minussec.disabled = false;
  restart.innerHTML = 'restart';
}
