//aa8b086c0a30b1699395af33dd844533 -key
//19d804c19a062861 -pw
//flickr.interestingness.getList -method
//https://www.flickr.com/services/rest -auth
//https://live.staticflickr.com/{server-id}/{id}_{secret}_{size-suffix}.jpg

//변수 설정

const frame = document.querySelector("#list");
const loading = document.querySelector(".loading");

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


fetch(url)
  .then((data) => {
    let result = data.json();
    return result;
  })
  .then((json) => {
    let items = json.photos.photo;

    let htmls = "";

    items.map((el, index) => {
      let imgSrcBig = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_m.jpg`;

      let imgSrc = `https://live.staticflickr.com/${el.server}/${el.id}_${el.secret}_b.jpg`;

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


		const imgs = frame.querySelectorAll('img');
		const len = imgs.length;

		let count = 0;
		for (let el of imgs) {
			el.addEventListener('load', () => {
				count++;
				if (count == len) isoLayout();
			});
		}
  });

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
