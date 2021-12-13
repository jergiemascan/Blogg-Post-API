'use strict';

window.onload = function () {
  createNewPost();
};

function createNewPost() {
  const createPostForm = document.getElementById('create-post');

  createPostForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    let date = new Date();
    date = `${date.getFullYear()}-${date.getMonth() + 1}${date.getDate()} ${
      date.getHours
    }`;

    let tags = Array.prototype.slice
      .call(document.querySelectorAll('#tags option:checked'), 0)
      .map(function (choosen) {
        return choosen.value;
      });
    console.log(tags);

    let formData = new FormData(createPostForm);
    formData = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      date: formData.get(date),
      tags: tags,
      content: document.getElementById('content').value,
    };
    try {
      const response = await fetch(`http://localhost:5000/posts`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      location.replace('index.html');
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  });
}
