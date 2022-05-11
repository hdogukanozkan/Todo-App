/* vars */

const form = document.querySelector('form')
const input = document.querySelector('#txtTaskName')
const btnDeleteAll = document.querySelector('#btnDeleteAll')
const taskList = document.querySelector('#task-list')
var items;


loadsItems();
eventListeners();

function loadsItems() {
    items = JSON.parse(localStorage.getItem('itemler')) || [];
}

items.forEach(element => {
    createE(element)
});

function eventListeners() {
    form.addEventListener('submit', addNewItem);
    btnDeleteAll.addEventListener('click', deleteAll);
    taskList.addEventListener('click', deleteUrun);
}





function createE(e) {
    //create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';

    //create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    //add a to li
    li.appendChild(a);
    li.appendChild(document.createTextNode(e));

    //add li to ul
    taskList.appendChild(li);
}

function addNewItem(e) {

    if (input.value === '') {
        alert('add new item please...')
    }
    else {
        console.log('hata yok 1')
        createE(input.value);
        console.log('hata yok 2')

        items.push(input.value);

        localStorage.setItem('itemler', JSON.stringify(items));
    }


    e.preventDefault();
    input.value = '';


}


function deleteAll(e) {

    if (confirm('Emin misin hepsi gidiyor bak son kararın mı?')) {
        for (var index = 0; index < taskList.children.length; index + 1) {
            taskList.children[index].remove();
        }
        localStorage.removeItem('itemler');
        items = [];
    }

    e.preventDefault();
}

function deleteUrun(e) {
    if (e.target.className === 'fas fa-times') {
        e.target.parentElement.parentElement.remove();
    }

    items = JSON.parse(localStorage.getItem('itemler'));

    items.forEach(function (element, index) {
        if (e.target.parentElement.parentElement.textContent === element) {
            items.splice(index, 1);
        }
        localStorage.setItem('itemler', JSON.stringify(items))

    });

    e.preventDefault();
}