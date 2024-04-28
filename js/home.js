//create product detail modal
const productDetailModal = document.createElement("div");
productDetailModal.classList.add("modal", "fade");
productDetailModal.id = "productDetailModal";
productDetailModal.tabIndex = "-2";
productDetailModal.setAttribute("aria-labelledby", "productDetailModalLabel");
productDetailModal.setAttribute("aria-hidden", "true");
productDetailModal.setAttribute("data-bs-backdrop", "static");
productDetailModal.setAttribute("data-bs-keyboard", "false");
document.body.appendChild(productDetailModal);

//add product to cart
const addProductsToCart = (product) => {
  // get previous product
  let cartProducts = [];
  const previousProduct = JSON.parse(localStorage.getItem("cartProduct"));
  if (previousProduct) cartProducts = [...previousProduct];

  product.count = 1;
  // add new products and store
  cartProducts.unshift(product);
  localStorage.setItem("cartProduct", JSON.stringify(cartProducts));
};

// product detail for each products
const shoProductDetailModal = (product) => {
  const productsFormCart = JSON.parse(localStorage.getItem("cartProduct"));
  const isSelected = productsFormCart
    ? productsFormCart.filter((item) => item.id === product.id)
    : [];
  productDetailModal.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="productDetailModalLabel">Detail</h1>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
        <div class="container-fluid">
        <div class="row" style="height: 100%">
        <div class="col-12 mx-auto">
          <img
            src=${product.image}
            style="height: 300px"
            class="card-img-top object-fit-contain"
            alt="img"
          />
          <p class="card-text text-center fs-5">
            ${product.title}
          </p>
          <hr />
          <div class="d-flex align-items-center fs-5 gap-2">
            <i class="fa-solid text-warning fa-box-open"></i>
            ${product.category}
          </div>
          <div class="fs-5">Description</div>
          <p style="text-align: justify">
            ${product.description}
          </p>
          <hr>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center fs-5 gap-2">
              <i class="fa-solid fa-star text-warning"></i> ${
                product.rating.rate
              }
            </div>
            <div class="btn btn-success ${
              isSelected.length > 0 ? "disabled " : ""
            } " id="addProductToCartBtn" data-bs-dismiss="${
    isSelected.length > 0 ? "" : "modal"
  }" >
            ${isSelected.length > 0 ? "Already selected" : "Add to cart"}
            </div>
            <div class="fs-5 bg-warning px-2 text-dark  rounded ">$ ${
              product.price
            }</div>
          </div>
        </div>
      </div>
        </div>
      </div>
    </div>
  </div>
  `;

  //click event for add-to-cart btn
  const addToCartBtn = document.getElementById("addProductToCartBtn");
  addToCartBtn.addEventListener("click", () => {
    addProductsToCart(product);
  });

  //  call product detail modal functinally, doc in bootstrap
  const modal = new bootstrap.Modal(productDetailModal);
  modal.show();
};

//showing loading
const showLoading = (isLoading) => {
  if (isLoading) {
    const loading = document.createElement("div");
    loading.id = "loading";
    loading.classList.add(
      "w-100",
      "d-flex",
      "vh-100",
      "align-items-center",
      "bg-body-secondary",
      "fixed-top",
      "top-0"
    );
    loading.innerHTML = `
<div class="spinner-border text-primary mx-auto" role="status">
  <span class="visually-hidden">Loading...</span>
</div>
`;
    document.body.append(loading);
  } else {
    const loading = document.getElementById("loading");
    if (loading) {
      loading.remove();
    }
  }
};

//add product to UI
const addProductsToSection = (products) => {
  const productSection = document.getElementById("productSection");

  productSection.innerHTML = "";

  for (let i = 0; i < products.length; i++) {
    const col = document.createElement("div");
    col.classList.add("col-10", "p-3", "col-md-4", "col-lg-3");

    const card = document.createElement("div");
    card.classList.add("card", "h-100");

    const cardFooter = document.createElement("div");
    cardFooter.classList.add("card-footer");

    const viewProductBtn = document.createElement("button");
    viewProductBtn.classList.add("btn", "btn-sm", "btn-primary", "w-100");
    viewProductBtn.textContent = "Detail";
    viewProductBtn.addEventListener("click", () => {
      shoProductDetailModal(products[i]);
    });

    //create cards
    card.innerHTML = `
            <div
              class="card-header d-flex justify-content-between align-items-center"
            >
              <div class="text-muted">$${products[i].price}</div>
              <div class="text-muted">
                ${products[i].rating.rate} <i class="fa-solid fa-star text-warning"></i>
              </div>
            </div>
            <div class="card-body d-flex flex-column gap-2">
              <img
                src=${products[i].image}
                alt="img"
                style="height: 200px"
                class="w-100 object-fit-contain"
              />
              <div class="card-text">${products[i].title}</div>
            </div>
          </div>
  `;

    cardFooter.append(viewProductBtn);
    card.append(cardFooter);
    col.append(card);
    productSection.append(col);
  }
};

// fetch data and show products
const showProducts = async (category = "all") => {
  let baseUrl = "https://fakestoreapi.com";
  switch (category) {
    case "all":
      baseUrl += "/products";
      break;

    default:
      baseUrl += "/products/category/" + category;
      break;
  }
  try {
    showLoading(true);
    // fetch data
    const api = await fetch(baseUrl);
    const data = await api.json();

    if (data) {
      showLoading(false);
    }

    addProductsToSection(data);
  } catch (error) {
    alert(error);
  }
};

//filter the products by categories
const productFilter = document.getElementById("productFilter");
productFilter.addEventListener("change", (e) => {
  showProducts(e.target.value);
});

// call the function on load
window.addEventListener("load", () => {
  showProducts();
});
