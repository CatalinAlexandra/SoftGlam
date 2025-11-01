let cart = JSON.parse(localStorage.getItem('cart')) || {};

document.addEventListener('DOMContentLoaded', () => {
  showCart();
  updateCartCount();
});

function showCart() {
  const cartContainer = document.querySelector('.cart-container');
  const totalPriceContainer = document.querySelector('.total-price-container');

  cartContainer.innerHTML = '';
  totalPriceContainer.innerHTML = '';

  let total = 0;
  let totalItems = 0;

  const ids = Object.keys(cart);
  if (ids.length === 0) {
    cartContainer.innerHTML = `<p class="empty-cart">🛒 Your cart is empty</p>`;
    return;
  }

  ids.forEach((id) => {
    const item = cart[id];
    total += item.price * item.quantity;
    totalItems += item.quantity;

    cartContainer.innerHTML += `
      <div class="cart-item">
        <img src="${item.image}" alt="${item.name}">
        <div class="item-details">
          <h4>${item.name}</h4>
          <p>${item.price.toFixed(2)} RON</p>
          <label>
            Reservation Date:
            <input type="date" class="reservation-date" data-id="${id}" value="${
      item.date || ''
    }">
          </label>
        </div>
        <div class="item-quantity">
          <button class="decrease" data-id="${id}">−</button>
          <span>${item.quantity}</span>
          <button class="increase" data-id="${id}">+</button>
        </div>
        <div class="item-total">${(item.price * item.quantity).toFixed(
          2
        )} lei</div>
        <button class="delete" data-id="${id}"><i class="fa-solid fa-trash"></i></button>
      </div>
    `;
  });

  totalPriceContainer.innerHTML = `
  <div class="cart-summary">
    <span>Total: <strong>${total.toFixed(2)} lei</strong></span>
    <div class="buttons-container">
      <button class="clear-cart">Clear Cart</button>
      <button class="confirm-reservation">Confirm Reservation</button>
    </div>
  </div>
`;
  updateCartCount();

  cartContainer
    .querySelectorAll('.increase')
    .forEach((btn) => btn.addEventListener('click', changeQuantity));
  cartContainer
    .querySelectorAll('.decrease')
    .forEach((btn) => btn.addEventListener('click', changeQuantity));

  cartContainer
    .querySelectorAll('.delete')
    .forEach((btn) => btn.addEventListener('click', deleteItem));

  cartContainer.querySelectorAll('.reservation-date').forEach((input) => {
    input.addEventListener('change', (e) => {
      const id = e.target.dataset.id;
      cart[id].date = e.target.value;
      localStorage.setItem('cart', JSON.stringify(cart));
    });
  });

  document.querySelector('.clear-cart')?.addEventListener('click', clearCart);

  document
    .querySelector('.confirm-reservation')
    ?.addEventListener('click', () => {
      const reservationInfo = Object.values(cart)
        .map(
          (item) =>
            `${item.name} - ${item.quantity}x - ${
              item.date || 'No date chosen'
            }`
        )
        .join('\n');
      if (reservationInfo === '') {
        alert('Your cart is empty!');
      } else {
        alert('Reservation confirmed:\n' + reservationInfo);
      }
    });
}

function changeQuantity(e) {
  const id = e.target.dataset.id;
  if (e.target.classList.contains('increase')) {
    cart[id].quantity++;
  } else if (e.target.classList.contains('decrease')) {
    cart[id].quantity--;
    if (cart[id].quantity <= 0) delete cart[id];
  }
  saveAndRender();
}

function deleteItem(e) {
  const id = e.target.closest('button').dataset.id;
  delete cart[id];
  saveAndRender();
}

function clearCart() {
  cart = {};
  saveAndRender();
}

function saveAndRender() {
  localStorage.setItem('cart', JSON.stringify(cart));
  showCart();
}

function updateCartCount() {
  const cartCount = document.getElementById('cart-count');
  const count = Object.values(cart).reduce((sum, i) => sum + i.quantity, 0);
  cartCount.textContent = count;
}
