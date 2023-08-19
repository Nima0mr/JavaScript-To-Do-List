"use strict";
let mode = 'add';
const addBtn = () => {
    const addToDoBtn = document.getElementById('add-btn');
    if (addToDoBtn) {
        addToDoBtn.addEventListener('click', askPriority);
    }
};
const addToDoItem = (priority) => {
    data.inputVal = document.getElementById('add-input').value;
    const toDoData = {
        id: data.id,
        text: data.inputVal,
        isChecked: false,
        priority: priority
    };
    data.toDoArray.push(toDoData);
    renderToDoList();
    data.id++;
    saveListOnLocalStorage();
};
const askPriority = () => {
    if (mode === 'add' && isAddInputEmpty()) {
        alert('Please fill your task.');
        return;
    }
    showModal();
};
const isAddInputEmpty = () => {
    data.inputVal = document.getElementById('add-input').value;
    return data.inputVal.trim() === '';
};
const setPriority = () => {
    setModalTemp('لطفا میزان اولویت را انتخاب کنید.', PrioritiesTemplate);
    const priority1Button = document.querySelector('#priority-1');
    const priority2Button = document.querySelector('#priority-2');
    const priority3Button = document.querySelector('#priority-3');
    if (priority1Button) {
        priority1Button.addEventListener('click', () => priorityEvent({ id: 1, title: 'High' }));
    }
    if (priority2Button) {
        priority2Button.addEventListener('click', () => priorityEvent({ id: 2, title: 'Medium' }));
    }
    if (priority3Button) {
        priority3Button.addEventListener('click', () => priorityEvent({ id: 3, title: 'Low' }));
    }
};
const priorityEvent = (priority) => {
    if (mode === 'add') {
        addToDoItem(priority);
        document.getElementById('add-input').value = '';
    }
    else if (mode === 'edit') {
        data.toDoArray[data.toDoArray.findIndex(({ id }) => id === data.selectedId)].priority = priority;
        (document.getElementById(`edit-priority-${data.selectedId}`)).classList.remove(`priority-1`);
        (document.getElementById(`edit-priority-${data.selectedId}`)).classList.remove(`priority-2`);
        (document.getElementById(`edit-priority-${data.selectedId}`)).classList.remove(`priority-3`);
        (document.getElementById(`edit-priority-${data.selectedId}`)).classList.add(`priority-${priority.id}`);
    }
    hideModal();
};
const PrioritiesTemplate = () => {
    return `<div class="priorities">
    <div class="tooltip">
        <button id="priority-1" class="button priority-1"></button>
        <span class="tooltiptext">High</span>
    </div>
    <div class="tooltip">
        <button id="priority-2" class="button priority-2"></button>
        <span class="tooltiptext">medium</span>
    </div>
    <div class="tooltip">
        <button id="priority-3" class="button priority-3"></button>
        <span class="tooltiptext">low</span>
    </div>
   </div>`;
};
const saveListOnLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(data.toDoArray));
    localStorage.setItem('id', JSON.stringify(data.id));
};
const getListOnLocalStorage = () => {
    let a = localStorage.getItem('list');
    a = JSON.parse(a);
    if (a === null) {
        a = [];
    }
    return a;
};
const getIdOnLocalStorage = () => {
    let a = localStorage.getItem('id');
    a = JSON.parse(a);
    if (a === null) {
        a = 1;
    }
    return a;
};
const toDoListItemTemplate = (item) => {
    return `<div class="to-do-item" id="item-${item.id}">
        <div id="item-text-${item.id}" class="item-text">
            <div class="tooltip">
                <div id="item-priority-${item.id}" class="to-do-priority priority-${item.priority.id}"></div>
                <span class="tooltiptext">${item.priority.title}</span>
            </div>
            <span class="to-do-text" id="text-${item.id}">${item.text}</span>
        </div>
        <div id="item-buttons-${item.id}">
            <div class="tooltip"><button type="button" id="check-${item.id}" class="button green"><i class="fa fa-check-square-o "></i></button><span class="tooltiptext" id="checked-${item.id}">Check</span></div>
            <div class="tooltip"><button type="button" id="edit-${item.id}" class="button blue"><i class="fa fa-pencil-square-o"></i></button><span class="tooltiptext">Edit</span></div>
            <div class="tooltip"><button type="button" id="delete-${item.id}" class="button red"><i class="fa fa-trash-o"></i></button><span class="tooltiptext">Delete</span></div>
        </div>
    </div>`;
};
const renderToDoList = () => {
    renderList();
    renderEvents();
};
const renderList = () => {
    const main = document.querySelector('#main');
    if (main) {
        main.innerHTML = '';
    }
    data.toDoArray.sort((a, b) => (a.priority.id > b.priority.id ? 1 : b.priority.id > a.priority.id ? -1 : 0));
    data.toDoArray.forEach(item => {
        if (main) {
            main.innerHTML += toDoListItemTemplate(item);
        }
    });
};
const renderEvents = () => {
    data.toDoArray.forEach(item => {
        setEvents(item);
    });
};
const setEvents = (item) => {
    let checkBtn = document.getElementById(`check-${item.id}`);
    let editBtn = document.getElementById(`edit-${item.id}`);
    let deleteBtn = document.getElementById(`delete-${item.id}`);
    if (checkBtn !== null) {
        checkBtn.addEventListener('click', () => checkItem(item.id));
    }
    if (editBtn !== null) {
        editBtn.addEventListener('click', () => editItem(item.id, item.text, item.priority));
    }
    if (deleteBtn !== null) {
        deleteBtn.addEventListener('click', () => deleteItem(item.id));
    }
    if (item.isChecked) {
        document.getElementById(`text-${item.id}`).classList.add('checked');
        document.getElementById(`item-priority-${item.id}`).classList.add('priority-checked');
        document.getElementById(`check-${item.id}`).classList.add('disabled');
        document.getElementById(`check-${item.id}`).setAttribute('disabled', 'true');
        document.getElementById(`checked-${item.id}`).innerHTML = 'Checked!';
    }
};
const checkItem = (itemId) => {
    var _a;
    const element = document.getElementById(`text-${itemId}`);
    const btn = document.getElementById(`check-${itemId}`);
    element === null || element === void 0 ? void 0 : element.classList.add('checked');
    btn === null || btn === void 0 ? void 0 : btn.classList.add('disabled');
    (_a = document.getElementById(`item-priority-${itemId}`)) === null || _a === void 0 ? void 0 : _a.classList.add('priority-checked');
    btn === null || btn === void 0 ? void 0 : btn.setAttribute('disabled', 'true');
    const checkedBtn = document.getElementById(`checked-${itemId}`);
    if (checkedBtn !== null) {
        checkedBtn.innerHTML = 'Checked!';
    }
    data.toDoArray[data.toDoArray.findIndex((item) => item.id === itemId)].isChecked = true;
    saveListOnLocalStorage();
};
const editItem = (itemId, text, priority) => {
    mode = 'edit';
    renderEditTemplate(itemId, text, priority);
};
const deleteItem = (itemId) => {
    var _a;
    data.toDoArray.splice(data.toDoArray.findIndex(({ id }) => id === itemId), 1);
    saveListOnLocalStorage();
    (_a = document.getElementById(`item-${itemId}`)) === null || _a === void 0 ? void 0 : _a.remove();
};
const renderEditTemplate = (itemId, text, priority) => {
    const element = document.getElementById(`item-text-${itemId}`);
    const buttonElement = document.getElementById(`item-buttons-${itemId}`);
    if (element) {
        element.innerHTML = `
            <div class="tooltip">
                <div id="edit-priority-${itemId}" class="to-do-priority priority-${priority.id}"></div>
                <span class="tooltiptext">${priority.title}</span>
            </div>
            <input type="text" id="edit-input-${itemId}" class="input" value="${text}">`;
    }
    if (buttonElement) {
        buttonElement.innerHTML = `<button type="button" id="edit-priority" class="change-priority-btn">Change Priority</button>
    <button type="button" id="edit-yes" class="button green"><i class="fa fa-check"></i></button>
    <button type="button" id="edit-no" class="button red"><i class="fa fa-times"></i></button>`;
        setEditEvents(itemId);
    }
};
const setEditEvents = (itemId) => {
    const editYesButton = document.getElementById(`edit-yes`);
    const editNoButton = document.getElementById(`edit-no`);
    const editPriorityButton = document.getElementById(`edit-priority`);
    if (editYesButton) {
        editYesButton.addEventListener('click', () => updateToDoItem(itemId));
    }
    if (editNoButton) {
        editNoButton.addEventListener('click', () => { mode = 'add'; renderToDoList(); });
    }
    if (editPriorityButton) {
        editPriorityButton.addEventListener('click', () => { data.selectedId = itemId; askPriority(); });
    }
};
const updateToDoItem = (itemId) => {
    var _a;
    data.editInputVal = (_a = document.getElementById(`edit-input-${itemId}`)) === null || _a === void 0 ? void 0 : _a.value;
    const itemIndex = data.toDoArray.findIndex(({ id }) => id === itemId);
    if (itemIndex !== -1) {
        data.toDoArray[itemIndex].text = data.editInputVal;
        data.toDoArray[itemIndex].isChecked = false;
    }
    saveListOnLocalStorage();
    mode = 'add';
    renderToDoList();
};
const initializeApp = () => {
    data.toDoArray = getListOnLocalStorage();
    data.id = getIdOnLocalStorage();
    setPriority();
    renderToDoList();
    addBtn();
};
initializeApp();
