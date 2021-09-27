from os import environ

SHA = environ.get("GITHUB_SHA", None)
with open("scripts/dev/commit.js", "w") as commit_file:
    commit_file.write('const commit = ' + (('"' + SHA + '"')
                      if SHA is not None else "null"))
