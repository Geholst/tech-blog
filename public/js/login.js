const loginForm = document.querySelector("#login-form");
loginForm.addEventListener("submit", async (event) => {
  try {
    event.preventDefault();
    
 const response = await fetch("/api/user/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });

    const user = {
      email: document.querySelector("#login-email").value,
      password: document.querySelector("#login-password").value,
    };

   
    if (response.ok) {
      location.href = "/";
    } else {
      alert("wrong credentials");
    }
  } catch (err) {
    console.log("error:", err);
    alert(err);
  }
});
