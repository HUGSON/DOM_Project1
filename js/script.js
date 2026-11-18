const productList = document.querySelector(".list-products");
const totalDisplay = document.querySelector(".total");

function updateTotal() {
  const total = [...productList.querySelectorAll(".product-item")].reduce(
    (sum, product) => {
      const quantity = Number(product.querySelector(".quantity").textContent);
      const priceText = product.querySelector(".unit-price").textContent;
      const price = Number(priceText.replace(/[^\d.]/g, ""));

      return sum + quantity * price;
    },
    0
  );

  totalDisplay.textContent = `${total} $`;
}

productList.addEventListener("click", (event) => {
  if (!(event.target instanceof Element)) {
    return;
  }

  const button = event.target.closest(".cart-action");
  if (!button) {
    return;
  }

  const product = button.closest(".product-item");
  if (!product) {
    return;
  }

  if (button.classList.contains("like-action")) {
    const liked = button.classList.toggle("is-liked");
    button.setAttribute("aria-pressed", String(liked));
    return;
  }

  if (button.querySelector(".fa-trash-alt")) {
    product.remove();
    updateTotal();
    return;
  }

  const quantityDisplay = product.querySelector(".quantity");
  const quantity = Number(quantityDisplay.textContent);

  if (button.querySelector(".fa-plus-circle")) {
    quantityDisplay.textContent = String(quantity + 1);
  } else if (button.querySelector(".fa-minus-circle")) {
    quantityDisplay.textContent = String(Math.max(0, quantity - 1));
  }

  updateTotal();
});

updateTotal();
