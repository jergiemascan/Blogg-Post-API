"use strict";

window.onload = function () {
  getAllBlogPost();
};

async function getAllBlogPost() {
  try {
    let response = await fetch("http://localhost:5000/posts", {
      method: "GET", // GET, POST, PATCH, DELETE.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(),
    });
    let blogPost = await response.json();

    let postHTML = "";

    for (let post of blogPost) {
      let date = new Date(post.date);
      date = `${date.getFullYear()}- ${
        date.getMonth() + 1
      }- ${date.getDate()} ${date.getHours()}:${date.getMinutes()}`;

      postHTML += `
      <tr id="blog-list">
        <td>${post.title}</td>
        <td>${post.author}</td>
        <td>${date}</td>
        <td>${post.tags}</td>
        <td>
          <a class="update-link" data-id="${post._id}" href="update-post.html">Update</a> |
          <a class="delete-link" data-id="${post._id}" href="#">Delete</a>
        </td>
      </tr>
      `;
    }

    document.getElementById("post-table").innerHTML += postHTML;
  } catch (error) {
    console.log(error);
  }

  const allDeleteLinks = document.getElementsByClassName("delete-link");
  console.log(allDeleteLinks);

  for (let link of allDeleteLinks) {
    link.addEventListener("click", async function (e) {
      e.preventDefault();
      try {
        let clickedLink = e.target.dataset.id;
        await fetch(`http://localhost:5000/posts/${clickedLink}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(),
        });
        e.target.parentNode.parentNode.remove();
      } catch (error) {
        console.log(error);
      }
    });
  }
}
