// const greeting = document.querySelector(".greeting");

// window.onload = () => {
//     if(!sessionStorage.getItem("name")){
//         location.href = '/login';
//     } else{
//         greeting.innerHTML = `hello ${sessionStorage.getItem("name")}`;
//     }
// }

document.addEventListener("DOMContentLoaded", () => {
  const greeting = document.querySelector(".greeting");
  console.log("SESSIONSTOGRAM",sessionStorage.getItem("name"),greeting);
  if (!sessionStorage.getItem("name")) {
    location.href = "/login";
  } else {
    greeting.innerHTML = "hello "  + sessionStorage?.getItem("name");
  }

  const logOut = document.querySelector(".logout");

  logOut.onclick = () => {
    sessionStorage.clear();
    location.reload();
  };
});

// const logOut = document.querySelector('.logout');

// logOut.onclick = () => {
//     sessionStorage.clear();
//     location.reload();
// }
