const bookModal = new bootstrap.Modal(document.getElementById('addBookModal'), {});
const submitBookButton = document.querySelector('#submit-book');

// wait for items like "add book" button and "view comments" link to exist in DOM so that we can set event listeners
function waitForElement(selector) {
  return new Promise(resolve => {
      if (document.querySelector(selector)) {
          return resolve(document.querySelector(selector));
      }

      const observer = new MutationObserver(mutations => {
          if (document.querySelector(selector)) {
              resolve(document.querySelector(selector));
              observer.disconnect();
          }
      });

      observer.observe(document.body, {
          childList: true,
          subtree: true
      });
  });
}

waitForElement('#addBook').then((elem) => {
  elem.addEventListener('click', function() {
    clearModal();
    bookModal.show();
  })
});

//Add NEW book modal fields
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
    comments.value = "";
    
    titleField.parentElement.classList.remove('error');
    authorField.parentElement.classList.remove('error');
    genreField.parentElement.classList.remove('error');
    raterField.parentElement.classList.remove('error');
  }

let modalFooter = document.querySelector('.add-book-modal-footer');
submitBookButton.addEventListener('click', function(e) {
    if (validateNew() == true) {
        let p = document.createElement('p');
        p.textContent = "Woohoo! Saving your book! One sec...";
        p.style.color = 'green';
        modalFooter.appendChild(p);
    }
  })

  function setErrorFor(input, message) {
    let formControl = input.parentElement;
    formControl.className = "mb-2 error";
    let small = formControl.querySelector("small");
    small.innerHTML = message;
  }
  
const validateNew = () => {
  console.log("validating")
    if (titleField.value.trim() === "" ||
        authorField.value.trim() === "" ||
        genreField.value === "none" ||
        raterField.value === "none") {
          if (titleField.value.trim() === "") {
            setErrorFor(titleField, "Title can't be blank");
          }
          if (authorField.value.trim() === "") {
            setErrorFor(authorField, "Give the writer some credit here");
          }
          if (genreField.value === "") {
            setErrorFor(genreField, "Genres are hard, but give it your best shot");
          }
          if (raterField.value === "") {
            setErrorFor(raterField, "Go with your gut");
        }
        return false;
    }
    else return true;
  }


//EDIT book modal fields
const editBook = document.querySelector('#submit-book-edit');

let editModalFooter = document.querySelector('.edit-book-modal-footer');

let editTitleField = document.querySelector("#title-edit");
let editAuthorField = document.querySelector("#author-edit");
let editGenreField = document.querySelector("#genre-edit");
let editRaterField = document.querySelector("#rating-edit");
let editOwnCopy = document.querySelector("#ownit-edit");

editBook.addEventListener('click', function() {
  if (validateEdit() == true) {
      let p = document.createElement('p');
      p.textContent = "Woohoo! Saving your book! One sec...";
      p.style.color = 'green';
      editModalFooter.appendChild(p);
  }
})

const validateEdit = () => {
  console.log("validating")
    if (editTitleField.value.trim() === "" ||
        editAuthorField.value.trim() === "" ||
        editGenreField.value === "none" ||
        editRaterField.value === "none") {
          if (editTitleField.value.trim() === "") {
            setErrorFor(editTitleField, "Title can't be blank");
          }
          if (editAuthorField.value.trim() === "") {
            setErrorFor(editAuthorField, "Give the writer some credit here");
          }
          if (editGenreField.value === "") {
            setErrorFor(editGenreField, "Genres are hard, but give it your best shot");
          }
          if (editRaterField.value === "") {
            setErrorFor(editRaterField, "Go with your gut");
        }
        return false;
    }
    else return true;
  }