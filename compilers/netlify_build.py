from os import environ
from requests import post

HOOK = environ.get("NETLIFY_HOOK", None)
if HOOK is not None:
    post("https://api.netlify.com/build_hooks/" + HOOK + "?trigger_branch=production&trigger_title=Build+Start", data={})