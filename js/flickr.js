//aa8b086c0a30b1699395af33dd844533 -key
//19d804c19a062861 -pw
//flickr.interestingness.getList -method
//https://www.flickr.com/services/rest -auth
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

//변수 설정

const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");
const input = document.querySelector("#search");
const btn = document.querySelector(".btnSearch");

// api base url
const base = "https://www.flickr.com/services/rest/?";

//api method
const method = "flickr.interestingness.getList";
const method2 = "flickr.photos.search";

//api key
const key = "aa8b086c0a30b1699395af33dd844533";

//api 가져올 요소 수
const per_page = 100;

//api
const url = `${base}method=${method}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1`;
const url2 = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=바다&privacy_filter=1`;

callData(url2);

btn.addEventListener("click", () => {
  let tag = input.value;
  tag = tag.trim();
  const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
  

  if(tag !== '') {
    callData(url);
  } else {
    alert('검색어를 입력하세요')
  }
});

//input 요소에 엔터키를 누르면
input.addEventListener("keypress", (e) => {
  if (e.keyCode == 13) {
    let tag = input.value;
    const url = `${base}method=${method2}&api_key=${key}&per_page=${per_page}&format=json&nojsoncallback=1&tags=${tag}&privacy_filter=1`;
    callData(url);
  }
});

function callData(url) {
  //기존의 html을 모두 제거
  frame.innerHTML = '';
  loading.classList.remove('off');
  frame.classList.remove('on');
  fetch(url)
    .then((data) => {
      let result = data.json();
      return result;
    })
    .then((json) => {
      let items = json.photos.photo;

      if(items.length > 0) {
        createList(items);
        delay();
      } else {
        alert('검색하신 이미지의 데이터가 없습니다');
      }

    });
}

function createList(items) {
  let htmls = "";

  items.map((el, index) => {
    //큰 이미지 주소를 변수로 담음
    let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

    let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

    htmls += `
      <li class="item">
        <div class="itemBox">
          <a class="galleryImg" href="${imgSrcBig}"><img src="${imgSrc}" alt=""></a>
          <p class="galleryTitle">${el.title}</p>
        </div>
      </li>
      `;
  });

  frame.innerHTML = htmls;
}

function delay() {
  const imgs = frame.querySelectorAll("img");
  const len = imgs.length;

  let count = 0;
  for (let el of imgs) {
    el.addEventListener("load", () => {
      count++;
      if (count == len) isoLayout();
    });

    el.addEventListener("error", () => {
      e.currentTarget
        .closest(".item")
        .querySelector("img")
        .setAttribute("src", "img/notFound.jpeg");
    });
  }
}

//isotope 플러그인 함수
function isoLayout() {
  loading.classList.add("off");
  frame.classList.add('on');
  new Isotope("#list", {
    itemSelection: ".item", 
    columnWidth: ".item", 
    transitionDuration: "0.5s", 
  });
}
