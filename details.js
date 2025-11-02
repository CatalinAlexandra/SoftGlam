const searchParams = new URLSearchParams(window.location.search);
const id = searchParams.get('id');

const URL = 'https://68e6748f21dd31f22cc5bac6.mockapi.io/service';

fetch(`${URL}/${id}`)
  .then((response) => response.json())
  .then(
    (product) =>
      (document.querySelector('.details-container').innerHTML =
        product.details || product.description)
  );
