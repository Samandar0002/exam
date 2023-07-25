// Variables to keep track of tasks
let tasks = {
    todo: ['To do #1', 'To do #2', 'To do #3'],
    inProgress: ['IP #1', 'IP #2', 'IP #3'],
    done: ['Done #1', 'Done #2', 'Done #3'],
  };
  
  // Function to allow dropping of tasks
  function allowDrop(event) {
    event.preventDefault();
  }
  
  // Function to handle the drag start event
  function dragStart(event) {
    event.dataTransfer.setData('text/plain', event.target.innerText);
  
    // Set the origin list ID
    const originListId = event.target.closest('.list').id;
    event.dataTransfer.setData('originList', originListId);
  }
  
  // Function to handle the drop event
  function drop(event) {
    event.preventDefault();
    const taskContent = event.dataTransfer.getData('text/plain');
    const targetListId = event.target.closest('.list').id;
  
    // Check if the task is coming from the same list
    const originListId = event.dataTransfer.getData('originList');
    if (targetListId === originListId || event.target.tagName === 'BUTTON') return;
  
    // Update the tasks array for the target list
    tasks[targetListId].push(taskContent);
  
    // Update the UI for the target list
    const targetList = document.getElementById(targetListId + '-list');
    const newTask = document.createElement('li');
    newTask.innerText = taskContent;
    newTask.draggable = true;
    newTask.ondragstart = dragStart;
    targetList.appendChild(newTask);
  
    // Clear the original list and re-populate it based on the tasks array
    const originList = document.getElementById(originListId + '-list');
    originList.innerHTML = '';
    tasks[originListId].forEach((task) => {
      const taskElement = document.createElement('li');
      taskElement.innerText = task;
      taskElement.draggable = true;
      taskElement.ondragstart = dragStart;
      originList.appendChild(taskElement);
    });
  
    // Remove the task from the tasks array for the original list
    const taskIndex = tasks[originListId].indexOf(taskContent);
    tasks[originListId].splice(taskIndex, 1);
  }
  
  
  // Function to handle adding new tasks
  function addTask(listId) {
    const newTaskContent = prompt('Enter the task content:');
    if (newTaskContent) {
      tasks[listId].push(newTaskContent);
  
      // Update the UI
      const targetList = document.getElementById(listId + '-list');
      const newTask = document.createElement('li');
      newTask.innerText = newTaskContent;
      newTask.draggable = true;
      newTask.ondragstart = dragStart;
      targetList.appendChild(newTask);
    }
  }
  