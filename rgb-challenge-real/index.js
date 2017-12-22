const random255 = () => Math.floor(Math.random() * 256);
const randomColor = () => `rgb(${random255()}, ${random255()}, ${random255()})`;

let stage;
let problem;
let correctAnswer;

const nextStage = () => {
  // 다음 단계에 대한 상태로 전환
  stage++;
  problem = [randomColor(), randomColor(), randomColor()];
  correctAnswer = Math.floor(Math.random() * 3);
};

const draw = () => {
  document.querySelectorAll('.box').forEach((el, index) => {
    el.style.backgroundColor = problem[index];
  });
  document.querySelector('.rgb-text').textContent = problem[correctAnswer];
  document.querySelector('.score').textContent = stage;
};

const init = () => {
  stage = 0;
  problem = [randomColor(), randomColor(), randomColor()];
  correctAnswer = Math.floor(Math.random() * 3);
}

document.querySelectorAll('.box').forEach((el, index) => {
  el.addEventListener('click', e => {
    el.classList.add('show');
    if (index === correctAnswer) {
      document.querySelector('.correct').classList.add('show');
    } else {
      document.querySelector('.wrong').classList.add('show');
    }
  });
});

document.querySelector(".correct .modal-button").addEventListener("click", e => {
    nextStage();
    draw();
    document.querySelector(".correct").classList.remove("show");
    document.querySelectorAll(".box").forEach(el => {
      el.classList.remove("show");
    });
  });

document.querySelector(".wrong .modal-button").addEventListener("click", e => {
  init();
  draw();
  document.querySelector(".wrong").classList.remove("show");
  document.querySelectorAll(".box").forEach(el => {
    el.classList.remove("show");
  });
});

init();
draw();

init();
draw();