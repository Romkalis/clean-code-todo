//Document is the DOM can be accessed in the console with document.window.
// Tree is from the top, html, body, p etc.

//Problem: User interaction does not provide the correct results.
//Solution: Add interactivity so the user can manage daily tasks.
//Break things down into smaller steps and take each step at a time.

// Event handling, user interaction is what starts the code execution.

const newTaskInput = document.getElementById('new-task');
const addNewTaskButton = document.getElementsByTagName('button')[0];
const incomletedTasksList = document.getElementById('incompleteTasks');
const completedTaskLists = document.getElementById('completed-tasks');
let nextTaskId = 0;

const createNewTaskElement = function (taskString) {
  const listItem = document.createElement('li');
  const taskId = `new-task-${++nextTaskId}`;

  const checkBox = document.createElement('input');
  const label = document.createElement('label');
  const editInput = document.createElement('input');
  const editInputLabel = document.createElement('label');
  const editButton = document.createElement('button');
  const deleteButton = document.createElement('button');
  const deleteButtonImg = document.createElement('img');

  label.innerText = taskString;
  label.className = 'task';
  label.htmlFor = `${taskId}-checkbox`;

  checkBox.type = 'checkbox';
  checkBox.id = `${taskId}-checkbox`;
  editInput.type = 'text';
  editInput.className = 'task';
  editInput.id = `${taskId}-edit`;
  editInputLabel.className = 'visually-hidden';
  editInputLabel.htmlFor = editInput.id;
  editInputLabel.innerText = `Edit ${taskString}`;
  editButton.innerText = 'Edit';
  editButton.className = 'edit';
  deleteButton.className = 'delete';
  deleteButtonImg.src = './remove.svg';
  deleteButton.appendChild(deleteButtonImg);

  listItem.appendChild(checkBox);
  listItem.appendChild(label);
  listItem.appendChild(editInput);
  listItem.appendChild(editInputLabel);
  listItem.appendChild(editButton);
  listItem.appendChild(deleteButton);
  return listItem;
};

const addTask = function () {
  if (!newTaskInput.value) return;

  const listItem = createNewTaskElement(newTaskInput.value);

  incomletedTasksList.appendChild(listItem);
  bindTaskEvents(listItem);
  newTaskInput.value = '';
};

const editTask = function () {
  const listItem = this.parentNode;
  const editInput = listItem.querySelector('input[type=text]');
  const label = listItem.querySelector('label.task');
  const editBtn = listItem.querySelector('.edit');

  const isEditMode = listItem.classList.contains('editMode');
  if (isEditMode) {
    label.innerText = editInput.value;
    editBtn.innerText = 'Edit';
  } else {
    editInput.value = label.innerText;
    editBtn.innerText = 'Save';
  }
  listItem.classList.toggle('editMode');
};

const deleteTask = function () {
  const listItem = this.parentNode;
  const ul = listItem.parentNode;
  ul.removeChild(listItem);
};

const toggleTaskStatus = function () {
  const listItem = this.parentNode;
  const destinationList = this.checked
    ? completedTaskLists
    : incomletedTasksList;
  destinationList.appendChild(listItem);
};

addNewTaskButton.addEventListener('click', addTask);

const bindTaskEvents = function (taskListItem) {
  const checkBox = taskListItem.querySelector('input[type=checkbox]');
  const editButton = taskListItem.querySelector('button.edit');
  const deleteButton = taskListItem.querySelector('button.delete');

  editButton.addEventListener('click', editTask);
  deleteButton.addEventListener('click', deleteTask);
  checkBox.addEventListener('change', toggleTaskStatus);
};

document
  .querySelectorAll('#incompleteTasks > li, #completed-tasks > li')
  .forEach(bindTaskEvents);

// Issues with usability don't get seen until they are in front of a human tester.

//prevent creation of empty tasks.

//Change edit to save when you are in edit mode.
