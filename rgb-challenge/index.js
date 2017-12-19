const random255 = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${random255()}, ${random255()}, ${random255()})`;

const color = document.querySelector('.color');
const boxes = document.querySelector('.boxes');
const box = document.querySelectorAll('.box');
const point = document.querySelector('.point');

const randNum = Math.floor(Math.random() * 3)
let count = 0;

box.forEach(el => {
  el.style.backgroundColor = randomColor();
})

color.textContent = box[randNum].style.backgroundColor;


// Event
boxes.addEventListener('click', function (e) {
  if (e.target.style.backgroundColor == color.textContent) {
    count += 1;
  } else {
    count = 0;
  }

  box.forEach(el => {
    el.style.backgroundColor = randomColor();
  })

  const randNum = Math.floor(Math.random() * 3);
  color.textContent = box[randNum].style.backgroundColor;

  point.textContent = `Your Point: ${count}`;
})

