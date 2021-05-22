const form = document.querySelector(".form");
const inputs = form.querySelectorAll("input");
const firstNameInput = document.getElementById("firstName");
const lastNameInput = document.getElementById("lastName");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("pass");

// alert texts
const firstNameWarningText = form.querySelector(".firstName");
const lastNameWarningText = form.querySelector(".lastName");
const emailWarningText = form.querySelector(".email");
const passwordWarningText = form.querySelector(".password");

form.addEventListener("submit", e => {
  e.preventDefault();
  inputs.forEach(input => {
    if (input !== emailInput) {
      if (isEmpty(input)) {
        input.classList.add("warning");
        return;
      }

    }
    if (input === emailInput) {
      if (isEmpty(input)) {
        input.classList.add("warning");
        input.nextElementSibling.textContent = "Email cannot be empty";
        return;
      }
      if (!validateEmail(input.value)) {
        input.classList.add("warning");
        input.nextElementSibling.textContent = "Looks like this is not an email";
      }

      return;
    }
    input.classList.remove("warning");
  })

  // if every input is valid
  if (Array.from(inputs).every(input => !input.classList.contains("warning"))) {
    inputs.forEach(input => {
      input.value = "";
      input.style.borderColor = "#61d6a3";
    });
    passwordInput.nextElementSibling.nextElementSibling.textContent = "Form Submitted";
    setTimeout(() => {
      inputs.forEach(input => {
        input.style.borderColor = "";
      })
      passwordInput.nextElementSibling.nextElementSibling.textContent = "Claim your free trial"
    }, 1500)
  }
})

inputs.forEach(input => {
  if (input !== emailInput) {
    input.addEventListener("focusout", () => {
      if (isEmpty(input)) {
        input.classList.add("warning");
      } else {
        input.classList.remove("warning");
      }
    });
  } else {
    input.addEventListener("focusout", () => {
      if (isEmpty(input)) {
        input.classList.add("warning");
        input.nextElementSibling.textContent = "Email cannot be empty";
        return;
      }
      if (!validateEmail(input.value)) {
        input.classList.add("warning");
        input.nextElementSibling.textContent = "Looks like this is not an email"
      } else {
        input.classList.remove("warning");
      }
    })
  }

})

function isEmpty(input) {
  return input.value.length === 0;
}

function validateEmail(email) {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}