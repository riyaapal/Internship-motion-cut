const toggleBtn = document.getElementById("dot");
const navBar = document.querySelector(".header-container");
const eye = document.querySelector(".eye");
const passwordInput = document.querySelector("#password");
const registerBtn = document.querySelector("#register-form");
const lower = document.querySelector("#lower");
const upper = document.querySelector("#upper");
const number = document.querySelector("#number");
const length = document.querySelector("#length");
const passmisMatch = document.querySelector('#cpassword');
const passmsgBox = document.querySelector('#password-msg-box');

toggleBtn.addEventListener("click", () => {
  navBar.classList.toggle("active");
  toggleBtn.classList.contains('fa-bars')?toggleBtn.classList.replace('fa-bars','fa-xmark'):toggleBtn.classList.replace('fa-xmark','fa-bars')
  
});

eye.addEventListener("click", () => {
  if (passwordInput.type === "password") {
    passwordInput.setAttribute("type", "text");
    eye.classList.replace("fa-eye", "fa-eye-slash");
  } else {
    passwordInput.setAttribute("type", "password");
    eye.classList.replace("fa-eye-slash", "fa-eye");
  }
});

registerBtn.addEventListener("submit", (e) => {
  e.preventDefault();
  
  if(passwordInput.value ===passmisMatch.value){
    passmsgBox.style.display ='none';
  }else{
    passmsgBox.style.display = 'flex';
  }
  
});

passwordInput.onfocus = function () {
  document.querySelector(".message-box").style.display = "flex";
};
passwordInput.onblur = function () {
  document.querySelector(".message-box").style.display = "none";
};
passwordInput.onkeyup = function () {
  var Lowercase = /[a-z]/g;
  if (passwordInput.value.match(Lowercase)) {
    lower.classList.remove("invalid");
    lower.classList.add("valid");
  } else {
    lower.classList.remove("valid");
    lower.classList.add("invalid");
  }

  var upperCaseLetters = /[A-Z]/g;
  if (passwordInput.value.match(upperCaseLetters)) {
    upper.classList.remove("invalid");
    upper.classList.add("valid");
  } else {
    upper.classList.remove("valid");
    upper.classList.add("invalid");
  }

  var numbers = /[0-9]/g;
  if (passwordInput.value.match(numbers)) {
    number.classList.remove("invalid");
    number.classList.add("valid");
  } else {
    number.classList.remove("valid");
    number.classList.add("invalid");
  }

  if (passwordInput.value.length >= 8) {
    length.classList.remove("invalid");
    length.classList.add("valid");
  } else {
    length.classList.remove("valid");
    length.classList.add("invalid");
  }
};