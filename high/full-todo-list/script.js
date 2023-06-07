let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let ul = document.querySelector('.list-group');
let emptyAlert = document.querySelector('.empty-alert');
let clear = document.querySelector('.clear-btn');
let form = document.forms['addTodoItem'];
let inputText = form.elements['todoText'];
let notificationAlert = document.querySelector('.notification-alert');

function checkLocalStorage() {
  if (tasks.length) {
    generateList(tasks);
  } else {
    checkList();
  }
}

function generateId() {
  let id = '';
  let words = '0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM';
  for (let i = 0; i < 15; i++) {
    let position = Math.floor(Math.random() * words.length);
    id += words[position];
  }
  return id;
}

function checkList() {
  if (!ul.children.length) {
    emptyAlert.style.display = 'block';
  } else {
    emptyAlert.style.display = 'none';
  }
}

function generateList(tasksArray) {
  clearList();
  for (let i = 0; i < tasksArray.length; i++) {
    let li = listTemplate(tasksArray[i]);
    ul.appendChild(li);
  }
}

function listTemplate(task) {
  let li = document.createElement('li');
  li.className = 'list-group-item d-flex align-items-center';
  li.setAttribute('data-id', task.id);

  let span = document.createElement('span');
  span.className = 'p-5-20';
  span.textContent = task.text;

  let iDelete = document.createElement('i');
  iDelete.className = 'fas fa-trash-alt delete-item ml-4';
  let iEdit = document.createElement('i');
  iEdit.className = 'fas fa-edit edit-item ml-auto';

  li.appendChild(span);
  li.appendChild(iEdit);
  li.appendChild(iDelete);

  return li;
}

function clearList() {
  ul.innerHTML = '';
}

function addList(list) {
  let newTask = {
    id: generateId(),
    text: list,
  };
  tasks.unshift(newTask);
  ul.insertAdjacentElement('afterbegin', listTemplate(newTask));
  localStorage.setItem('tasks', JSON.stringify(tasks));

  message({
    text: 'Task added success',
    cssClass: 'alert-success',
    timeout: 2000,
  });
}

function deleteListItem(id) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks.splice(i, 1);
      break;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));

  message({
    text: 'Task deleted success',
    cssClass: 'alert-danger',
    timeout: 3000,
  });
}

function editListItem(id, newValue) {
  for (let i = 0; i < tasks.length; i++) {
    if (tasks[i].id === id) {
      tasks[i].text = newValue;
      break;
    }
  }
  localStorage.setItem('tasks', JSON.stringify(tasks));

  message({
    text: 'Task updated success',
    cssClass: 'alert-warning',
    timeout: 3000,
  });
}

function message(settings) {
  notificationAlert.classList.add(settings.cssClass);
  notificationAlert.textContent = settings.text;
  notificationAlert.classList.add('show');
  setTimeout(() => {
    notificationAlert.classList.remove('show');
  }, settings.timeout);
}

ul.addEventListener('click', function (e) {
  if (e.target.classList.contains('delete-item')) {
    let parent = e.target.closest('li');
    let id = parent.dataset.id;
    deleteListItem(id);
    parent.remove();
  } else if (e.target.classList.contains('edit-item')) {
    e.target.classList.toggle('fa-save');
    let id = e.target.closest('li').dataset.id;
    let span = e.target.closest('li').querySelector('span');

    if (e.target.classList.contains('fa-save')) {
      span.setAttribute('contenteditable', true);
      span.focus();
    } else {
      span.setAttribute('contenteditable', false);
      span.blur();
      editListItem(id, span.textContent);
    }
  }
});

form.addEventListener('submit', function (e) {
  e.preventDefault();
  if (!inputText.value) {
    inputText.classList.add('is-invalid');
  } else {
    inputText.classList.remove('is-invalid');
    addList(inputText.value);
    form.reset();
    checkList();
  }
});

inputText.addEventListener('keyup', function () {
  if (inputText.value) {
    inputText.classList.remove('is-invalid');
  }
});

clear.addEventListener('click', () => {
  clearList();
  localStorage.setItem('tasks', JSON.stringify((tasks = [])));
  checkLocalStorage();
});

checkLocalStorage();
generateList(tasks);
