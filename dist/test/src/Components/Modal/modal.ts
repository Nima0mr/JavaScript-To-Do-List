const modalTemp = (title: string, template: () => string): string => {
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

const setModalTemp = (title: string, template: () => string): void => {
    const body = document.querySelector('body')
    if(body) {
        body.innerHTML += modalTemp(title, template);
    }
    (<HTMLElement>document.querySelector('#modal')).style.display = 'none';
};

const showModal = (): void => {
    (<HTMLElement>document.querySelector('#modal')).style.display = 'flex';
};

const hideModal = (): void => {
    (<HTMLElement>document.querySelector('#modal')).style.display = 'none';
};
