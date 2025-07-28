function convertMarkdown() {
  const input = document.getElementById('fileInput').files[0];
  if (!input) {
    alert("Please select a markdown file.");
    return;
  }

  const reader = new FileReader();
  reader.onload = function (e) {
    const markdownText = e.target.result;
    const html = marked.parse(markdownText); // uses CDN
    const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Converted Markdown</title>
  <style>
    body { font-family: Arial; margin: 2rem; line-height: 1.6; }
    h1, h2, h3 { color: #333; }
    code { background: #eee; padding: 2px 4px; border-radius: 4px; }
  </style>
</head>
<body>${html}</body></html>`;

    // Show preview
    document.getElementById('outputArea').innerHTML = html;

    // Create downloadable HTML
    const blob = new Blob([fullHtml], { type: "text/html" });
    const url = URL.createObjectURL(blob);
    const link = document.getElementById('downloadLink');
    link.href = url;
    link.download = "converted.html";
    link.style.display = "inline-block";
    link.innerText = "⬇️ Download HTML";
  };
  reader.readAsText(input);
}
