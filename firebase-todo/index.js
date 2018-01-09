const provider = new firebase.auth.GoogleAuthProvider();

const login = document.querySelector('#login-button');

login.addEventListener('click', async e => {

  const result = await firebase.auth().signInWithPopup(provider);

  // This gives you a Google Access Token. You can use it to access the Google API.
  const token = result.credential.accessToken;
  // The signed-in user info.
  const user = result.user;
  console.log(user);
})

const addButtonEL = document.querySelector("#add-button");
const inputEL = document.querySelector("#todo-input");

inputEL.addEventListener('keydown', async e => {
  if (e.key === 'Enter') {
    const listEL = document.querySelector("#todo-list");
    listEL.classList.add("todo-list--loading");
    const uid = firebase.auth().currentUser.uid; // 현재 사용자가 존재한다면 currentUser에 현재 사용자가 들어있다.
    await firebase.database().ref(`/users/${uid}/todos`).push({
      title: e.currentTarget.value,
      complete: false
    })
    inputEL.value = '';
    refreshTodos();
  }
})

async function refreshTodos() {
  const listEL = document.querySelector("#todo-list");
  const uid = firebase.auth().currentUser.uid;
  const snapshot = await firebase.database().ref(`/users/${uid}/todos`).once('value');
  const todos = snapshot.val();
  console.log(todos);


  listEL.innerHTML = '';

  for (let [todoId, todo] of Object.entries(todos)) {
    const itemEL = document.createElement("li");
    const contentEL = document.createElement("div");
    contentEL.classList.add("list-content");
    itemEL.appendChild(contentEL);
    contentEL.textContent = todo.title;
    listEL.appendChild(itemEL);
    if (todo.complete) {
      contentEL.classList.add('complete');
    } else {
      contentEL.classList.remove('complete');
    }
    itemEL.addEventListener("click", async e => {
      if (e.target !== removeButtonEL) {
        if (todo.complete) {
          contentEL.classList.remove("complete");
          todo.complete = false;
          firebase
            .database()
            .ref(`/users/${uid}/todos/${todoId}`)
            .update({
              complete: todo.complete
            });
        } else {
          contentEL.classList.add("complete");
          todo.complete = true;
          firebase
            .database()
            .ref(`/users/${uid}/todos/${todoId}`)
            .update({
              complete: todo.complete
            });
        }
        refreshTodos();
      }
    });

    const removeButtonEL = document.createElement("div");
    removeButtonEL.classList.add("remove-btn");
    itemEL.appendChild(removeButtonEL);

    removeButtonEL.addEventListener("click", e => {
      listEL.removeChild(itemEL);
      firebase.database().ref(`users/${uid}/todos/${todoId}`).remove();
    });

    console.log(todoId, todo);
  };

  listEL.classList.remove('todo-list--loading');
};

firebase.auth().onAuthStateChanged(function (user) {
  if (user) {
    refreshTodos();
  }
});









// addButtonEL.addEventListener("click", e => {
//   const itemEL = document.createElement("li");
//   const contentEL = document.createElement("div");
//   contentEL.classList.add("list-content");
//   itemEL.appendChild(contentEL);
//   contentEL.textContent = inputEL.value;
//   listEL.appendChild(itemEL);
//   inputEL.value = "";



//   const removeButtonEL = document.createElement("div");
//   removeButtonEL.classList.add("remove-btn");
//   itemEL.appendChild(removeButtonEL);
//   // removeButtonEL.textContent = "";

//   removeButtonEL.addEventListener("click", e => {
//     listEL.removeChild(itemEL);
//   });
// });
