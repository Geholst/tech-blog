const completeBtn = document.querySelectorAll(".deleteButton");

completeBtn.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const postId = document.querySelector("#delete").dataset.id;
    const response = fetch(`/api/posts/${postId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    location.reload();
  });
});