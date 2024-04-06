document.addEventListener("DOMContentLoaded", function() {
    // Showdown.jsのコンバーターを作成
    var converter = new showdown.Converter(),
    // markdownContentからマークダウンのテキストを取得
    text = document.getElementById('markdownContent').innerText,
    // マークダウンをHTMLに変換
    html = converter.makeHtml(text);
    // 変換したHTMLをhtmlContentに設定
    document.getElementById('htmlContent').innerHTML = html;

    // Google Code Prettifyを実行してコードブロックにシンタックスハイライトを適用
    PR.prettyPrint();
});
