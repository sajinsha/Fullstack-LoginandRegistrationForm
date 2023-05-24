// form loading animation

const form = [...document.querySelector(".form").children];

form.forEach((item, i) => {
  setTimeout(() => {
    item.style.opacity = 1;
  }, i * 100);
});

window.onload = () => {
  if (sessionStorage.name) {
    location.href = "/";
  }
};

// form validation

const name = document.querySelector(".name") || null;
const email = document.querySelector(".email");
const password = document.querySelector(".password");
const submitBtn = document.querySelector(".submit-btn");

if (name == null) {
  // means login page is open
  submitBtn.addEventListener("click", () => {
    async function loginUser() {
      try {
        const response = await fetch("/login-user", {
          method: "post",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            email: email.value,
            password: password.value,
          }),
        });
        const data = await response.json();
        if (response?.status == 200) {
          console.log("logindata", data);
          sessionStorage.setItem("name", data?.data?.name);
          window.location.href = "/";
          // validateData(data);
        } else {
          console.log("RESPONSEDATA", response, data);
          validateData(data);
        }
      } catch (error) {
        // validateData(error?.response);
        console.error("Error:", error);
      }
    }

    loginUser();
  });
} else {
  // means register page is open

  submitBtn.addEventListener("click", () => {
    async function registerUser() {
      try {
        const response = await fetch("/register-user", {
          method: "post",
          headers: new Headers({ "Content-Type": "application/json" }),
          body: JSON.stringify({
            name: name.value,
            email: email.value,
            password: password.value,
          }),
        });

        const data = await response.json();
        if (response?.status == 200) {
          window.location.href = "/login";
          console.log("RegisterData", data);
        } else {
          validateData(data);
        }
      } catch (error) {
        console.error("Error registering user:", error);
      }
    }

    registerUser();
  });
}

const validateData = (data) => {
  console.log("DATA", data);
  if (!data.name) {
    alertBox(data);
  } else {
    sessionStorage.name = data.name;
    sessionStorage.email = data.email;
    location.href = "/";
  }
};

const alertBox = (data) => {
  console.log("DATAERRR", data);
  const alertContainer = document.querySelector(".alert-box");
  const alertMsg = document.querySelector(".alert");
  if (data?.error) {
    alertMsg.innerHTML = data?.error;

    alertContainer.style.top = `5%`;
    setTimeout(() => {
      alertContainer.style.top = null;
    }, 5000);
  }
};
