import markdown
import sys

# マークダウンファイルのパスの入力
print('　変換する md ファイルを入力してください')
print('※ファイル名のみ')

file_name = input()
md_file_path = './md/' + file_name + '.md'

# マークダウンファイルを読み込む
with open(md_file_path, 'r', encoding='utf-8') as f:
    md_text = f.read()

# マークダウンをHTMLに変換
html_content = markdown.markdown(md_text, extensions=['tables'])

# HTMLのヘッダーにCSSを追加
html = f"""<!DOCTYPE html>
<html lang="ja">
<script src="https://cdn.rawgit.com/google/code-prettify/master/loader/run_prettify.js"></script>
<head>
    <title>Markdown to HTML Example</title>
    <link rel="stylesheet" type="text/css" href="style.css" />
    <script src="https://cdn.jsdelivr.net/npm/showdown/dist/showdown.min.js"></script>
</head>
<body>
<div id="markdownContent">
{html_content}
</div>
<div id="htmlContent"></div>
<script src="script.js"></script>
</body>
</html>
"""

# HTMLファイルに出力
html_file_path = './html/' + file_name + '.html'
with open(html_file_path, 'w', encoding='utf-8') as f:
    f.write(html)

print(f"{md_file_path} から {html_file_path} への変換が完了しました。")
