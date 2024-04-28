const cartModal = document.createElement("div");
cartModal.classList.add("modal", "fade");
cartModal.id = "productCart";
cartModal.setAttribute("data-bs-backdrop", "static");
cartModal.setAttribute("data-bs-keyboard", "false");
cartModal.setAttribute("tabindex", "-1");
cartModal.setAttribute("aria-labelledby", "productCartLabel");
cartModal.setAttribute("aria-hidden", "true");

//card modal
cartModal.innerHTML = `
   <div class="modal-dialog modal-lg modal-dialog-scrollable">
     <div class="modal-content">
       <div class="modal-header">
         <h1 class="modal-title fs-5 d-flex align-items-center gap-2" id="productCartLabel">
         <img
            src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png"
            alt="logo"
            style="height: 45px"
          />
         Your Cart</h1>
         <button type="button" id="cartCloseModalBtn" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
       </div>
       <div class="modal-body">
         <div class="container-fluid">
          <div class="row gap-1" id="productCartList">
          </div>
         </div>
       </div>
       <div class="modal-footer justify-content-center">
         <button type="button" class="btn btn-primary btn-lg w-75" data-bs-dismiss="modal" id="continueToParchase">Continue</button>
       </div>
     </div>
   </div>
`;

// open modal btn from sidebar icon
const productCartSidebarBtn = document.getElementById("productCartSidebarBtn");
productCartSidebarBtn.addEventListener("click", () => {
  const modal = new bootstrap.Modal(cartModal);
  modal.show();

  if (!localStorage.getItem("cartProduct")) {
    // disabled continue
    const continueToParchaseBtn = document.getElementById("continueToParchase");
    continueToParchaseBtn.classList.add("disabled");

    cartModal.querySelector("#productCartList").innerHTML =
      "<h3 class='text-center text-muted'> No Product Selected</h3> ";
    //show muted text for no product
    // alertForNoProductMessage();
    return;
  }

  const productListContainerFromCart =
    document.getElementById("productCartList");

  // clear existing data and update UI
  productListContainerFromCart.innerHTML = "";

  //show muted text for no product
  const alertForNoProductMessage = () => {
    const alertText = document.createElement("h3");
    alertText.classList.add("text-center", "text-muted");
    alertText.textContent = "No Product selected";
    productListContainerFromCart.append(alertText);
  };

  // get data
  const productFromCart = JSON.parse(localStorage.getItem("cartProduct"));
  console.log(productFromCart);

  if (productFromCart.length > 0) {
    // enable continue
    const continueToParchaseBtn = document.getElementById("continueToParchase");
    continueToParchaseBtn.classList.remove("disabled");

    //add data in modal body
    productFromCart.forEach((product) => {
      const card = document.createElement("div");
      card.classList.add("col-12");

      product.priceOnCount = product.price;

      card.innerHTML = `
        <div class="card h-100 ">
          <div class="card-body">
            <div class="row">
                <div class="col-12 col-lg-6">
                  <img
                    src="${product.image}"
                    alt="img"
                    class="card-img object-fit-contain"
                    style="height: 200px"
                   />
                </div>
                <div class="col-12 col-lg-6">
                    <div class="d-flex flex-column justify-content-between gap-2">
                        <div class="fs-5">${product.title}</div>
                        <div class="d-flex flex-column">
                            <div class="fs-5">-- Price $${product.price} --</div>
                            <div class="fs-5 item-price">-- Price * Item = $${product.price} --</div>
                        </div>
                        <div class="btn-group">
                            <button class="btn btn-warning increase">+</button>
                            <button class="btn btn-outline-warning item-count">Item ${product.count}</button>
                            <button class="btn btn-warning decrease">-</button>
                        </div>
                         <small class="text-danger reduce-alert"></small>
                         <div class="btn btn-danger remove">remove from cart</div>
                    </div>
                </div>
            </div>
          </div>
        </div>
      `;

      // increase product and price base on count
      const increaseBtn = card.querySelector(".increase");
      increaseBtn.addEventListener("click", () => {
        card.querySelector(".reduce-alert").textContent = "";

        card.querySelector(".item-count").textContent =
          "Item " + ++product.count;

        card.querySelector(".item-price").textContent =
          "-- Price * Item = $" +
          (product.price * product.count).toFixed(2) +
          " --";

        // add priceOnCount to product obj
        product.priceOnCount = (product.count * product.price).toFixed(2);

        //store update data
        localStorage.setItem(
          "SelectedProducts",
          JSON.stringify(productFromCart)
        );
        console.log(productFromCart);
      });

      // reduce product and price base on count
      const decreaseBtn = card.querySelector(".decrease");
      decreaseBtn.addEventListener("click", () => {
        card.querySelector(".reduce-alert").textContent = "";

        if (product.count <= 1) {
          card.querySelector(".reduce-alert").textContent =
            "Cannot reduce, Do you want to remove?";
          return;
        }

        card.querySelector(".item-count").textContent =
          "Item " + --product.count;

        card.querySelector(".item-price").textContent =
          "-- Price * Item = $" +
          (product.price * product.count).toFixed(2) +
          " --";

        // update product obj
        product.priceOnCount = (product.priceOnCount - product.price).toFixed(
          2
        );

        //store update data
        localStorage.setItem(
          "SelectedProducts",
          JSON.stringify(productFromCart)
        );
        console.log(productFromCart);
      });

      //remove product from cart
      const removeBtn = card.querySelector(".remove");
      removeBtn.addEventListener("click", () => {
        const updateProducts = JSON.parse(
          localStorage.getItem("cartProduct")
        ).filter((item) => {
          return item.id !== product.id;
        });

        // update storage
        localStorage.setItem("cartProduct", JSON.stringify(updateProducts));
        card.remove();

        // update selectedProduct
        const updateSelectedProduct = JSON.parse(
          localStorage.getItem("SelectedProducts")
        ).filter((item) => {
          return item.id !== product.id;
        });

        // update storage
        localStorage.setItem(
          "SelectedProducts",
          JSON.stringify(updateSelectedProduct)
        );

        if (JSON.parse(localStorage.getItem("cartProduct")).length < 1) {
          continueToParchaseBtn.classList.add("disabled");

          //show muted text for no product
          alertForNoProductMessage();
          return;
        }
      });

      productListContainerFromCart.append(card);
    });

    // continueToParchaseBtn.addEventListener("click", () => {
    //   localStorage.setItem("SelectedProducts", JSON.stringify(productFromCart));
    // });

    // set selected products in locastorage
    localStorage.setItem("SelectedProducts", JSON.stringify(productFromCart));
  } else {
    // disabled continue
    const continueToParchaseBtn = document.getElementById("continueToParchase");
    continueToParchaseBtn.classList.add("disabled");

    //show muted text for no product
    alertForNoProductMessage();
  }

  //close cart modal and remove selected products
  const cartCloseModalBtn = document.getElementById("cartCloseModalBtn");
  cartCloseModalBtn.addEventListener("click", () => {
    localStorage.removeItem("SelectedProducts");
  });
});

document.body.append(cartModal);
