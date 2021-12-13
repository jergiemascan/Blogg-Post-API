window.onload = function () {
  let queryString = location.search; //skapar querystring, hämtar från söksträngen
  console.log(queryString);

  let urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('id'));

  showPostData(urlParams.get('id'));
  updatePost(urlParams.get('id'));
};

//showpostdata = för updatefunktionen, hämtar vilken data+id som ska ändras
async function showPostData(id) {
  try {
    let post = await fetch(`http://localhost:5000/posts/${id}`); //från vår egen server + id som id
    let postData = await post.json();
    console.log(postData);

    //hämtar allt från posten, content, title etc.
    document.getElementById('content').value = postData.content;
    document.getElementById('title').value = postData.title;
    document.getElementById('author').value = postData.author;
    document.getElementById('tags').value = postData.tags;
  } catch (error) {
    console.log(error);
  }
}

//tittade mycket på pun-api uppgiften mm och fick klura samt synka med create-post och ändra utifrån det.

async function updatePost(id) {
  let updateForm = document.getElementById('update-form'); //hämta updateformelemenet
  updateForm.addEventListener('submit', async function (e) {
    e.preventDefault();

    //date blir new Date med alla params, liknande från när man kör create
    let date = new Date();
    date = `${date.getFullYear()}- ${date.getMonth()}- ${date.getDate()} ${date.getHours()}`;

    let tags = Array.prototype.slice
      .call(document.querySelectorAll('#tags option:checked'), 0)
      .map(function (tag) {
        //som i API uppgiften, använda map o mappa ut tagsen lite som coins
        return tag.value;
      });

    //använda new FormData i updateForm
    let data = new FormData(updateForm);
    data = {
      title: document.getElementById('title').value,
      author: document.getElementById('author').value,
      date: date,
      tags: tags,
      content: document.getElementById('content').value,
    };

    //finally använda patch method, stringify som tar med datan som en string med JSON.
    try {
      await fetch(`http://localhost:5000/posts/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      location.replace('index.html'); //vart ska den hamna? - > index.html med uppdaterad info
    } catch (error) {
      console.log(error);
    }
  });
}
