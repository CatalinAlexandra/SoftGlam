window.addEventListener('DOMContentLoaded', displayProducts);

const URL = 'https://68e6748f21dd31f22cc5bac6.mockapi.io/service';

function displayProducts() {
  fetch(URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network error!');
      }
      return response.json();
    })
    .then((products) => {
      const container = document.querySelector('.services-container');
      container.innerHTML = products
        .map(
          (product) => `
            <div class="product-card">
              <img src="${product.imageURL}" alt="product image" />
              <div class="services-info">
                <h3>${product.name}</h3>
                <div class="price">${product.price} RON</div>
                <div class="buttons">
                  <button class="description-btn">Details</button>
                  <button 
                    class="cart-btn" 
                    data-id="${product.id}" 
                    data-name="${product.name}" 
                    data-price="${product.price}" 
                    data-image="${product.imageURL}">
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          `
        )
        .join('');

      // Attach event listeners after rendering
      addCartButtonListeners();
    })
    .catch((err) => console.error(err));
}

function addCartButtonListeners() {
  const buttons = document.querySelectorAll('.cart-btn');
  buttons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const id = btn.dataset.id;
      const name = btn.dataset.name;
      const price = parseFloat(btn.dataset.price);
      const image = btn.dataset.image;

      let cart = JSON.parse(localStorage.getItem('cart')) || {};

      if (cart[id]) {
        cart[id].quantity++;
      } else {
        cart[id] = { name, price, image, quantity: 1 };
      }

      localStorage.setItem('cart', JSON.stringify(cart));

      updateCartCount(cart);
    });
  });
}

function updateCartCount(cart) {
  const count = Object.values(cart).reduce(
    (sum, item) => sum + item.quantity,
    0
  );
  document.getElementById('cart-count').textContent = count;
}

// On load, show count from localStorage
document.addEventListener('DOMContentLoaded', () => {
  const savedCart = JSON.parse(localStorage.getItem('cart')) || {};
  updateCartCount(savedCart);
});
