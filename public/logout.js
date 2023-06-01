const logoutBtn = document.querySelector("#logout");
//logs user out
logoutBtn.addEventListener("click", async (event) => {  
  try {
    event.preventDefault();
    console.log("test")
    const response = await fetch("/api/user/logout", {
      method: "POST",
    });
    if (response.ok) {
      location.reload();
    } else {
      next();
    }
  } catch (err) {}
});