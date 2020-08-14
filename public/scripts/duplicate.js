const $ = document.querySelector.bind(document);

const button = $('#add-time');
const table = $('#schedule-field');
const section = $('#schedule');

button.addEventListener('click', () => {
    const clone = section.cloneNode(true);

    const reset = clone.querySelectorAll('input');

    reset.forEach((i) => {
        i.value = '';

    })

    table.appendChild(clone);

});