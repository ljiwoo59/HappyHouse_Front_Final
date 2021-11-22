<template>
  <div id="map" style="width: 100%; height: 500px"></div>
</template>

<script>
import { mapState } from "vuex";

const houseStore = "houseStore";
let map = null;
let markers = [];

export default {
  name: "KakaoMap",
  computed: {
    ...mapState(houseStore, ["dongName", "houses", "houses2"]),
  },
  watch: {
    dongName: function (val) {
      this.geocoder.addressSearch(val, function (result, status) {
        // 정상적으로 검색이 완료됐으면
        if (status === kakao.maps.services.Status.OK) {
          var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

          // 지도의 중심을 결과값으로 받은 위치로 이동시킵니다
          map.setCenter(coords);
        }
      });
    },
    houses: function (val) {
      console.log("1");
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
      var i = 0;
      if (val.length != 0) {
        val.forEach((house) => {
          if (house.법정동.trim() == this.dongName) {
            this.geocoder.addressSearch(
              this.dongName + " " + house.도로명 + " " + house.도로명건물본번호코드,
              function (result, status) {
                // 정상적으로 검색이 완료됐으면
                if (status === kakao.maps.services.Status.OK) {
                  var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                  var imageSrc =
                      "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
                    imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
                    imgOptions = {
                      spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                      spriteOrigin: new kakao.maps.Point(0, i++ * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                      offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                    },
                    markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                    marker = new kakao.maps.Marker({
                      position: coords, // 마커의 위치
                      image: markerImage,
                    });
                  map.setCenter(coords);
                  marker.setMap(map); // 지도 위에 마커를 표출합니다
                  markers.push(marker); // 배열에 생성된 마커를 추가합니다
                }
              }
            );
          }
        });
      }
    },
    houses2: function (val) {
      console.log("2");
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
      }
      markers = [];
      if (val.length != 0) {
        var i = 0;
        var bounds = new kakao.maps.LatLngBounds();
        val.forEach((house) => {
          this.geocoder.addressSearch(
            house.gugunName + " " + house.dongName,
            function (result, status) {
              // 정상적으로 검색이 완료됐으면
              if (status === kakao.maps.services.Status.OK) {
                var coords = new kakao.maps.LatLng(result[0].y, result[0].x);
                console.log(coords);
                bounds.extend(coords);
                var imageSrc =
                    "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
                  imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
                  imgOptions = {
                    spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
                    spriteOrigin: new kakao.maps.Point(0, i++ * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
                    offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
                  },
                  markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
                  marker = new kakao.maps.Marker({
                    position: coords, // 마커의 위치
                    image: markerImage,
                  });

                marker.setMap(map); // 지도 위에 마커를 표출합니다
                markers.push(marker); // 배열에 생성된 마커를 추가합니다
              }
            }
          );
        });
        map.setBounds(bounds);
        console.log(bounds);
      }
    },
  },
  data() {
    return {
      geocoder: null,
    };
  },
  mounted() {
    if (window.kakao && window.kakao.maps) {
      this.initMap();
    } else {
      const script = document.createElement("script");
      script.onload = () => kakao.maps.load(this.initMap);
      script.src =
        "http://dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=f12ba6e50ade3f00c98658f5fb8dd567&libraries=services";
      document.head.appendChild(script);
    }
  },
  methods: {
    initMap() {
      const container = document.getElementById("map");
      const options = {
        center: new kakao.maps.LatLng(37.566826, 126.9786567),
        level: 5,
      };
      map = new kakao.maps.Map(container, options);
      this.geocoder = new kakao.maps.services.Geocoder();
    },
  },
};
</script>

<style></style>
