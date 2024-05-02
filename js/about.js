// create a modal
const aboutUs = document.createElement("div");
aboutUs.classList.add("modal", "fade");
aboutUs.id = "aboutUs";
aboutUs.setAttribute("data-bs-backdrop", "static");
aboutUs.setAttribute("data-bs-keyboard", "false");
aboutUs.setAttribute("tabindex", "-1");
aboutUs.setAttribute("aria-labelledby", "aboutus");
aboutUs.setAttribute("aria-hidden", "true");

// purchase info modal
aboutUs.innerHTML = `
  <div class="modal-dialog modal-dialog-centered ">
    <div class="modal-content">
      <div class="modal-header">
        <h1 class="modal-title fs-5">
          About Us
        </h1>
        <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
        ></button>
      </div>
      <div class="modal-body">
        <h4 class="mt-5">Actuall just my javascript test project</h4>
        <p>I nmaed this project to Add2Cart, fetch the data form facestoreapi.com and show all data. We can filter 
        on product category, search by product name, and make add to cart. My project base on browser locastorage, i use
        Bootstrap5 for my css. You can review my code on github, check the following link --</p>
        <ol>
            <li> 
                <a href="https://fakestoreapi.com/">fakestoreapi.com</a>
            </li>
            <li> 
                <a href="https://getbootstrap.com/">Bootstrap</a>
            </li>
            <li> 
                <a href="https://github.com/picakhant/">Get my code</a>
            </li>
        </ol>
      </div>
      <div class="modal-footer">
        <div class="text-center text-muted">Created by Zaw WIn Khnat</div>
      </div>
    </div>
  </div>
`;

document.body.append(aboutUs);
