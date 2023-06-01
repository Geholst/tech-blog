document.querySelector("form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const title = document.querySelector("#title").value;
    console.log("title:", title);
    const content = document.querySelector("#content").value;
    console.log("content:", content);
    
    const PostObj = {
      title: document.querySelector("#title").value,
      content: document.querySelector("#content").value,
    };
    const response = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify(PostObj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const PostData = await response.json();
    const id = PostData.id;
    if (response.ok) {
      location.href = `/`;
    } else {
      alert("error");
    }
  });