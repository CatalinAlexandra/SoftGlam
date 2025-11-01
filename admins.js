window.addEventListener('DOMContentLoaded', renderTable);

const URL = 'https://68e6748f21dd31f22cc5bac6.mockapi.io/service';

const tableBody = document.querySelector('#services-table tbody');
const addOrEditBtn = document.querySelector('#add-or-edit-btn');
let isEditMode = false;
let productId;

const nameInput = document.getElementById('name');
const priceInput = document.getElementById('price');
const imageURLInput = document.getElementById('imageURL');
const detailsInput = document.getElementById('details');

function renderTable() {
  fetch(URL)
    .then((response) => response.json())
    .then((services) => {
      tableBody.innerHTML = services
        .map(
          (service, index) =>
            `
            <tr data-id=${service.id}>
               <td>${index + 1}</td>
               <td class="cell-img">
                  <img src=${service.imageURL} />
               </td>
               <td class="cell-name">
                  ${service.name}
               </td>
               <td class="cell-price">
                  ${service.price}
               </td>
               <td>
                  <div class="actions">
                     <button class="btn edit" data-action="edit">
                        <i class="fa-solid fa-pen-to-square"></i>
                     </button>
                     <button class="btn delete" data-action="delete">
                        <i class="fa-solid fa-trash"></i>
                     </button>
                  </div>
               </td>
            </tr>
            `
        )
        .join('');
    });
}

addOrEditBtn.addEventListener('click', addOrEditNewProduct);

function addOrEditNewProduct(e) {
  e.preventDefault();
  const name = nameInput.value;
  const price = priceInput.value;
  const imageURL = imageURLInput.value;
  const details = detailsInput.value;

  const newProduct = {
    name: name,
    price: price,
    imageURL: imageURL,
    details: description,
  };

  const method = isEditMode ? 'PUT' : 'POST';
  const newUrl = isEditMode ? `${URL}/${productId}` : URL;

  fetch(newUrl, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(newProduct),
  }).then((response) => {
    renderTable();
    resetForm();
  });
}

function resetForm() {
  nameInput.value = '';
  priceInput.value = '';
  imageURLInput.value = '';
  detailsInput.value = '';

  if (isEditMode) {
    isEditMode = false;
    addOrEditBtn.innerHTML = 'Add product';
  }
}

tableBody.addEventListener('click', handleActions);
function handleActions(e) {
  const clickedElement = e.target;
  if (clickedElement.parentElement.classList.contains('edit')) {
    productId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productId}`)
      .then((response) => response.json())
      .then((product) => {
        console.log(product);
        nameInput.value = product.name;
        priceInput.value = product.price;
        imageURLInput.value = product.imageURL;
        destailsInput.value = product.details;
      });
    isEditMode = true;
    console.log(addOrEditBtn, isEditMode);
    addOrEditBtn.innerHTML = 'Save';
  } else if (clickedElement.parentElement.classList.contains('delete')) {
    productId = getTableRow(clickedElement).dataset.id;
    fetch(`${URL}/${productId}`, {
      method: 'DELETE',
    }).then((response) => renderTable());
  }
}

function getTableRow(editIcon) {
  return editIcon.parentElement.parentElement.parentElement.parentElement;
}
