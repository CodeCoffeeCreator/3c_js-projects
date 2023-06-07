const id = Id;

const Tasks = (function () {
  let tasks = [];
  let instance;

  const getTasks = function () {
    return tasks;
  };

  const setTasks = function (array) {
    tasks = array;
    return tasks;
  };

  const addTask = async function (task) {
    task.id = id.generate();
    tasks.push(task);
    return task;
  };

  const removeTask = async function (id) {
    tasks = tasks.filter((task) => task.id !== id);
    return tasks;
  };

  const editTask = async function (id, newValue) {
    for (let i = 0; i < tasks.length; i++) {
      if (tasks[i].id === id) {
        tasks[i].text = newValue;
        break;
      }
    }
    return tasks;
  };

  const removeAll = async function () {
    tasks = [];
  };

  const createInstance = function () {
    return {
      getTasks,
      setTasks,
      addTask,
      removeTask,
      editTask,
      removeAll,
    };
  };

  return {
    getInstance: function () {
      return instance || (instance = createInstance());
    },
  };
})();
