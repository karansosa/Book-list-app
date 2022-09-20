// Book Classe: to represent a book 
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

// UI CLass: Handle UI Tasks 

class UI {
    static displayBooks() {
        const StoredBooks = [
            {
                title: 'Book 1',
                author: 'John',
                isbn: '34543545'
            },
            {
                title: 'Book 2',
                author: 'Mark',
                isbn: '32554623'    
            }
        ];

        const books = StoredBooks;

        books.forEach((book) => UI.addBookToList(book));
    }
    static addBookToList(book) {
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');

        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
        `;

        list.appendChild(row);
    }

    // Remove book list entire parent element
    static deleteBook(el){
        if(el.classList.contains('delete')){
            el.parentElement.parentElement.remove();
        }
    } 

    // Show alert 

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`; 
        div.appendChild(document.createTextNode(message)); 
        const container = document.querySelector('.container');
        const form = document.querySelector('#book-form');
        container.insertBefore(div, form); 

        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }

    

    // Clear fields
    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// Store Class: Handles Storage


// Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// Event: Add a Book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    // Prevent actual submit
    e.preventDefault();

    // Get form values
    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value; 

    // Validate form 

    if(title === '' || author=== '' || isbn=== ''){
        UI.showAlert('Please fill all the fields' , 'danger')
    }else{
        // Instatiate book
        const book = new Book(title, author, isbn);

        // Add fields to list on submit
        UI.addBookToList(book);

        // Add success msg
        UI.showAlert('Book added' , 'success')

        // Clear Form fields
        UI.clearFields();
    }
});

// Event: Remove a Book 

document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target) 

    // Add success msg
    UI.showAlert('Book Removed' , 'success')
});
