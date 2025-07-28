let markdownText = '';

function convertMarkdown() {
  if (!markdownText) {
    alert("No markdown content found. Please upload a .md file.");
    return;
  }

  const html = marked.parse(markdownText);
  const fullHtml = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>Converted Markdown</title>
  <style>
    body { font-family: Arial; margin: 2rem; line-height: 1.6; background-color: #f8f9fa; }
    h1, h2, h3 { color: #333; }
    code { background: #eee; padding: 2px 4px; border-radius: 4px; }
  </style>
</head>
<body>${html}</body></html>`;

  document.getElementById('outputArea').innerHTML = html;
  document.getElementById('rawHtml').value = fullHtml;

  const blob = new Blob([fullHtml], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  const link = document.getElementById('downloadLink');
  link.href = url;
  link.download = "converted.html";
  link.style.display = "inline-block";
}

document.getElementById('fileInput').addEventListener('change', handleFileSelect);

function handleFileSelect(e) {
  const file = e.target.files[0];
  if (!file || !file.name.endsWith('.md')) {
    alert("Please select a valid .md file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    markdownText = e.target.result;
  };
  reader.readAsText(file);
}

// Drag & Drop Support
const dropZone = document.getElementById("dropZone");

dropZone.addEventListener("dragover", function (e) {
  e.preventDefault();
  dropZone.classList.add("dragover");
});

dropZone.addEventListener("dragleave", function () {
  dropZone.classList.remove("dragover");
});

dropZone.addEventListener("drop", function (e) {
  e.preventDefault();
  dropZone.classList.remove("dragover");
  const file = e.dataTransfer.files[0];
  if (!file || !file.name.endsWith('.md')) {
    alert("Please drop a valid .md file");
    return;
  }

  const reader = new FileReader();
  reader.onload = (e) => {
    markdownText = e.target.result;
  };
  reader.readAsText(file);
});
