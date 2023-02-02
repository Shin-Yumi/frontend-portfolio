//변수 설정
// tablet 부터 적용되는 서브메뉴바를 위한 변수
const hamMenu = document.querySelector('.hamMenu');
const menuMo = document.querySelector('#menuMo');



const docHt = window.scrollY;
const topBtn = document.querySelector('.topBtn');

// 서브 메뉴바
hamMenu.addEventListener('click', (e) => {
	e.preventDefault();

	subMenu(hamMenu);
  subMenu(menuMo);
});

function subMenu(val) {
  val.classList.toggle('on');
}

if(document.querySelector('#main') !== null) {
    // gallery section에 적용되는 슬라이더, 탭메뉴를 위한 변수
  const gallerySection = document.querySelector('.galleryCont');
  const galleryTabs = gallerySection.querySelectorAll('.galleryTab');

  const galleryCont = gallerySection.querySelectorAll('.gallerySlide');
  //gallery section tabMenu
  galleryTabs.forEach((tab, i) => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();

      onActive(galleryTabs, i);
      onActive(galleryCont, i);

    })
  })

  function onActive(arr, idx) {
    for(let el of arr) {
      el.classList.remove('on');
    }
    arr[idx].classList.add('on');
  }

  // swiper
  var swiper = new Swiper(".gallerySlide", {
    loop: 'auto',
    grabCursor: true,
    slidesPerView: 1,
    autoplay: {  //2초마다 play
      delay: 2000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });
}


// cursor

// const cursorRounded = document.querySelector('.cursor');
// const cursorText = document.querySelector('.custom');

// document.addEventListener('mousemove', e => {
//   const mouseX = e.pageX;
//   const mouseY = e.pageY;   
  
//   cursorRounded.style.top = mouseY + "px"; 
//   cursorRounded.style.left = mouseX + "px";   
//   cursorText.style.top = mouseY + "px"; 
//   cursorText.style.left = mouseX + "px"; 
// })




