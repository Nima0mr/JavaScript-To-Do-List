let mode = 'add'

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
    renderToDoList()
    id++
    saveListOnLocalStorage()
}

const askPriority = () => {
    if (mode === 'add' && isAddInputEmpty()) {
        alert('Please fill your task.')
        return
    }
    showModal()
}

const isAddInputEmpty = () => {
    inputVal = document.getElementById('add-input').value
    return inputVal.trim() === ''
}

const setPriority = () => {
    setModalTemp('لطفا میزان اولویت را انتخاب کنید.', setPriorityTemplate)
    document.querySelector('#priority-1').addEventListener('click', () => priorityEvent({id: 1, title: 'High'}))
    document.querySelector('#priority-2').addEventListener('click', () => priorityEvent({id: 2, title: 'Medium'}))
    document.querySelector('#priority-3').addEventListener('click', () => priorityEvent({id: 3, title: 'Low'}))
}

const priorityEvent = (priority) => {
    if (mode === 'add') {
        addToDo(priority)
        document.getElementById('add-input').value = ''
    } else if (mode === 'edit') {
        toDoArray[toDoArray.findIndex(({id}) => id === selectedId)].priority = priority
        document.getElementById(`edit-priority-${selectedId}`).classList.remove(`priority-1`)
        document.getElementById(`edit-priority-${selectedId}`).classList.remove(`priority-2`)
        document.getElementById(`edit-priority-${selectedId}`).classList.remove(`priority-3`)
        document.getElementById(`edit-priority-${selectedId}`).classList.add(`priority-${priority.id}`)
    }
    hideModal()
}

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

const saveListOnLocalStorage = () => {
    localStorage.setItem('list', JSON.stringify(toDoArray))
    localStorage.setItem('id', JSON.stringify(id))
}

const getListOnLocalStorage = () => {
    let a = localStorage.getItem('list')
    a = JSON.parse(a)
    if (a === null) {
        a = []
    }
    return a
}

const getIdOnLocalStorage = () => {
    let a = localStorage.getItem('id')
    a = JSON.parse(a)
    if (a === null) {
        a = 1
    }
    return a
}

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

const renderToDoList = () => {
    renderList()
    renderEvents()
}

const renderList = () => {
    document.getElementById('main').innerHTML = ''
    toDoArray.sort((a,b) => (a.priority.id > b.priority.id) ? 1 : ((b.priority.id > a.priority.id) ? -1 : 0))
    toDoArray.forEach(item => {
        document.querySelector('#main').innerHTML += toDoItemTemplate(item)
    })
}

const renderEvents = () => {
    toDoArray.forEach(item => {
        setEvents(item)
    })
}

const setEvents = (item) => {
    document.getElementById(`check-${item.id}`).addEventListener('click', () => checkItem(item.id))
    document.getElementById(`edit-${item.id}`).addEventListener('click', () =>  editItem(item.id, item.text, item.priority))
    document.getElementById(`delete-${item.id}`).addEventListener('click', () =>  deleteItem(item.id))
    if (item.isChecked) {
        document.getElementById(`text-${item.id}`).classList.add('checked')
        document.getElementById(`item-priority-${item.id}`).classList.add('priority-checked')
        document.getElementById(`check-${item.id}`).classList.add('disabled')
        document.getElementById(`check-${item.id}`).setAttribute('disabled',true)
        document.getElementById(`checked-${item.id}`).innerHTML = 'Checked!'
    }
}

const checkItem = (itemId) => {
    const element = document.getElementById(`text-${itemId}`)
    const btn = document.getElementById(`check-${itemId}`)
    element.classList.add('checked')
    btn.classList.add('disabled')
    document.getElementById(`item-priority-${itemId}`).classList.add('priority-checked')
    btn.setAttribute('disabled',true)
    document.getElementById(`checked-${itemId}`).innerHTML = 'Checked!'
    toDoArray[toDoArray.findIndex(({id}) => id === itemId)].isChecked = true
    saveListOnLocalStorage()
}
const editItem = (itemId, text, priority) => {
    mode = 'edit'
    renderEditTemplate(itemId, text, priority)
}
const deleteItem = (itemId) => {
    toDoArray.splice(toDoArray.findIndex(({id}) => id === itemId), 1)
    saveListOnLocalStorage()
    document.getElementById(`item-${itemId}`).remove()
}

const renderEditTemplate = (itemId, text, priority) => {
    const element = document.getElementById(`item-text-${itemId}`)
    const buttonElement = document.getElementById(`item-buttons-${itemId}`)
    element.innerHTML = `
            <div class="tooltip">
                <div id="edit-priority-${itemId}" class="to-do-priority priority-${priority.id}"></div>
                <span class="tooltiptext">${priority.title}</span>
            </div>
            <input type="text" id="edit-input-${itemId}" class="input" value="${text}">`
    buttonElement.innerHTML = `<button type="button" id="edit-priority" class="change-priority-btn">Change Priority</button>
    <button type="button" id="edit-yes" class="button green"><i class="fa fa-check"></i></button>
    <button type="button" id="edit-no" class="button red"><i class="fa fa-times"></i></button>`
    setEditEvents(itemId)
}

const setEditEvents = (itemId) => {
    document.getElementById(`edit-yes`).addEventListener('click', () => updateToDoItem(itemId))
    document.getElementById(`edit-no`).addEventListener('click', () => {mode = 'add'; renderToDoList()} )
    document.getElementById(`edit-priority`).addEventListener('click', () => {selectedId = itemId; askPriority()})
}

const updateToDoItem = (itemId) => {
    editInputVal = document.getElementById(`edit-input-${itemId}`).value
    toDoArray[toDoArray.findIndex(({id}) => id === itemId)].text = editInputVal
    toDoArray[toDoArray.findIndex(({id}) => id === itemId)].isChecked = false
    saveListOnLocalStorage(itemId, editInputVal)
    mode = 'add'
    renderToDoList()
}


const init = () => {
    toDoArray = getListOnLocalStorage()
    id = getIdOnLocalStorage()
    setPriority()
    renderToDoList()
    addBtn()
}

init()
