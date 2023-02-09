const location_btns = document.querySelectorAll(".locaList");
const traffic_on = document.querySelectorAll(".trafficList")[0];
const traffic_off = document.querySelectorAll(".trafficList")[1];
const roadView_on = document.querySelectorAll(".roadViewList")[0];
const roadView_off = document.querySelectorAll(".roadViewList")[1];

var mapContainer = document.getElementById("map"), // 지도를 표시할 div
  mapOption = {
    center: new kakao.maps.LatLng(37.5665256, 127.0092219), // 지도의 중심좌표
    level: 3, // 지도의 확대 레벨
  };
  
// 지도를 표시할 div와  지도 옵션으로  지도를 생성합니다
var map = new kakao.maps.Map(mapContainer, mapOption);

//교통정보
traffic_on.addEventListener("click", (e) => {
  e.preventDefault();
  if (traffic_on.classList.contains("on")) return;
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  traffic_on.classList.add("on");
  traffic_off.classList.remove("on");
});

traffic_off.addEventListener("click", (e) => {
  e.preventDefault();
  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.TRAFFIC);
  traffic_off.classList.add("on");
  traffic_on.classList.remove("on");
});

// 로드뷰
roadView_on.addEventListener("click", (e) => {
  e.preventDefault();
  if (roadView_on.classList.contains("on")) return;
  map.addOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW); 
  roadView_on.classList.add("on");
  roadView_off.classList.remove("on");
});

roadView_off.addEventListener("click", (e) => {
  e.preventDefault();
  map.removeOverlayMapTypeId(kakao.maps.MapTypeId.ROADVIEW);
  roadView_off.classList.add("on");
  roadView_on.classList.remove("on");
});

// 관광명소 배열
let markerPoints = [
  {
    title: "DDP",
    latlng: new kakao.maps.LatLng(37.5665256, 127.0092219),
    imgSrc: "img/marker-border.png",
    imgSize: new kakao.maps.Size(25, 35),
    imgPos: { offset: new kakao.maps.Point(12, 69) },
    button: location_btns[0],
  },
  {
    title: "경복궁",
    latlng: new kakao.maps.LatLng(37.579617, 126.977041),
    imgSrc: "img/marker-border.png",
    imgSize: new kakao.maps.Size(25, 35),
    imgPos: { offset: new kakao.maps.Point(12, 69) },
    button: location_btns[1],
  },
  {
    title: "남산",
    latlng: new kakao.maps.LatLng(37.5511694, 126.9882266),
    imgSrc: "img/marker-border.png",
    imgSize: new kakao.maps.Size(25, 35),
    imgPos: { offset: new kakao.maps.Point(12, 69) },
    button: location_btns[2],
  },
  {
    title: "반포한강공원",
    latlng: new kakao.maps.LatLng(37.5103556, 126.9960308),
    imgSrc: "img/marker-border.png",
    imgSize: new kakao.maps.Size(25, 35),
    imgPos: { offset: new kakao.maps.Point(12, 69) },
    button: location_btns[3],
  },
];

for (let i = 0; i < markerPoints.length; i++) {
	new kakao.maps.Marker({
		map: map, //앞의 map이라는 key값은 marker생성시 필요한 정보의 key를 뜻하는 내용이고, 뒤에 valuse값인 map은 우리가 위에서 선언한 map이라는 변수
		position: markerPoints[i].latlng, //지도의 위치 위도경도값으로 접근하는 우리가 선언한 배열의 객체안의 latlng으로 정해주는것
		title: markerPoints[i].title,
		image: new kakao.maps.MarkerImage(markerPoints[i].imgSrc, markerPoints[i].imgSize, markerPoints[i].imgPos),
		//카카오에서 제공하는 MarkerImage라는 메서드를 사용하되, 인수자리에 우리가 선언한 markerOptions안의 key을 불러와서 넣어주는것
	});

	markerPoints[i].button.addEventListener('click', (e) => {
		e.preventDefault();
		for (let k = 0; k < markerPoints.length; k++) {
			markerPoints[k].button.classList.remove('on');
		}
		markerPoints[i].button.classList.add('on');

		//최종적으로 클릭한 인덱스의 위치로 이동해야하므로 moveTo함수 호출
		moveTo(markerPoints[i].latlng);
    panTo(markerPoints[i].latlng);
	});
}

window.addEventListener('resize', () => {
  let active_btn = document.querySelector('.locaList.on');
  let active_index = active_btn.getAttribute('data-index');
  map.setCenter(markerPoints[active_index].latlng);
})

function moveTo(target) {
  var moveLation = target;

  map.setCenter(moveLation);
}

function panTo(target) {
  var moveLatLon = target;
  
  map.panTo(moveLatLon);            
}   

