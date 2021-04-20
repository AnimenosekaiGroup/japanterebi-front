data = ""

with open("production/japanterebi.css") as file:
    data = file.read()
with open("styles/japanterebi.css", "w") as output:
    output.write(data)

with open("production/login.css") as file:
    data = file.read()
with open("styles/login.css", "w") as output:
    output.write(data)

with open("production/japanterebi.js") as file:
    data = file.read()
with open("scripts/japanterebi.js", "w") as output:
    output.write(data)

with open("production/login.js") as file:
    data = file.read()
with open("scripts/login.js", "w") as output:
    output.write(data)