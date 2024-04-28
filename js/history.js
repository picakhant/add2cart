// create a modal
const historyModal = document.createElement("div");
historyModal.classList.add("modal", "fade");
historyModal.id = "historyCart";
historyModal.setAttribute("data-bs-backdrop", "static");
historyModal.setAttribute("data-bs-keyboard", "false");
historyModal.setAttribute("tabindex", "-1");
historyModal.setAttribute("aria-labelledby", "historyProductLabel");
historyModal.setAttribute("aria-hidden", "true");

// purchase info modal
historyModal.innerHTML = `
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5" id="historyCartLabel">
          History
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body"></div>
      <div class="modal-footer">
      
        <button type="button" id="closeHistoryModal" class="btn btn-secondary" data-bs-dismiss="modal">
          Close
        </button>
        <button type="button" id="clearHistoryList" class="btn btn-primary" data-bs-dismiss="modal">
          Clear All
        </button>
      </div>
    </div>
  </div>
`;

document.body.append(historyModal);

const productHistorySidebarBtn = document.getElementById(
  "productHistorySidebarBtn"
);

//modal footer buttons
const closeHistoryModal = historyModal.querySelector("#closeHistoryModal");
const clearHistoryList = historyModal.querySelector("#clearHistoryList");

productHistorySidebarBtn.addEventListener("click", () => {
  // show modal
  const modal = new bootstrap.Modal(historyModal);
  modal.show();

  const modalBody = historyModal.querySelector(".modal-body");
  modalBody.innerHTML = "";

  // history from stroage
  const historyItems = JSON.parse(localStorage.getItem("history"));

  if (!historyItems) {
    modalBody.innerHTML = '<h3 class="text-center">No History</h3>';
    closeHistoryModal.classList.add("disabled");
    clearHistoryList.classList.add("disabled");
    return;
  }

  closeHistoryModal.classList.remove("disabled");
  clearHistoryList.classList.remove("disabled");

  historyItems.forEach((item) => {
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

    modalBody.append(row);
  });
});

clearHistoryList.addEventListener("click", () => {
  localStorage.removeItem("history");
});
