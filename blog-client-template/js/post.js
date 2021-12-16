window.onload = function () {
  let queryString = location.search;
  console.log(queryString);
  let urlParams = new URLSearchParams(queryString);
  console.log(urlParams.get('id'));

  showWholeArticleContent(urlParams.get('id'));
};

async function showWholeArticleContent(id) {
  try {
    let response = await fetch(`http://localhost:5000/posts/${id}`);
    let blogContent = await response.json();
    console.log(blogContent);
    console.log(blogContent.title);

    let wholePostHTML = '';
    wholePostHTML = `
        <h2>${blogContent.title}</h2>
        <p><span id="bold">Author:</span> ${blogContent.author}</p>
        <p><span id="bold">Date:</span> ${blogContent.date
          .slice(0, -8)
          .replace('T', ' ')}</p>
        <tags><span id="bold">Tags:</span> ${blogContent.tags}</tags>
        <article id="content-article">
        ${blogContent.content}
        </article>
        <a class="btn-back" href="index.html">&#x2190;back</a>
        `;
    document.querySelector('.readmore-whole-content').innerHTML = wholePostHTML;
  } catch (error) {
    console.log(error);
  }
}
