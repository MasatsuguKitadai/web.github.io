// === スクロール連動フェードイン処理 ===
function setupScrollObserver() {
  const pagesToObserve = document.querySelectorAll("#trip-content .page");
  const scrollContainer = document.getElementById("trip-content");

  const options = {
    root: scrollContainer,
    rootMargin: "0px",
    threshold: 0.3, // 少し早めに反応するように0.3に変更
  };

  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  };

  const observer = new IntersectionObserver(observerCallback, options);
  pagesToObserve.forEach((page) => observer.observe(page));

  if (pagesToObserve.length > 0) {
    pagesToObserve[0].classList.add("is-visible");
  }
}

// === ★★★ カウントダウン機能 (復活・修正) ★★★ ===
const targetDate = new Date("2025-12-13T00:00:00");

function updateCountdown() {
  const countdownElement = document.getElementById("countdown");
  if (!countdownElement) return;

  const now = new Date();
  const diff = targetDate - now;

  if (diff <= 0) {
    countdownElement.innerHTML = "🎉 <strong>Happy Birthday Trip!</strong> 🎉";
    if (window.countdownInterval) clearInterval(window.countdownInterval);
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  // 見やすく整形
  countdownElement.innerHTML = `
    あと <strong>${days}</strong>日 
    ${hours}時間 ${minutes}分 ${seconds}秒
  `;
}

function startCountdown() {
  updateCountdown();
  window.countdownInterval = setInterval(updateCountdown, 1000);
}

// === パスワードチェック関数 ===
function checkPassword() {
  // ★パスワード設定（任意に変更してください）
  const correctPassword = "rene";

  const passwordInput = document.getElementById("password-input");
  const errorMessage = document.getElementById("error-message");
  const loginScreen = document.getElementById("login-screen");
  const tripContent = document.getElementById("trip-content");

  if (passwordInput.value === correctPassword) {
    console.log("パスワード成功");

    // 画面切り替え
    loginScreen.style.display = "none";
    tripContent.style.display = "block";

    // ★追加: bodyのスクロールを止める（アプリっぽくする）
    document.body.style.overflow = "hidden";

    errorMessage.textContent = "";

    setupScrollObserver();
  } else {
    console.log("パスワード失敗");
    errorMessage.textContent = "パスワードが違います";
    passwordInput.value = "";
  }
}

// ページ読み込み時にカウントダウン開始
startCountdown();
