// UI vars
const form = document.querySelector('form');
const input = document.querySelector('#txtTaskName');
const btnDeleteAll = document.querySelector('#btnDeleteAll');
const taskList = document.querySelector('#task-list');
let items;

// Load Items
loadItems();

// Call Event Listeners
eventListeners();

function loadItems(){

    items = getItemsFromLS();

    items.forEach(function(item){
        createItem(item);
    });
}

// Get Items From Locale Storage
function getItemsFromLS(){
    if(localStorage.getItem('items')===null){
        items = [];
    }else{
        items = JSON.parse(localStorage.getItem('items'));
    }
    return items;
}

// Set Item to Local Storage
function setItemToLS(text){
    items = getItemsFromLS();
    items.push(text);
    localStorage.setItem('items',JSON.stringify(items));
}

// Delete Item From Local Storage
function deleteItemFromLS(text){
    items = getItemsFromLS();
    items.forEach(function(item,index){
        if(item===text){
            items.splice(index,1);
        }
    });
    localStorage.setItem('items',JSON.stringify(items));
}

function createItem(text){
    
    // Create li
    const li = document.createElement('li');
    li.className = 'list-group-item list-group-item-secondary';
    li.appendChild(document.createTextNode(text));

    // Create a
    const a = document.createElement('a');
    a.classList = 'delete-item float-right';
    a.setAttribute('href', '#');
    a.innerHTML = '<i class="fas fa-times"></i>';

    // Add a to li
    li.appendChild(a);

    // Add li to ul
    taskList.appendChild(li);
}

function eventListeners() {
    // Submit Event
    form.addEventListener('submit', addNewItem);

    // Delete an Item
    taskList.addEventListener('click', deleteItem);

    // Delete All Items
    btnDeleteAll.addEventListener('click', deleteAllItems);

}

// Add New Item
function addNewItem(e) {
    if (input.value === '') {
        alert('Please Add an Item');
    }

    else{
        // Create Item
        createItem(input.value);

        // Save to Local Storage
        setItemToLS(input.value);

        // Clear Input
        input.value = '';
    }



    e.preventDefault();
}

// Delete Item
function deleteItem(e) {

    if (e.target.className === 'fas fa-times') {
        if (confirm('Are you sure?')) {
            e.target.parentElement.parentElement.remove();

            // Delete Item From Local Storage
            deleteItemFromLS(e.target.parentElement.parentElement.textContent);
        }
    }
    e.preventDefault();
}

// Delete All Items
function deleteAllItems(e) {

    if (confirm('Are you sure?')) {
        // taskList.innerHTML=''; // An alternative way

        while(taskList.firstChild){
            taskList.removeChild(taskList.firstChild);
        }

        localStorage.clear();
    }
    // shift + alt + f = emmet
    e.preventDefault();
}