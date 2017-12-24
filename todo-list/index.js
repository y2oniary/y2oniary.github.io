const addButtonEL = document.querySelector('#ad-button');
const inputEL = document.querySelector("#todo-input");
const listEL = document.querySelector("#todo-list");

document.querySelector('#add-button').addEventListener('click', e => {
  const itemEL = document.createElement("li");
  const contentEL = document.createElement("div");
  contentEL.classList.add('list-content');
  itemEL.appendChild(contentEL);
  contentEL.textContent = inputEL.value;
  listEL.appendChild(itemEL);
  inputEL.value = '';

  itemEL.addEventListener('click', e => {
    if (contentEL.classList.contains('complete')) {
      contentEL.classList.remove('complete');
    } else {
      contentEL.classList.add('complete');
    };
  });

  const removeButtonEL = document.createElement("div");
  removeButtonEL.classList.add('remove-btn');
  itemEL.appendChild(removeButtonEL);
  // removeButtonEL.textContent = "";

  removeButtonEL.addEventListener('click', e => {
    listEL.removeChild(itemEL);
  })
});
