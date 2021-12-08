"use strict";

window.onload = function () {
  createNewPost();
};

function createNewPost() {
  const createForm = document.getElementById("create-post");

  createForm.addEventListener("submit", async function (e) {
    e.preventDefault();

    let date = new Date();
    let fullDate = `${date.getFullYear()}-${
      date.getMonth() + 1
    }${date.getDate()} ${date.getHours}`;

    let formData = new FormData(createForm);
    formData = {
      title: formData.get("title"),
      author: formData.get("author"),
      date: formData.get(fullDate),
      content: formData.get("content"),
    };
    try {
      const response = await fetch(`http://localhost:5000/posts`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(),
      });
      console.log(response);
      location.replace("index.html");
      const table = document.getElementById("post-table");

      console.log(table);
    } catch (error) {
      console.log(error);
    }
  });
}
