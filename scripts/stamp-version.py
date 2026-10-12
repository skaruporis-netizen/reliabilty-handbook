import json, os, subprocess
from pathlib import Path
p = Path("dist/version.json")
v = json.loads(p.read_text())
v["sourceCommit"] = os.environ.get("GITHUB_SHA") or subprocess.check_output(["git", "rev-parse", "HEAD"], text=True).strip()
p.write_text(json.dumps(v, indent=2) + "\n")
