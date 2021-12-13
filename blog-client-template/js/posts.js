async function OurBlogContent() {
  try {
    let response = await fetch('http://localhost:5000/posts');
    const Contents= await response.json();
    console.log(Contents);

    let contentHTML = '';
    for (let Content of Contents) {
      contentHTML += `
        <li>
          <h2>${Content.title}</h2>
          <p>Author:${Content.author}</p>
          <span>Date:${Content.date
            .slice(0, -8)
            .replace('T', ' ')}</span><br>
          <tags>Tags:${Content.tags}</tags>
          <article class="article" >
           ${Content.content}
          </article>
          <a href="post.html?id=${Content._id}">...read more</a>
        </li>
      `;
    }
    document.getElementById('blog-list').innerHTML = contentHTML;

  } catch (error) {
        console.log(error);
      }
  }



//     let displayCharacter = 100;
//     const allArticles = document.getElementsByClassName('article');
//     // console.log(allArticles);
//     let articlesArray = [...allArticles];
//     // console.log(arr);

//     articlesArray.forEach(article => {
//       if (article.innerHTML.length < displayCharacter) {
//         article.nextElementSibling.style.display = 'none';
//       } else {
//         const display100Char = article.innerHTML.slice(0, displayCharacter);
//         article.innerHTML = display100Char;
//       }
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// displayOurBlogContent();


function myFunction() {
    var dots = document.getElementById("dots");
    var moreText = document.getElementById("more");
    var btnText = document.getElementById("myBtn");
  
    if (dots.style.display === "none") {
      dots.style.display = "inline";
      btnText.innerHTML = "Read more"; 
      moreText.style.display = "none";
    } else {
      dots.style.display = "none";
      moreText.style.display = "inline";
    }
  }


OurBlogContent();
  