data = ""

with open("production/japanterebi.css") as file:
    data = file.read()
with open("styles/japanterebi.css", "w") as output:
    output.write(data)

with open("production/login.css") as file:
    data = file.read()
with open("styles/login.css", "w") as output:
    output.write(data)

data = """/** COPYRIGHT © ANIME NO SEKAI, 2021
 * Author: Anime no Sekai
 * Author Github: https://github.com/Animenosekai
 * Repository: https://github.com/AnimenosekaiGroup/japanterebi-front
 * Year: 2021
 * Last Update: 20th April 2021
 * Version: v2.0
 * Experimental Version: v2.0 (α) (Upscale)
 * Project: Japan Terebi v4
 * External Credit (Used for the experimental version):
 *  Upscale:
 *      Author: bloc97 and NeuroWhAI
 *      URL: https://github.com/NeuroWhAI/Anime4K/tree/feat-web
 *      Filename: scripts/upscale.js
 *  requestAnimationFrame (polyfill):
 *      Author: Erik Möller (+ 6 others)
 *      URL: https://gist.github.com/jalbam/5fe05443270fa6d8136238ec72accbc0
 *      Filename: scripts/upscale.js
 */

"""
with open("production/japanterebi.js") as file:
    data += file.read()
with open("scripts/japanterebi.js", "w") as output:
    print(data)
    output.write(data)

with open("production/login.js") as file:
    data = file.read()
with open("scripts/login.js", "w") as output:
    output.write(data)