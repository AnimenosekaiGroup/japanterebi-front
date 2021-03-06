data = ""

with open("production/main.css") as file:
    data = file.read()
with open("styles/main.css", "w") as output:
    output.write(data)

with open("production/login.css") as file:
    data = file.read()
with open("styles/login.css", "w") as output:
    output.write(data)

with open("production/admin.css") as file:
    data = file.read()
with open("styles/admin.css", "w") as output:
    output.write(data)

data = """/** COPYRIGHT © ANIME NO SEKAI, 2021
 * Author: Anime no Sekai
 * Author Github: https://github.com/Animenosekai
 * Repository: https://github.com/AnimenosekaiGroup/japanterebi-front
 * Year: 2021
 * Last Update: 13th Oct. 2021
 * Version: v2.0
 * Experimental Version: v2.0 (α) (Upscale)
 * Project: Japan Terebi v4
 */

"""
with open("production/main.js") as file:
    data += file.read()
with open("scripts/main.js", "w") as output:
    output.write(data)

with open("production/login.js") as file:
    data = file.read()
with open("scripts/login.js", "w") as output:
    output.write(data)

with open("production/admin.js") as file:
    data = file.read()
with open("scripts/admin.js", "w") as output:
    output.write(data)
