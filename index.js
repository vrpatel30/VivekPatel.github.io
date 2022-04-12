const form = document.getElementById("form");
const username = document.getElementById("name");
const email = document.getElementById("email");
const address = document.getElementById("address");
const city = document.getElementById("city");
const postalCode = document.getElementById("postal-code");
const phoneNumber = document.getElementById("phone-no");
const hourlyRate = document.getElementById("hourly-rate");
const question = document.getElementById("question");
const comment = document.getElementById("comment");
const hiring = document.getElementById("hiring");
const textarea = document.getElementById("textarea");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  checkInputs();
});

hiring.addEventListener("change", (e) => {
  e.preventDefault();
  if (hiring.checked == true) {
    showHourlyRate(hourlyRate);
    setSuccessRadio(question);
  }
});

question.addEventListener("change", (e) => {
  e.preventDefault();
  if (question.checked == true) {
    hideHourlyRate(hourlyRate);
    setSuccessRadio(question);
  }
});

comment.addEventListener("change", (e) => {
  e.preventDefault();
  if (comment.checked == true) {
    hideHourlyRate(hourlyRate);
    setSuccessRadio(question);
  }
});

function checkInputs() {
  const nameVal = username.value;
  const emailVal = email.value;
  const addressVal = address.value;
  const cityVal = city.value;
  const postalCodeVal = postalCode.value;
  const hourlyRateVal = hourlyRate.value;
  const phoneNumberVal = phoneNumber.value;
  const textareaVal = textarea.value;
  var isValidate = true;

  if (nameVal == "") {
    setError(username, "name cannot be blank");
    isValidate = false;
  } else {
    setSuccess(username);
  }

  if (emailVal == "") {
    setError(email, "email cannot be blank");
    isValidate = false;
  } else if (!isEmail(emailVal)) {
    setError(email, "email is not valid");
    isValidate = false;
  } else {
    setSuccess(email);
  }

  if (addressVal == "") {
    setError(address, "address cannot be blank");
    isValidate = false;
  } else {
    setSuccess(address);
  }

  if (cityVal == "") {
    setError(city, "city cannot be blank");
    isValidate = false;
  } else {
    setSuccess(city);
  }

  if (postalCodeVal == "") {
    setError(postalCode, "postal code cannot be blank");
    isValidate = false;
  } else if (!isPostalCode(postalCodeVal)) {
    setError(postalCode, "postal code is not valid");
    isValidate = false;
  } else {
    setSuccess(postalCode);
  }

  if (phoneNumberVal == "") {
    setError(phoneNumber, "phone number cannot be blank");
    isValidate = false;
  } else if (!isPhoneNumber(phoneNumberVal)) {
    setError(phoneNumber, "phone number is not valid");
    isValidate = false;
  } else {
    setSuccess(phoneNumber);
  }

  if (hiring.checked == true) {
    if (hourlyRateVal == "") {
      setErrorHR(hourlyRate, "hourly rate cannot be blank");
      isValidate = false;
    } else if (!isNumber(hourlyRateVal)) {
      setErrorHR(hourlyRate, "Hourly rate is not valid");
      isValidate = false;
    } else {
      setSuccessHR(hourlyRate);
    }
  }

  if (textareaVal == "") {
    setError(textarea, "text area cannot be blank");
    isValidate = false;
  } else {
    setSuccess(textarea);
  }

  if (!hiring.checked && !comment.checked && !question.checked) {
    setErrorRadio(question, "select one option");
    isValidate = false;
  } else if (
    hiring.checked == true ||
    comment.checked == true ||
    question.checked == true
  ) {
    setSuccessRadio(question);
  }

  if (isValidate) {
    const formData = new FormData();

    formData.append("Name", nameVal);
    formData.append("Email", emailVal);
    formData.append("Address", addressVal);
    formData.append("City", cityVal);
    formData.append("Postal Code", postalCodeVal);
    formData.append("Phone Number", phoneNumberVal);
    formData.append(
      question.checked ? "Question" : comment.checked ? "Comment" : "Hiring",
      textareaVal
    );
    if (hiring.checked) formData.append("Hourly Rate", hourlyRateVal);

    fetch("https://httpbin.org/post ", {
      method: "post",
      body: formData,
    })
      .then(function (response) {
        return response;
      })
      .catch(function (error) {
        console.error(error);
      });

    submitBtn.setAttribute("disabled", "true");
    submitBtn.className = "button disabled";
  }
}

function showHourlyRate(input) {
  const formField = input.parentElement;
  formField.className = "input-field hourly-rate show";
}

function hideHourlyRate(input) {
  const formField = input.parentElement;
  formField.className = "input-field hourly-rate";
}

function setError(input, message) {
  const formField = input.parentElement;
  const small = formField.querySelector("small");

  small.innerText = message;

  formField.className = "input-field error";
}

function setSuccess(input) {
  const formField = input.parentElement;
  formField.className = "input-field success";
}

function setErrorHR(input, message) {
  const formField = input.parentElement;
  const small = formField.querySelector("small");

  small.innerText = message;

  formField.className = "input-field hourly-rate show error";
}

function setSuccessHR(input) {
  const formField = input.parentElement;
  formField.className = "input-field show success";
}

function setErrorRadio(input, message) {
  const formField = input.parentElement.parentElement;
  const small = formField.querySelector("small");

  small.innerText = message;

  formField.className = "input-field error";
}

function setSuccessRadio(input) {
  const formField = input.parentElement.parentElement;
  formField.className = "input-field success";
}

function isEmail(email) {
  return /^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,8})(\.[a-z]{2,8})?$/.test(email);
}

function isPostalCode(postalCode) {
  return /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/.test(postalCode);
}

function isPhoneNumber(phoneNumber) {
  return /^\d{12}$/.test(phoneNumber);
}

function isNumber(hourlyRate) {
  return /^\d+$/.test(hourlyRate);
}
