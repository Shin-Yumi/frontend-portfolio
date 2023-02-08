const youtubeList = document.querySelector("#youtube");
const key = "AIzaSyA6RtwwaDd7lctAx_sccqFQtFnSErCl-jc";
const playlistId = "PLzCu2b6-wIU-bhiFEskx9kppoLyJS-l5G";
const num = 10;

const url = `https://www.googleapis.com/youtube/v3/playlistItems?part=snippet&key=${key}&playlistId=${playlistId}&maxResults=${num}`;


window.addEventListener("scroll", () => {
  let scroll = window.scrollY;
  if (scroll > 30) {
    youtubeList.classList.add("on");
  }
});

fetch(url)
  .then((data) => {
    return data.json();
  })
  .then((json) => {
    let items = json.items;
    let result = "";

    items.map((el) => {
      let title = el.snippet.title;
      if (title.length > 24) {
        title = title.substr(0, 24) + "...";
      }

      let date = el.snippet.publishedAt;
      data = date.split("T")[0];
      result += `
        <article class='youtubeCont'>
          <a href="${el.snippet.resourceId.videoId}" class="pic">
            <img src="${el.snippet.thumbnails.high.url}">
          </a>
          <div class="con">
            <h2>${title}</h2>
            <span>${date}</span>
          </div>
      </article>
      `;
    });

    youtubeList.innerHTML = result;
  });

//이벤트 위임
youtubeList.addEventListener("click", (e) => {
  e.preventDefault();

  if (!e.target.closest("a")) return;

  const vidId = e.target.closest("a").getAttribute("href");

  //동적으로 pop 생산
  let pop = document.createElement("figure");

  pop.classList.add("pop");

  pop.innerHTML = `
      <iframe src="https://www.youtube.com/embed/${vidId}" frameborder="0" width='100%' height='100%' allowfullscreen></iframe>
      <span class='btnClose'>close</span>
    `;
  youtubeList.append(pop);
});

youtubeList.addEventListener("click", (e) => {
  const pop = youtubeList.querySelector(".pop");
  if (pop) {
    const close = pop.querySelector(".btnClose");
    if (e.target === close) pop.remove();
  }
});
