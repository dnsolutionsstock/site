window.onload = function() {
  // 첫 번째 부분 (fixed-appear 클래스 추가)
  const fixedElement = document.querySelector('.fixed-appear');
  if (fixedElement) {
      // 페이지 로드 후 .show-button 클래스 추가하여 애니메이션 시작
      setTimeout(function() {
          fixedElement.classList.add('show-button');
      }, 100); // 0.1초 후에 클래스 추가 (애니메이션 시작)
  } else {
      console.error('.fixed-appear 요소를 찾을 수 없습니다.');
  }

  // 두 번째 부분 (팝업 관리)
  if (!localStorage.getItem("popupClosed")) {
      document.getElementById("popup").classList.add("show");
  }

  document.getElementById("dont-show-again").addEventListener("change", function() {
      if (this.checked) {
          localStorage.setItem("popupClosed", "true");
      } else {
          localStorage.removeItem("popupClosed");
      }
  });

  document.getElementById("close-popup").addEventListener("click", function() {
      document.getElementById("popup").classList.remove("show");
  });
};




  const newsContainer = document.querySelector(".news-container");

let isDown = false;
let startX;
let scrollLeft;

newsContainer.addEventListener("mousedown", (e) => {
  isDown = true;
  newsContainer.classList.add("active");
  startX = e.pageX - newsContainer.offsetLeft;
  scrollLeft = newsContainer.scrollLeft;
});

newsContainer.addEventListener("mouseleave", () => {
  isDown = false;
  newsContainer.classList.remove("active");
});

newsContainer.addEventListener("mouseup", () => {
  isDown = false;
  newsContainer.classList.remove("active");
});

newsContainer.addEventListener("mousemove", (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - newsContainer.offsetLeft;
  const walk = (x - startX) * 2; // 스크롤 속도 조절
  newsContainer.scrollLeft = scrollLeft - walk;
});

