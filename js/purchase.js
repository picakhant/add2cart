// create a modal
const purchaseModal = document.createElement("div");
purchaseModal.classList.add("modal", "fade");
purchaseModal.id = "purchaseInfo";
purchaseModal.setAttribute("data-bs-backdrop", "static");
purchaseModal.setAttribute("data-bs-keyboard", "false");
purchaseModal.setAttribute("tabindex", "-1");
purchaseModal.setAttribute("aria-labelledby", "productCartLabel");
purchaseModal.setAttribute("aria-hidden", "true");

// purchase info modal
purchaseModal.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="purchaseInfoLabel">
          Your cart
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body" id="purchaseList"></div>
      <h4 id="totalPrice"></h4>
      <div class="modal-footer flex-column ">
      <form class="w-75">
        <div class="mb-3 text-center fs-4">Fill all field</div>
        <div class="mb-3">
          <input type="text" placeholder="Name on credit" class="form-control" />
        </div>
        <div class="mb-3">
          <input
            type="text"
            placeholder="Credit card number"
            class="form-control"
          />
        </div>
        <div class="mb-3">
          <input type="text" placeholder="Expiration" class="form-control" />
        </div>
        <div class="mb-3">
          <input type="text" placeholder="CVV" class="form-control" />
        </div>
      </form>
        <button type="button" id="cancelPurchase" class="btn btn-secondary w-75" data-bs-dismiss="modal">
          Cancel
        </button>
        <button type="button" id="finishPurchase" class="btn btn-primary w-75" data-bs-dismiss="modal">
          Finish
        </button>
      </div>
    </div>
  </div>
`;

document.body.append(purchaseModal);

const modal1 = new bootstrap.Modal(purchaseModal); // purchase modal
const continueBtn = document.getElementById("continueToParchase");

// totla price
const totalPriceTag = document.getElementById("totalPrice");
totalPriceTag.classList.add("text-center");

// user click continue btn
let totalPrice = 0;
continueBtn.addEventListener("click", () => {
  // get selected product which mean the sure products that the user must puchase
  const purcahseProducts = JSON.parse(localStorage.getItem("SelectedProducts"));

  totalPriceTag.innerText = "";

  // get modal body
  const modalBody = document.getElementById("purchaseList");
  modalBody.innerHTML = "";

  purcahseProducts.forEach((item) => {
    const row = document.createElement("row");
    row.classList.add("row", "mb-1", "justify-content-between");

    row.innerHTML = `
      <div class="col-5 bg-body-tertiary p-3 border-dark border-3 border-end ">
        <div class="fs-6">
          ${item.title}
        </div>
      </div>
      <div class="col-2 bg-body-tertiary p-3 border-dark border-3 border-end ">
        <div class="fs-6">
          $${item.price}
        </div>
      </div>
      <div class="col-2 bg-body-tertiary p-3 border-dark border-3 border-end ">
      <div class="fs-6">
          ${item.count} </br> ${item.count > 1 ? "items" : "item"}
      </div>
      </div>
      <div class="col-3 bg-body-tertiary p-3 border-dark border-3 border-end ">
        <div class="fs-6">
          $${item.priceOnCount}
        </div>
      </div>
    `;

    totalPrice += parseFloat(item.priceOnCount);

    modalBody.append(row);
  });

  totalPriceTag.textContent = "Total price $" + totalPrice.toFixed(2);

  // show pruchaseModal && hide cart modal
  modal1.show();
});

const clearCardAndPurchaseStorage = () => {
  localStorage.removeItem("cartProduct");
  localStorage.removeItem("SelectedProducts");
};

// when cancel all cart products must clear and also selected items
const cancelPurchase = purchaseModal.querySelector("#cancelPurchase");
cancelPurchase.addEventListener("click", () => {
  clearCardAndPurchaseStorage();
});

// format data
function formatDate(date) {
  const d = new Date(date);

  // Extracting date components
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  const year = String(d.getFullYear()).slice(2); // Extracting last two digits of the year

  // Combining components into desired format
  const formattedDate = `${day} ${month} ${year}`;

  return formattedDate;
}

//when finish, all cart and selected product must empty & make a new history
const finishPurchase = purchaseModal.querySelector("#finishPurchase");
finishPurchase.addEventListener("click", () => {
  // items
  const selectedItems = JSON.parse(localStorage.getItem("SelectedProducts"));
  // add date
  selectedItems.forEach((item) => (item.date = formatDate(Date.now())));

  // get previous history
  const previousHistory = JSON.parse(localStorage.getItem("history"));

  // if not history, create new and finish
  if (!previousHistory) {
    localStorage.setItem("history", JSON.stringify(selectedItems));
    clearCardAndPurchaseStorage();
    return;
  }

  console.log("s", selectedItems);
  console.log(previousHistory);
  selectedItems.forEach((product) => {
    previousHistory.push(product);
  });

  const updateHistory = previousHistory;
  console.log(updateHistory);

  localStorage.setItem("history", JSON.stringify(updateHistory));

  //clear cart and purchase item
  clearCardAndPurchaseStorage();
});
