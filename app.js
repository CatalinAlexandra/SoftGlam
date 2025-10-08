window.addEventListener('DOMContentLoaded', displayProducts);

const URL = 'https://68e4f6248e116898997dc299.mockapi.io/services';

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
      if (!container) {
        console.error('Missing .services-container element in HTML');
        return;
      }

      container.innerHTML = products
        .map(
          (product) => `
          <div class="product-card">
            <img src="${product.imageURL}" alt="${product.name}" />
            <div class="service-info">
              <h3>${product.name}</h3>
              <div class="price">${product.price} RON</div>
              <div class="buttons">
                <button class="description-btn">Description</button>
                <button class="cart-btn">Add to cart</button>
              </div>
            </div>
          </div>
        `
        )
        .join('');
    });
}
