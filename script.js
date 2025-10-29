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

// === パスワードチェック関数 ===
function checkPassword() {
  // --- ここに好きなパスワードを設定してください ---
  const correctPassword = "test"; // 例: 旅行の開始日
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
