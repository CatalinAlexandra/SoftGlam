window.addEventListener('DOMContentLoaded', displayProducts);

const URL = 'https://68e6748f21dd31f22cc5bac6.mockapi.io/service';

function displayProducts() {
  fetch(URL)
    .then((response) => {
      if (response.ok === false) {
        throw new Error('Network error!');
      } else {
        return response.json();
      }
    })
    .then(
      (products) =>
        (document.querySelector('.services-container').innerHTML = products
          .map(
            (product) => `
         <div class="product-card">
				<img
					src=${product.imageURL}
					alt="product image"
				/>
				<div class="services-info">
					<h3>${product.name}</h3>
					<div class="price">${product.price} RON</div>
					<div class="buttons">
						<button class="description-btn">Details</button>
						<button class="cart-btn">Add to Cart</button>
					</div>
				</div>
			</div>   
      `
          )
          .join(''))
    );
}
