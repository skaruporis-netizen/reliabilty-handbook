"""Verify imported original bytes; optionally compare editable files to import."""
import argparse
import hashlib
import json
import subprocess
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
parser = argparse.ArgumentParser(description=__doc__)
parser.add_argument('--current', action='store_true', help='Also require the editable application to match the imported source commit.')
args = parser.parse_args()
manifest = json.loads((ROOT / 'baseline/manifest.json').read_text(encoding='utf-8'))
errors = []

def verify(entry, key='path'):
    path = ROOT / entry[key]
    if not path.is_file():
        errors.append(f'Missing: {entry[key]}')
        return
    data = path.read_bytes()
    if len(data) != entry['size_bytes'] or hashlib.sha256(data).hexdigest() != entry['sha256']:
        errors.append(f'Bytes changed: {entry[key]}')

for entry in manifest['preserved_originals']:
    verify(entry)
if args.current:
    for entry in manifest['source_files']:
        verify(entry, 'working_path')

bundle = ROOT / 'archive/source-history.bundle'
if bundle.is_file():
    result = subprocess.run(['git', 'bundle', 'list-heads', str(bundle)], capture_output=True, text=True)
    if result.returncode or manifest['source_commit'] not in result.stdout:
        errors.append('Archived Git history does not contain the imported source head.')

if errors:
    raise SystemExit('\n'.join(errors))
print(json.dumps({'status': 'passed', 'original_files': len(manifest['preserved_originals']), 'source_files_compared': len(manifest['source_files']) if args.current else 0, 'source_commit': manifest['source_commit']}))
