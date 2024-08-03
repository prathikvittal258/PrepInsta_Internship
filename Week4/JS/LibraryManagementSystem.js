document.addEventListener('DOMContentLoaded', () => {
    const bookForm = document.getElementById('book-form');
    const titleInput = document.getElementById('title');
    const authorInput = document.getElementById('author');
    const pagesInput = document.getElementById('pages');
    const genreInput = document.getElementById('genre');
    const addBookButton = document.getElementById('add-book');
    const cancelUpdateButton = document.getElementById('cancel-update');
    const bookList = document.getElementById('book-list');
    const searchInput = document.getElementById('search');
    let editIndex = -1;

    // Random book generator function
    function getRandomBook() {
        const titles = [
            'The Great Gatsby', 'To Kill a Mockingbird', '1984', 'Moby-Dick', 'Pride and Prejudice',
            'The Catcher in the Rye', 'The Hobbit', 'Fahrenheit 451', 'Brave New World', 'Little Women',
            'The Lord of the Rings', 'Jane Eyre', 'Wuthering Heights', 'The Odyssey', 'Catch-22',
            'The Alchemist', 'The Divine Comedy', 'One Hundred Years of Solitude', 'The Iliad', 'Don Quixote',
            'Crime and Punishment', 'The Picture of Dorian Gray', 'Frankenstein', 'Dracula', 'Les Misérables'
        ];
        const authors = [
            'F. Scott Fitzgerald', 'Harper Lee', 'George Orwell', 'Herman Melville', 'Jane Austen',
            'J.D. Salinger', 'J.R.R. Tolkien', 'Ray Bradbury', 'Aldous Huxley', 'Louisa May Alcott',
            'J.R.R. Tolkien', 'Charlotte Brontë', 'Emily Brontë', 'Homer', 'Joseph Heller',
            'Paulo Coelho', 'Dante Alighieri', 'Gabriel Garcia Marquez', 'Homer', 'Miguel de Cervantes',
            'Fyodor Dostoevsky', 'Oscar Wilde', 'Mary Shelley', 'Bram Stoker', 'Victor Hugo'
        ];
        const genres = [
            'Fiction', 'Dystopian', 'Adventure', 'Romance', 'Science Fiction', 'Fantasy', 'Classic',
            'Drama', 'Historical', 'Mystery', 'Epic', 'Gothic', 'Philosophical', 'Mythology', 'Satire',
            'Literary Fiction', 'Poetry', 'Historical Fiction', 'Thriller', 'Science Fantasy'
        ];

        const randomTitle = titles[Math.floor(Math.random() * titles.length)];
        const randomAuthor = authors[Math.floor(Math.random() * authors.length)];
        const randomPages = Math.floor(Math.random() * (800 - 100 + 1)) + 100; // Random pages between 100 and 800
        const randomGenre = genres[Math.floor(Math.random() * genres.length)];

        return { title: randomTitle, author: randomAuthor, pages: randomPages, genre: randomGenre };
    }

    function renderBooks(books) {
        bookList.innerHTML = `
        <div class="header">
          <div>Title</div>
          <div>Author</div>
          <div>Pages</div>
          <div>Genre</div>
          <div>Actions</div>
        </div>
      `;
        books.forEach((book, index) => {
            const row = document.createElement('div');
            row.classList.add('book-row');
            row.innerHTML = `
          <div class="book-cell">${book.title}</div>
          <div class="book-cell">${book.author}</div>
          <div class="book-cell">${book.pages}</div>
          <div class="book-cell">${book.genre}</div>
          <div class="book-cell buttons">
            <button class="update" data-index="${index}">Update</button>
            <button class="delete" data-index="${index}">Delete</button>
          </div>
        `;
            bookList.appendChild(row);
        });
    }

    function updateBook(index) {
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const book = books[index];
        titleInput.value = book.title;
        authorInput.value = book.author;
        pagesInput.value = book.pages;
        genreInput.value = book.genre;
        addBookButton.textContent = 'Update Book';
        cancelUpdateButton.style.display = 'inline-block'; // Show cancel button
        editIndex = index;
    }

    function deleteBook(index) {
        let books = JSON.parse(localStorage.getItem('books')) || [];
        books.splice(index, 1);
        localStorage.setItem('books', JSON.stringify(books));
        renderBooks(books);
    }

    function searchBooks() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        const books = JSON.parse(localStorage.getItem('books')) || [];
        const filteredBooks = books.filter(book => book.title.toLowerCase().includes(searchTerm));
        renderBooks(filteredBooks);
    }

    bookForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const pages = pagesInput.value.trim();
        const genre = genreInput.value.trim();
        if (title && author && pages && genre) {
            let books = JSON.parse(localStorage.getItem('books')) || [];
            if (editIndex > -1) {
                books[editIndex] = { title, author, pages, genre };
                editIndex = -1;
                addBookButton.textContent = 'Add Book';
                cancelUpdateButton.style.display = 'none'; // Hide cancel button
            } else {
                books.push({ title, author, pages, genre });
            }
            localStorage.setItem('books', JSON.stringify(books));
            renderBooks(books);
            bookForm.reset();
        }
    });

    bookList.addEventListener('click', (event) => {
        if (event.target.classList.contains('update')) {
            updateBook(event.target.getAttribute('data-index'));
        } else if (event.target.classList.contains('delete')) {
            deleteBook(event.target.getAttribute('data-index'));
        }
    });

    searchInput.addEventListener('input', searchBooks);

    cancelUpdateButton.addEventListener('click', () => {
        bookForm.reset();
        addBookButton.textContent = 'Add Book';
        cancelUpdateButton.style.display = 'none'; // Hide cancel button
        editIndex = -1;
    });

    // Initialize with random books
    if (!localStorage.getItem('books')) {
        const initialBooks = Array.from({ length: 5 }, () => getRandomBook()); // Generate 5 random books
        localStorage.setItem('books', JSON.stringify(initialBooks));
    }
    renderBooks(JSON.parse(localStorage.getItem('books')));
});
