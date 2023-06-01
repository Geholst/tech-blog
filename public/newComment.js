const completeBtn = document.querySelectorAll(".deleteButton");

completeBtn.forEach((button) => {
    
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = document.querySelector("#delete").dataset.id;
    });
    location.reload();
  });