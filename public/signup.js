const signUpForm = document.querySelector("#signup-form");

const checkPassword = (pass1, pass2) => {
  if (pass1 === pass2) {
    return true;
  } else {
    return false;
  }
};

signUpForm.addEventListener("submit", async (event) => {
  try {
    const password = document.querySelector("#user-password").value;
    const passConfirm = document.querySelector(
      "#user-password-confirmation"
    ).value;
    if (await checkPassword(password, passConfirm)) {
      event.preventDefault();
      const newUser = {
        userName: document.querySelector("#user-name").value,
        email: document.querySelector("#user-email").value,
        password: document.querySelector("#user-password").value,
      };
      const response = await fetch("/api/user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        location.href = "/";
      } else {
        alert("error");
      }
    } else {
       alert("passwords don't match");
    }
  } catch (err) {
    console.log("error:", err);
    alert(err);
  }
});