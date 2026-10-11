"""Compile in isolation; the checked-in application is never overwritten."""
import json
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
generated = ['book-data.js', 'book-en.js', 'book-zh.js', 'ui-locales.js']
with tempfile.TemporaryDirectory(prefix='reliability-generated-') as directory:
    target = Path(directory)
    shutil.copytree(ROOT / 'translations', target / 'translations')
    (target / 'dist').mkdir()
    subprocess.run([sys.executable, str(target / 'translations/build.py')], check=True, capture_output=True, text=True)
    differences = [name for name in generated if (ROOT / 'dist' / name).read_bytes() != (target / 'dist' / name).read_bytes()]
    if differences:
        raise SystemExit('Generated output differs: ' + ', '.join(differences))
print(json.dumps({'status': 'passed', 'generated_files': generated, 'source_files_modified': False}))
