
// sets click event for add btn !
const addBtn = () => {
    document.getElementById('add-btn').addEventListener('click', askPriority)
}


const addToDo = (priority) => {
    inputVal = document.getElementById('add-input').value
    const data = {
        id: id,
        text: inputVal,
        isChecked: false,
        priority: priority
    }
    toDoArray.push(data)
}
const askPriority = () => {
    showModal() // this method came from ../Components/Modal/modal.js
}


// returns the template for pirority modal
const setPriorityTemplate = () => {
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
   </div>`
}

// returns the template for a todo list item
const toDoItemTemplate = (item) => {
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
    </div>`

}

// it initialize the project
const init = () => {
    setModalTemp('لطفا میزان اولویت را انتخاب کنید.', setPriorityTemplate) // this method came from ../Components/Modal/modal.js
    addBtn()
}

init()
