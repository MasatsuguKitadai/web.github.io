var pw;
pw = prompt("パスワードを入れて下さい。", "");
if (pw == "RM23MK610") {
  // 注意：ダブルクォーテーションは半角に変更してください
  location.href = "photo.html";
} else {
  alert("パスワードが違います！");
}
