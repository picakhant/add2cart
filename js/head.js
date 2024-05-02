const head = document.getElementsByTagName("head")[0];

const origin = location.origin;
let urlPath = location.href;
let titleName;

switch (urlPath) {
  case origin + "/index.html":
    titleName = "| Get Start";
    break;

  case origin + "/pages/info.html":
    titleName = "| Info";
    break;

  case origin + "/pages/home.html":
    titleName = "| Home";
    break;
}

if (urlPath.includes("/pages/detail.html?id=")) {
  titleName = "| Detail";
}

head.innerHTML = `<meta charset="UTF-8" />
<meta name="viewport" content="width=device-width, initial-scale=1.0" />
<title>Add2Cart ${titleName}</title>

<link
      rel="shortcut icon"
      href="https://cdn-icons-png.flaticon.com/128/9453/9453946.png"
      type="image/x-icon"
    />

<!-- bootstrap -->
<link
  rel="stylesheet"
  href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css"
/>

<!-- font aweasome -->
<link
  rel="stylesheet"
  href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
  integrity="sha512-SnH5WK+bZxgPHs44uWIX+LLJAJ9/2PkPKZ5QiAj6Ta86w+fsb2TkcmfRyVX3pBnMFcV7oQPJkl9QevSCWr3W6A=="
  crossorigin="anonymous"
  referrerpolicy="no-referrer"
/>

<!-- googel font -->

<style>
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300..800;1,300..800&display=swap');

// <uniquifier>: Use a unique and descriptive class name
// <weight>: Use a value from 300 to 800

* {
  font-family: "Open Sans", sans-serif;
  font-optical-sizing: auto;
  font-weight: <weight>;
  font-style: normal;
  font-variation-settings:
    "wdth" 100;
}

</style>
`;
