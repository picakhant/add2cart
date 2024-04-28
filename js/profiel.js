const nameTag = document.getElementsByTagName("input")[0];
// input fields
const email = document.getElementsByTagName("input")[1];
const submit = document.getElementsByTagName("button")[0];
const checkBox = document.getElementsByTagName("input")[2];

// form error
const formErrorAlert = document.getElementById("formErrorAlert");

// form submit handler
submit.addEventListener("click", (e) => {
  e.preventDefault();

  if (nameTag.value === "" || email.value === "" || !checkBox.checked) {
    formErrorAlert.innerHTML = `
          <div
            class="alert alert-warning alert-dismissible fade show"
            role="alert"
            id="formErrorAlert"
          >
           <span id="errorMessage">Please fill all inputs fields, and agree our policy!</span>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="alert"
              aria-label="Close"
              id="closeAlert"
            ></button>
          </div>
`;

    return;
  }

  const userData = {
    name: nameTag.value,
    email: email.value,
  };

  localStorage.setItem("userData", JSON.stringify(userData));
  location.href = "../pages/home.html";
});
