//하단 포스터 링크
const posterLinks = [
    '3.html', 
    '4.html', 
    '5.html', 
    '6.html', 
    '1.html'  
  ];
//상단 메뉴
// 드롭다운 메뉴 표시/숨김
function toggleDropdown() {
  const dropdown = document.getElementById('dropdown-menu');
  if (dropdown.style.display === "none" || dropdown.style.display === "") {
      dropdown.style.display = "flex"; // 메뉴 보이기
  } else {
      dropdown.style.display = "none"; // 메뉴 숨기기
  }
}

// 서브 버튼 클릭 처리
function clickSubButton(buttonId) {
  switch (buttonId) {
      case 0:
          window.location.href = "https://tngodj.github.io/Gibli_Fan_Page/"; // 버튼 0 클릭 시 이동할 URL
          break;
      case 1:
          window.location.href = "https://tngodj.github.io/Gibli-WorldCup-Main/"; // 버튼 1 클릭 시 이동할 URL
          break;
      case 2:
          window.location.href = "https://tngodj.github.io/OST_Game"; // 버튼 2 클릭 시 이동할 URL
          break;
      case 3:
          window.location.href = "https://tngodj.github.io/Character-Name-Game/"; // 버튼 3 클릭 시 이동할 URL
          break;
      default:
          console.error("잘못된 버튼 ID입니다."); // 디버그용
  }
};
  // 버튼 정의
  const toggleButton = document.querySelector('.toggle-button');
  
  // 숨겨진 행 보이기/숨기기 로직
  toggleButton.addEventListener('click', () => {
    const hiddenRows = document.querySelectorAll('.hidden-row'); // 숨겨진 행들
    let isVisible = toggleButton.dataset.visible === 'true'; // 현재 표시 상태 확인
  
    hiddenRows.forEach(row => {
      if (isVisible) {
        row.style.opacity = '0.0'; // 흐릿하게
        row.style.pointerEvents = 'none'; // 클릭 방지
      } else {
        row.style.opacity = '1'; // 완전히 보이게
        row.style.pointerEvents = 'auto'; // 클릭 가능
      }
    });
  
    toggleButton.textContent = isVisible ? '모두 보기' : '닫기'; // 버튼 텍스트 변경
    toggleButton.dataset.visible = !isVisible; // 상태 업데이트
  });
  
  //하단 포스터
  const colors = ["#ff7f50", "#87ceeb", "#98fb98", "#ff69b4", "#dda0dd"];
  const posteres = document.querySelectorAll('.poster');
  const coverflow = document.querySelector('.coverflow');
  const scrollbarThumb = document.querySelector('.scrollbar-thumb');
  let activeIndex = 0;
  let isDragging = false;
  let startX = 0;
  
  function updateCoverflow() {
    // 포스터 활성화
    posteres.forEach((poster, index) => {
      poster.classList.remove('active');
      if (index === activeIndex) {
        poster.classList.add('active');
      }
    });
  
    // 포스터 이동
    const offset = -(activeIndex * 220); // 각 포스터의 넓이 + 간격
    coverflow.style.transform = `translateX(${offset}px)`;
  
    // 스크롤바 이동
    const thumbWidth = 100 / posteres.length; // 스크롤바 너비 비율
    scrollbarThumb.style.background = colors[activeIndex]; // 스크롤바 색상 변경
    scrollbarThumb.style.width = `${thumbWidth}%`;
    scrollbarThumb.style.left = `${thumbWidth * activeIndex}%`;
  }
  
  // 키보드로 탐색
  document.addEventListener('keydown', (event) => {
    if (event.key === 'ArrowLeft' && activeIndex > 0) {
      activeIndex -= 1;
      updateCoverflow();
    } else if (event.key === 'ArrowRight' && activeIndex < posteres.length - 1) {
      activeIndex += 1;
      updateCoverflow();
    }
  });
  
   // 포스터에 클릭 이벤트 추가
   posteres.forEach((poster, index) => {
    poster.addEventListener('click', () => {
      if (poster.classList.contains('active')) { // 활성화된 포스터만 클릭 가능
        const link = posterLinks[index]; // 해당 포스터의 링크 가져오기
        if (link) {
          window.open(link, '_self'); // 새 탭에서 링크 열기
        }
      }
    });
  });
  
  scrollbarThumb.addEventListener('mousedown', (e) => {
    isDragging = true;
    startX = e.clientX;
  });
  
  document.addEventListener('mousemove', (e) => {
    if (isDragging) {
      const containerWidth = document.querySelector('.scrollbar').offsetWidth;
      const thumbWidth = scrollbarThumb.offsetWidth;
      let newLeft = e.clientX - startX;
  
      // 경계 제한
      newLeft = Math.max(0, Math.min(newLeft, containerWidth - thumbWidth));
  
      scrollbarThumb.style.left = `${(newLeft / containerWidth) * 100}%`;
  
      // 포스터 이동 계산
      activeIndex = Math.round((newLeft / (containerWidth - thumbWidth)) * (posteres.length - 1));
      updateCoverflow();
    }
  });
  
  document.addEventListener('mouseup', () => {
    isDragging = false;
  });
  
  // 초기화
  updateCoverflow();
