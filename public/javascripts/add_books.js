
const addBookButton = document.querySelector('#addBook');
const bookModal = new bootstrap.Modal(document.getElementById('addBookModal'), {});
const submitBookButton = document.querySelector('#submit-book');

addBookButton.addEventListener('click', function() {
    clearModal();
    bookModal.show();
});

//book modal fields
let titleField = document.querySelector("#title");
let authorField = document.querySelector("#author");
let genreField = document.querySelector("#genre");
let raterField = document.querySelector("#rating");
let ownCopy = document.querySelector("#ownit");

function clearModal() {
    titleField.value = "";
    authorField.value = "";
    genreField.value = "none";
    raterField.value = "none";
    ownCopy.checked = false;
    
    titleField.parentElement.classList.remove('error');
    authorField.parentElement.classList.remove('error');
    genreField.parentElement.classList.remove('error');
    raterField.parentElement.classList.remove('error');
  }
