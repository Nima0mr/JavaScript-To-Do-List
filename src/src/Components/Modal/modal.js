const modalTemp = (title,template) => {
    return `
    <div id="modal" class="modal">
        <section class="modal-section">
          <header class="modal-header">
            <p class="modal-title">${title}</p>
          </header>
          <main class="modal-main">
             ${template()}
          </main>
        </section>
    </div>`
}

const setModalTemp = (title,template) => {
    document.querySelector('body').innerHTML += modalTemp(title,template)
    document.querySelector('#modal').style.display='none'
}

const showModal = () => {
    document.querySelector('#modal').style.display='flex'
}

const endModal = () => {
    document.querySelector('#modal').style.display='none'
}