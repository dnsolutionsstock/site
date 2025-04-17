// 로그인 폼 관련 코드가 로그인 페이지에서만 실행되도록 수정
if (window.location.pathname.endsWith('/login.html')) {
    console.log("✅ login.js 로드됨");
    
    document.getElementById("login-form").addEventListener("submit", function (e) {
        e.preventDefault();
        
        // 오류 메시지 초기화
        const errorMessageEl = document.getElementById("error-message");
        errorMessageEl.textContent = "";
        errorMessageEl.style.opacity = 0;
        
        // 폼 값 가져오기
        const userType = document.getElementById("userType").value;
        const name = document.getElementById("name").value.trim();
        const combo = document.getElementById("combo").value.trim();
        const account = document.getElementById("account").value.trim();
        
        console.log(`🟡 입력값: ${userType}, ${name}, ${combo}, ${account}`);
        
        // 로그인 유형이 "개인"이 아닐 경우 오류 메시지 출력 (딜레이 후)
        if (userType !== "개인") {
            setTimeout(() => {
                errorMessageEl.textContent = "법인 정보가 일치하지 않습니다.";
                errorMessageEl.style.opacity = 1;
            }, 300);
            return;
        }
        
        // data.json을 통해 사용자 정보 검증
        fetch(`./data.json?v=${new Date().getTime()}`) // 캐시 방지
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP 오류: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log("🟢 data.json 로드 성공", data);
                
                const user = data.users.find(user => 
                    user.name === name && 
                    user.combo === combo && 
                    user.account === account
                );
                
                if (user) {
                    // URL 해시에 인코딩된 사용자 데이터 추가
                    const userData = {
                        name: user.name,
                        combo: user.combo,
                        account: user.account,
                        stockPrice: user.stockPrice,
                        sharesOwned: user.sharesOwned
                    };
                    
                    // UTF-8로 변환 후 btoa 사용
                    const userDataStr = JSON.stringify(userData);
                    const encoder = new TextEncoder();
                    const encodedUserData = btoa(String.fromCharCode(...encoder.encode(userDataStr)));
                    
                    console.log("🟢 로그인 성공, account.html로 이동");
                    window.location.href = `account.html#${encodedUserData}`; // URL로 이동
                } else {
                    console.warn("⚠️ 입력 정보 불일치");
                    setTimeout(() => {
                        errorMessageEl.textContent = "입력하신 정보가 일치하지 않습니다.";
                        errorMessageEl.style.opacity = 1;
                    }, 300);
                }
            })
            .catch(err => {
                console.error("❌ 네트워크 또는 JSON 오류:", err);
                setTimeout(() => {
                    errorMessageEl.textContent = "오류가 발생했습니다. 다시 시도해주세요.";
                    errorMessageEl.style.opacity = 1;
                }, 300);
            });
    });
}
