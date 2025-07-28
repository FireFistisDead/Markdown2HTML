import markdown
import sys
import os

def convert_md_to_html(md_file, output_file="output.html"):
    if not os.path.exists(md_file):
        print("File not found.")
        return

    with open(md_file, 'r', encoding='utf-8') as f:
        text = f.read()

    html_body = markdown.markdown(text)

    with open("template.html", 'r') as template:
        html_template = template.read()

    final_html = html_template.replace("{{content}}", html_body)

    with open(output_file, 'w', encoding='utf-8') as f:
        f.write(final_html)

    print(f"HTML file saved as {output_file}")

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python converter.py <markdown_file.md>")
    else:
        convert_md_to_html(sys.argv[1])
