// === スクロール連動フェードイン処理の関数 ===
function setupScrollObserver() {
  // 1. 監視対象の全ページを取得 (ログイン画面は除く)
  const pagesToObserve = document.querySelectorAll("#trip-content .page");

  // 2. スクロールコンテナを取得 (スナップコンテナ)
  const scrollContainer = document.getElementById("trip-content");

  // 3. Intersection Observer のオプション
  const options = {
    root: scrollContainer, // スクロールコンテナを基準
    rootMargin: "0px",
    threshold: 0.5, // ページの40%が見えたら実行
  };

  // 4. 監視コールバック関数
  const observerCallback = (entries, observer) => {
    entries.forEach((entry) => {
      // 画面内に入ってきたか
      if (entry.isIntersecting) {
        // .is-visible クラスを追加してCSSアニメーションを実行
        entry.target.classList.add("is-visible");

        // 一度表示したら監視を停止 (アニメーションを繰り返さない)
        observer.unobserve(entry.target);
      }
    });
  };

  // 5. Observer のインスタンスを作成
  const observer = new IntersectionObserver(observerCallback, options);

  // 6. 全ページの監視を開始
  pagesToObserve.forEach((page) => {
    observer.observe(page);
  });

  // ★重要: 最初のページ (message-section) は最初から表示させる
  // 監視対象の0番目が存在すれば、即座に .is-visible にする
  if (pagesToObserve.length > 0) {
    pagesToObserve[0].classList.add("is-visible");
    // 最初のページは監視対象から外してもOK
    observer.unobserve(pagesToObserve[0]);
  }
}

// === ★★★ カウントダウン機能 (ここから新規追加) ★★★ ===

// ターゲットの日付 (HTMLの 2025.12.13 に合わせます)
const targetDate = new Date("2025-12-13T00:00:00");

// function updateCountdown() {
//   const countdownElement = document.getElementById("countdown");
//   if (!countdownElement) return; // 要素がなければ何もしない

//   const now = new Date();
//   const diff = targetDate - now; // ターゲットまでの差 (ミリ秒)

//   // 2桁にゼロパディングするヘルパー関数
//   const padZero = (num) => num.toString().padStart(2, "0");

//   // === ターゲット日時を過ぎた場合 ===
//   if (diff <= 0) {
//     countdownElement.innerHTML = "🎉 <strong>Happy Birthday Trip!</strong> 🎉";
//     // タイマーを停止 (setIntervalを停止)
//     if (window.countdownInterval) {
//       clearInterval(window.countdownInterval);
//     }
//     return;
//   }

//   // === 残り時間を計算 ===
//   const days = Math.floor(diff / (1000 * 60 * 60 * 24));
//   const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
//   const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
//   const seconds = Math.floor((diff % (1000 * 60)) / 1000);

//   // === HTMLを更新 ===
//   countdownElement.innerHTML = `
//     <strong>${days}</strong> days
//   `;
// }

function startCountdown() {
  // 1. ページ読み込み時にまず1回実行
  updateCountdown();
  // 2. 1秒ごとに updateCountdown を実行 (グローバル変数にタイマーIDを保存)
  window.countdownInterval = setInterval(updateCountdown, 1000);
}

// === パスワードチェック関数 ===
function checkPassword() {
  // --- ここに好きなパスワードを設定してください ---
  const correctPassword = "happy_birthday"; // 例: 旅行の開始日
  // ------------------------------------------

  const passwordInput = document.getElementById("password-input");
  const errorMessage = document.getElementById("error-message");
  const loginScreen = document.getElementById("login-screen");
  const tripContent = document.getElementById("trip-content");

  if (passwordInput.value === correctPassword) {
    // パスワードが正しい場合
    console.log("パスワード成功");
    loginScreen.style.display = "none"; // ログイン画面を非表示
    tripContent.style.display = "block"; // コンテンツを表示
    errorMessage.textContent = ""; // エラーメッセージをクリア

    // ★★★ 追加 ★★★
    // コンテンツが表示された後に、スクロール監視を開始する
    setupScrollObserver();
  } else {
    // パスワードが間違っている場合
    console.log("パスワード失敗");
    errorMessage.textContent = "パスワードが違います";
    passwordInput.value = ""; // 入力欄をクリア
  }
}

startCountdown();
