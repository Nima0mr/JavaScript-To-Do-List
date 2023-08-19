"use strict";
const modalTemp = (title, template) => {
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
    </div>`;
};
const setModalTemp = (title, template) => {
    const body = document.querySelector('body');
    if (body) {
        body.innerHTML += modalTemp(title, template);
    }
    document.querySelector('#modal').style.display = 'none';
};
const showModal = () => {
    document.querySelector('#modal').style.display = 'flex';
};
const hideModal = () => {
    document.querySelector('#modal').style.display = 'none';
};
