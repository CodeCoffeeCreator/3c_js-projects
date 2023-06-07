const UI = (function () {
  const ul = document.querySelector('.list-group');
  const emptyAlert = document.querySelector('.empty-alert');

  const listTemplate = function (task) {
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
  };

  const addTask = function (task) {
    ul.insertAdjacentElement('afterbegin', listTemplate(task));
  };

  const deleteTask = function (id) {
    const li = ul.querySelector(`[data-id=${id}]`);
    li.remove();
  };

  const editTask = function (id, newValue) {
    const liSpan = ul.querySelector(`[data-id=${id}] > span`);
    liSpan.textContent = newValue;
  };

  const checkList = function () {
    if (!ul.children.length) {
      emptyAlert.style.display = 'block';
    } else {
      emptyAlert.style.display = 'none';
    }
  };

  const deleteAll = function () {
    ul.innerHTML = '';
  };

  return {
    addTask,
    deleteTask,
    editTask,
    checkList,
    deleteAll,
  };
})();
