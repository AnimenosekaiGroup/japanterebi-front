from htmlmin import minify
from bs4 import BeautifulSoup
print("""   Japan Terebi — HTML Production Compiling
Version: 1.0

"Compiles" the HTML documents for production use

© Anime no Sekai — 2021
""")

print("[step] Importing Dependencies")


# MAIN PAGE

with open("index.html", "r") as index:
    HTML = index.read()

print("[step] Processing index.html")
soup = BeautifulSoup(HTML, "html.parser")

print("[step] Processing index.html — Removing script tags")
for script in soup.find_all("script"):
    script.decompose()

print("[step] Processing index.html — Adding new script tags")
hls = soup.new_tag('script')
hls["src"] = "https://cdn.jsdelivr.net/npm/hls.js@latest"
main = soup.new_tag('script')
main["src"] = "scripts/main.js"

soup.find("head").append(hls)
soup.find("head").append(main)

print("[step] Processing index.html — Removing link:css tags")
for link in soup.find_all("link"):
    if "stylesheet" in link["rel"]:
        link.decompose()

print("[step] Processing index.html — Adding new links to css tags")
main = soup.new_tag('link')
main["rel"] = "stylesheet"
main["href"] = "styles/main.css"

soup.find("head").append(main)

print("[step] Processing index.html — Minifying")
HTML = minify(str(soup), remove_comments=True, remove_empty_space=True)

print("[step] Outputting result")
with open("production/index.html", "w") as index:
    index.write(str(HTML))


# LOGIN PAGE

print("[step] Processing login.html")
with open("login.html") as login:
    HTML = login.read()


print("[step] Processing login.html")
soup = BeautifulSoup(HTML, "html.parser")

print("[step] Processing login.html — Removing script tags")
for script in soup.find_all("script"):
    script.decompose()

print("[step] Processing login.html — Adding new script tags")
main = soup.new_tag('script')
main["src"] = "scripts/login.js"

soup.find("head").append(main)

print("[step] Processing login.html — Removing link:css tags")
for link in soup.find_all("link"):
    if "stylesheet" in link["rel"]:
        link.decompose()

print("[step] Processing login.html — Adding new links to css tags")
main = soup.new_tag('link')
main["rel"] = "stylesheet"
main["href"] = "styles/login.css"
font_awesome = soup.new_tag('link')
font_awesome["rel"] = "stylesheet"
font_awesome["href"] = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"

soup.find("head").append(main)
soup.find("head").append(font_awesome)

print("[step] Processing login.html — Minifying")
HTML = minify(str(soup), remove_comments=True, remove_empty_space=True)

print("[step] Outputting result")
with open("production/login.html", "w") as login:
    login.write(str(HTML))

# ADMIN PAGE

print("[step] Processing admin.html")
with open("admin.html") as admin:
    HTML = admin.read()


print("[step] Processing admin.html")
soup = BeautifulSoup(HTML, "html.parser")

print("[step] Processing admin.html — Removing script tags")
for script in soup.find_all("script"):
    script.decompose()

print("[step] Processing admin.html — Adding new script tags")
main = soup.new_tag('script')
main["src"] = "scripts/admin.js"

soup.find("head").append(main)

print("[step] Processing admin.html — Removing link:css tags")
for link in soup.find_all("link"):
    if "stylesheet" in link["rel"]:
        link.decompose()

print("[step] Processing admin.html — Adding new links to css tags")
main = soup.new_tag('link')
main["rel"] = "stylesheet"
main["href"] = "styles/admin.css"
font_awesome = soup.new_tag('link')
font_awesome["rel"] = "stylesheet"
font_awesome["href"] = "https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"

soup.find("head").append(main)
soup.find("head").append(font_awesome)

print("[step] Processing admin.html — Minifying")
HTML = minify(str(soup), remove_comments=True, remove_empty_space=True)

print("[step] Outputting result")
with open("production/admin.html", "w") as admin:
    admin.write(str(HTML))
