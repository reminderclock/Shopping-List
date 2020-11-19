// shopping Class: Represents a item
class Item {
    constructor(name, place, cost) {
        this.name = name;
        this.place = place;
        this.cost = cost;
    }
}
// UI Class : Handle UI Tasks
class UI {
    static displayItems() {
        const items = Store.getItems();

        items.forEach((item) => UI.addItemToList(item));
    }

    static addItemToList(item) {
        const list = document.querySelector('#shopping-list');
        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${item.name}</td>
        <td>${item.place}</td>
        <td>${item.cost}</td>
        <td><a href="#" class="btn btn-danger btn-sm 
        delete">❌</a></td>
        `;
        list.appendChild(row);
    }

    static deleteItem(el) {
        if(el.classList.contains('delete')) {
            el.parentElement.parentElement.remove();
        }
    }

    static clearFields() {
        document.querySelector('#name').value='';
        document.querySelector('#place').value='';
        document.querySelector('#cost').value='';
    }
}


// Store Class : Handles Storage
class Store {
    static getItems() {
        let items;
        if(localStorage.getItem('items') === null) {
            items = [];
        } else {
            items = JSON.parse(localStorage.getItem('items'));
        }
        return items;
    }

    static addItem(item) {
        const items =Store.getItems();

        items.push(item);
        localStorage.setItem('items', JSON.stringify(items));
    }

    static removeItem(cost) {
        const items = Store.getItems();

        items.forEach((item, index) => {
            if(item.cost === cost) {
                items.splice(index, 1);
            }
        });

        localStorage.setItem('items', JSON.stringify(items));
    }
}

// Event: Display list
document.addEventListener('DOMContentLoaded', UI.displayItems);

// Event: Add a item
document.querySelector('#shopping-form').addEventListener('submit', (e)=> {
    // prevent actaul submit
    e.preventDefault();

    // Get form values
    const name = document.querySelector('#name').value;
    const place = document.querySelector('#place').value;
    const cost = document.querySelector('#cost').value;

    //Validate
    if(name === '' || place === '' || cost === '') {
        alert('Please fill in all fields');
    }
    else {
        
    // Instatiate item
    const item = new Item(name, place, cost);

    // Add Item to UI
    UI.addItemToList(item);

    // Add Item to store
    Store.addItem(item);

    // Clear fields
    UI.clearFields();
    }
});

// Event: Remove a item
document.querySelector('#shopping-list').addEventListener('click', (e) =>{
    //Remove item from UI
    UI.deleteItem(e.target);

    //Remove item from store
    Store.removeItem
    (e.target.parentElement.previousElementSibling.textContent);
});