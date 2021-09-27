print("""   Japan Terebi — CSS Production Compiling
Version: 1.0

"Compiles" the CSS documents for production use

© Anime no Sekai — 2021
""")

print("[step] Processing Main CSS")
print("[step] Bundling main CSS")
CSS = "/* Japan Terebi — Styling */\n\n\n"
with open("styles/keyframes.css") as keyframes:
    CSS += keyframes.read()
CSS += "\n\n"
with open("styles/main.css") as main:
    CSS += main.read()
CSS += "\n\n"
with open("styles/responsive.css") as responsive:
    CSS += responsive.read()


print("[step] Outputting result")
with open("production/main.css", "w") as output:
    output.write(CSS)


print("[step] Processing Login CSS")
CSS = "/* Japan Terebi — Styling */\n\n\n"
with open("styles/login.css") as login:
    CSS += login.read()

print("[step] Outputting result")
with open("production/login.css", "w") as output:
    output.write(CSS)

print("[step] Processing Admin CSS")
CSS = "/* Japan Terebi — Styling */\n\n\n"
with open("styles/admin.css") as admin:
    CSS += admin.read()

print("[step] Outputting result")
with open("production/admin.css", "w") as output:
    output.write(CSS)
