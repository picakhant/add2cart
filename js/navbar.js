const navbar = document.createElement("nav");
navbar.id = "navbar";

navbar.classList.add("navbar", "bg-body-tertiary", "sticky-top");

navbar.innerHTML = `
      <div class="container-fluid">
        <a
          class="navbar-brand d-flex align-items-center gap-2"
          href="../pages/home.html"
        >
          <img
            src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png"
            alt="logo"
            class="d-none d-md-block"
            style="height: 45px"
          />
          <span class="fs-4 d-none d-md-block">Add2Cart</span>
          <img
            src="https://cdn-icons-png.flaticon.com/128/9453/9453946.png"
            alt="logo"
            class="d-block d-md-none"
            style="height: 25px"
          />
        </a>

        <!-- navbar item  -->
        <div class="d-flex align-items-center ">
          <ul class="navbar-nav d-flex align-items-center flex-row gap-3">
            <li class="nav-item d-none d-md-block">
             <div class="nav-link btn active">Home</div>
            </li>
            <li class="nav-item d-none d-md-block">
             <div class="nav-link btn" data-bs-toggle="modal" data-bs-target="#aboutUs">About Us</div>
            </li>
            <li class="nav-link">
              <form>
              <select class="form-select form-control-sm" id="productFilter">
                <option value="all">All</option>
              </select>
              </form>
            </li>
          </ul>
          <div class="dropstart ms-3 d-none d-md-block">
            <button
              class="btn dropdown-toggle rounded"
              type="button"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <i class="fa-solid fa-user"></i>
            </button>
            <ul class="dropdown-menu">
              <li><a class="dropdown-item">${
                JSON.parse(localStorage.getItem("userData")).name
              }</a></li>
              <li><a class="dropdown-item">${
                JSON.parse(localStorage.getItem("userData")).email
              }</a></li>
            </ul>
          </div>
        </div>

        <!-- navbar offcanvas trigger -->
        <button
          class="navbar-toggler d-md-none"
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#offcanvasNavbar"
          aria-controls="offcanvasNavbar"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div
          class="offcanvas offcanvas-end"
          tabindex="-1"
          id="offcanvasNavbar"
          aria-labelledby="offcanvasNavbarLabel"
        >
          <div class="offcanvas-header border-bottom">
            <h5 class="offcanvas-title" id="offcanvasNavbarLabel">Add2Cart</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div class="offcanvas-body">
            <div class="container-fluid">
              <div class="row gap-3">
                <div class="col-12">${
                  JSON.parse(localStorage.getItem("userData")).name
                }</div>
                <div class="col-12">${
                  JSON.parse(localStorage.getItem("userData")).email
                }</div>
                <div class="col-12" data-bs-toggle="modal" data-bs-target="#productCart">
                  Cart
                </div>
                <div class="col-12" data-bs-toggle="modal" data-bs-target="#historyCart">
                  History
                </div>
                <div class="col-12" data-bs-toggle="modal" data-bs-target="#searchModal">
                  Search
                </div>
                <div class="col-12" id="changeTheme1">
                  Change Theme
                </div>
                <div class="col-12" id="">
                  About Us
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
`;
document.body.append(navbar);

// set category on navbar
const setCategories = (categories) => {
  const productFilter = document.getElementById("productFilter");
  for (let i = 0; i < categories.length; i++) {
    const option = document.createElement("option");
    option.textContent = categories[i];
    productFilter.append(option);
  }
};

//fetch the category
const fetchCategory = async () => {
  try {
    const api = await fetch("https://fakestoreapi.com/products/categories");
    const categories = await api.json();
    setCategories(categories);
  } catch (error) {
    alert(error);
  }
};

window.addEventListener("load", () => {
  fetchCategory();
});
