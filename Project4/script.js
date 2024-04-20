const themeBtn = document.querySelector("#theme-toggle");
const todoBox = document.querySelector(".todo-box");
const AddBtn = document.querySelector("#add-btn");
const addValue = document.querySelector("#add-value").value;
const todoDiv = document.querySelectorAll(".todo");
const complete = document.querySelector("#complete");
const incomplete = document.querySelector("#incomplete");
const all = document.querySelector("#all");

var ToggleTheme = false;

window.onload = () => {
  fetchTodo();
  activateEdit();
  activateDelete();
  activateComplete();
};

//load user selected theme

const userTheme = localStorage.getItem("theme");

if (userTheme == "dark") {
  document.body.style.backgroundColor = "#113f67" ;
  document.body.style.color = "#fff";
  themeBtn.classList.replace("fa-moon", "fa-sun");
  ToggleTheme = true;
}

//theme toggle event
themeBtn.addEventListener("click", () => {
  if (!ToggleTheme) {
    document.body.style.backgroundColor = "#113f67";
    document.body.style.color = "#fff";
    themeBtn.classList.replace("fa-moon", "fa-sun");
    ToggleTheme = true;
  } else {
    document.body.style.backgroundColor = "#fff";
    document.body.style.color = "#000";
    themeBtn.classList.replace("fa-sun", "fa-moon");
    ToggleTheme = false;
  }

  if (themeBtn.classList.contains("fa-moon")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
});

document.querySelector("#add-value").addEventListener("keydown", (e) => {
  if (e.keyCode === 13) {
    AddTodo();
  }
});



// fetch todo function

function fetchTodo() {
  const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
  const todoDiv = document.querySelectorAll(".todo");
  if ((todoDiv.length = !0)) {
    todoDiv.forEach((t) => {
      t.remove();
    });

    if (todoArray.length != 0) {
      todoBox.innerHTML = "";
      for (let i = todoArray.length - 1; i >= 0; i--) {
        const todoElement = document.createElement("div");
        todoElement.setAttribute("class", `todo`);
        todoElement.innerHTML = `<div class="information">
              <input type="checkbox" ${
                todoArray[i].isComplete == true && "checked"
              }  id="complete${todoArray[i].id}" />
              <label for="complete${todoArray[i].id}"></label>
              <input
                type="text"
                value="${todoArray[i].todo}"
                disabled
                class="text${todoArray[i].id}"
                id="${todoArray[i].id}"
                ${
                  todoArray[i].isComplete == true &&
                  "style=text-decoration:" + "line-through"
                }
                
              />
            </div>
            <div class="date-container">
              <strong>${todoArray[i].date}</strong>
            </div>
            <div class="utility">
              <i id="pen" class="fa-solid fa-pen-to-square"></i>
              <i id="delete" class="fa-solid fa-eraser"></i>
            </div>`;

        todoBox.appendChild(todoElement);
      }
    } else {
      todoBox.innerHTML = `<h2>Add some to-do </h2>`;
    }
  } else {
    if (todoArray.length != 0) {
      todoBox.innerHTML = "";
      for (let i = todoArray.length - 1; i >= 0; i--) {
        const todoElement = document.createElement("div");
        todoElement.setAttribute("class", `todo`);
        todoElement.innerHTML = `<div class="information">
                <input  type="checkbox" ${
                  todoArray[i].isComplete == true && "checked"
                }
                 
                 id="complete${todoArray[i].id}" />
                <label for="complete${todoArray[i].id}"></label>
                <input
                  type="text"
                  value="${todoArray[i].todo}"
                  disabled
                  class="text${todoArray[i].id}"
                  id="${todoArray[i].id}"
                  
                />
              </div>
              <div class="date-container">
                <strong>${todoArray[i].date}</strong>
              </div>
              <div class="utility">
                <i id="pen" class="fa-solid fa-pen-to-square"></i>
                <i id="delete" class="fa-solid fa-trash"></i>
              </div>`;

        todoBox.appendChild(todoElement);
      }
    } else {
      todoBox.innerHTML = `<h2>Add some to-do </h2>`;
    }
  }
}

//function to add todo
function AddTodo() {
  const todoArray = JSON.parse(localStorage.getItem("todo")) || [];
  const Todo = {
    id: new Date().getUTCMilliseconds() + Math.floor(Math.random() * 100 + 1),
    todo: "Sample todo",
    date: "",
    isComplete: false,
  };
  const todo = document.querySelector("#add-value").value;
  const date = new Date().toLocaleDateString();
  if (todo != "") {
    Todo.todo = todo;
    Todo.date = date;
    todoArray.push(Todo);
    localStorage.setItem("todo", JSON.stringify(todoArray));
    document.querySelector("#add-value").value = "";
    // fetchTodo();
    location.reload();
  } else {
    alert("Enter something to add todo");
  }
}





//update function

function activateEdit() {
  const editBtn = document.querySelectorAll("#pen");
  editBtn.forEach((t) => {
    t.addEventListener("click", (e) => {
      const target = e.target;
      if (e.target.classList.contains("fa-pen-to-square")) {
        const complete =
          e.target.parentElement.parentElement.firstChild.childNodes[1];
        if (!complete.checked) {
          const inputField =
            target.parentElement.parentElement.firstChild.childNodes[5];
          inputField.removeAttribute("disabled");
          inputField.focus();
          inputField.setSelectionRange(
            inputField.value.length,
            inputField.value.length
          );
          target.classList.replace("fa-pen-to-square", "fa-floppy-disk");
          target.removeAttribute("id", "pen");
          target.setAttribute("id", "save");

          // Define the save function
          function saveFunction() {
            const todoText =
              target.parentElement.parentElement.firstChild.childNodes[5].value;
            const todoId =
              target.parentElement.parentElement.firstChild.childNodes[5].id;
            updateTodo(todoText, todoId);
            inputField.blur();
            inputField.setAttribute("disabled", "");
            target.classList.replace("fa-floppy-disk", "fa-pen-to-square");
            target.removeAttribute("id", "save");
            target.setAttribute("id", "pen");
            // Re-bind the event listener after changes
            target.removeEventListener("click", saveFunction);
            target.addEventListener("click", editButtonClick);
          }

          // Remove the event listener from the edit button and attach it to the save button
          target.removeEventListener("click", editButtonClick);
          target.addEventListener("click", saveFunction);
        }
      }
    });

    // Define the original event listener function for the edit button
    function editButtonClick(event) {
      const target = event.target;

      const complete =
        target.parentElement.parentElement.firstChild.childNodes[1];
      if (!complete.checked) {
        const inputField =
          target.parentElement.parentElement.firstChild.childNodes[5];
        inputField.removeAttribute("disabled");
        inputField.focus();
        inputField.setSelectionRange(
          inputField.value.length,
          inputField.value.length
        );
        target.classList.replace("fa-pen-to-square", "fa-floppy-disk");
        target.removeAttribute("id", "pen");
        target.setAttribute("id", "save");

        // Define the save function
        function saveFunction() {
          const todoText =
            target.parentElement.parentElement.firstChild.childNodes[5].value;
          const todoId =
            target.parentElement.parentElement.firstChild.childNodes[5].id;
          updateTodo(todoText, todoId);
          inputField.blur();
          inputField.setAttribute("disabled", "");
          target.classList.replace("fa-floppy-disk", "fa-pen-to-square");
          target.removeAttribute("id", "save");
          target.setAttribute("id", "pen");
          // Re-bind the event listener after changes
          target.removeEventListener("click", saveFunction);
          target.addEventListener("click", editButtonClick);
        }

        // Remove the event listener from the edit button and attach it to the save button
        target.removeEventListener("click", editButtonClick);
        target.addEventListener("click", saveFunction);
      }
    }
  });
}
// function to update todo
function updateTodo(todo, id) {
  const Todo = JSON.parse(localStorage.getItem("todo")) || [];
  console.log(todo, id);
  for (let i = 0; i < Todo.length; i++) {
    if (Todo[i].id == id) {
      Todo[i].todo = todo;
      localStorage.setItem("todo", JSON.stringify(Todo));
      break;
    }
  }
}

// Delete todo event handle

function activateDelete() {
  const deleteBtn = document.querySelectorAll("#delete");
  // console.log(deleteBtn)
  deleteBtn.forEach((b) => {
    b.addEventListener("click", (e) => {
      const target = e.target;
      const todoId =
        target.parentElement.parentElement.firstChild.childNodes[5].id;
      const parent = target.parentElement.parentElement;
      console.log(parent);
      deleteTodo(todoId);

      parent.setAttribute("closing", "");
      parent.addEventListener(
        "animationend",
        () => {
          parent.style.display = "none";
        },
        { once: true }
      );
    });
  });
}
// function to delete todo
function deleteTodo(id) {
  const Todo = JSON.parse(localStorage.getItem("todo"));

  for (let i = 0; i < Todo.length; i++) {
    if (Todo[i].id == id) {
      Todo.splice(i, 1);
      localStorage.setItem("todo", JSON.stringify(Todo));
      break;
    }
  }
}

// fetch complete todos
complete.addEventListener("click", () => {
  const todos = JSON.parse(localStorage.getItem("todo"));
  const Todo = todos.filter((t, i) => t.isComplete == true);
  const todoDiv = document.querySelectorAll(".todo");
  const parent = complete.parentElement;
  const childern = parent.childNodes;
  for (let i = 0; i < childern.length; i++) {
    if (parent.children[i]?.classList.contains("active")) {
      parent.children[i]?.removeAttribute("class", "active");
      complete.classList.add("active");
    }
  }
  if (Todo.length != 0) {
    todoDiv.forEach((t) => {
      t.remove();
    });

    if (todos.length != 0) {
      todoBox.textContent = "";
      for (let i = todos.length - 1; i >= 0; i--) {
        if (todos[i].isComplete == true) {
          const todoElement = document.createElement("div");
          todoElement.setAttribute("class", `todo`);
          todoElement.innerHTML = `<div class="information">
                  <input type="checkbox" ${
                    todos[i].isComplete == true && "checked"
                  }  id="complete${todos[i].id}" />
                  <label for="complete${todos[i].id}"></label>
                  <input
                    type="text"
                    value="${todos[i].todo}"
                    disabled
                    class="text${todos[i].id}"
                    id="${todos[i].id}"
                    ${
                      todos[i].isComplete == true &&
                      "style=text-decoration:" + "line-through"
                    }
                  />
                </div>
                <div class="date-container">
                  <strong>${todos[i].date}</strong>
                </div>
                <div class="utility">
                  <i id="pen" class="fa-solid fa-pen-to-square"></i>
                  <i id="delete" class="fa-solid fa-trash"></i>
                </div>`;
          todoBox.appendChild(todoElement);

          activateEdit();
          activateDelete();
          activateComplete();
        }
      }
    }
  } else {
    todoBox.innerHTML = "<h2>You haven't completed any todo yet</h2>";
  }
});

// fetch incompleted todo

incomplete.addEventListener("click", () => {
  const todos = JSON.parse(localStorage.getItem("todo"));
  const Todo = todos.filter((t) => t.isComplete == false);
  const todoDiv = document.querySelectorAll(".todo");
  const parent = complete.parentElement;
  const childern = parent.childNodes;
  for (let i = 0; i < childern.length; i++) {
    if (parent.children[i]?.classList.contains("active")) {
      parent.children[i]?.removeAttribute("class", "active");
      incomplete.classList.add("active");
    }
  }
  
  if ((Todo.length != 0)) {
    todoDiv.forEach((t) => {
      t.remove();
    });
    console.log('incomplete')
    todoBox.textContent = "";
    for (let i = todos.length - 1; i >= 0; i--) {
      if (todos[i].isComplete == false) {
        const todoElement = document.createElement("div");
        todoElement.setAttribute("class", `todo`);
        todoElement.innerHTML = `<div class="information">
                  <input type="checkbox" ${
                    todos[i].isComplete == true && "checked"
                  }  id="complete${todos[i].id}" />
                  <label for="complete${todos[i].id}"></label>
                  <input
                    type="text"
                    value="${todos[i].todo}"
                    disabled
                    class="text${todos[i].id}"
                    id="${todos[i].id}"
                    
                  />
                </div>
                <div class="date-container">
                  <strong>${todos[i].date}</strong>
                </div>
                <div class="utility">
                  <i id="pen" class="fa-solid fa-pen-to-square"></i>
                  <i id="delete" class="fa-solid fa-trash"></i>
                </div>`;
        todoBox.appendChild(todoElement);

        activateEdit();
        activateDelete();
        activateComplete();
      }
    }
  } else {
    todoBox.innerHTML = "<h2>You don't have any incomplete todo</h2>";
  }
});

// fetch all todo

all.addEventListener("click", () => {
  fetchTodo();
  const parent = complete.parentElement;
  const childern = parent.childNodes;
  for (let i = 0; i < childern.length; i++) {
    if (parent.children[i]?.classList.contains("active")) {
      parent.children[i]?.removeAttribute("class", "active");
      all.classList.add("active");
    }
  }
  activateEdit();
  activateDelete();
  activateComplete();
});

// toggle complete todo event
function activateComplete() {
  const informationBox = document.querySelectorAll(".information");
  const todo = JSON.parse(localStorage.getItem("todo")) || [];

  for (let i = 0; i < todo.length; i++) {
    const box = document.querySelector(`#complete${todo[i].id}`);

    informationBox.forEach((ib) => {
      ib.addEventListener("click", (e) => {
        if (box.id == e.target.id) {
          if (box.checked == true) {
            todo[i].isComplete = true;
            localStorage.setItem("todo", JSON.stringify(todo));
            document.querySelector(`.text${todo[i].id}`).style.textDecoration =
              "line-through";
          } else if (box.checked == false) {
            todo[i].isComplete = false;
            localStorage.setItem("todo", JSON.stringify(todo));
            document.querySelector(`.text${todo[i].id}`).style.textDecoration =
              "none";
          }
        }
      });
    });
  }
}

