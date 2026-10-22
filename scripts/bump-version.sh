#!/bin/sh
# Raise the ?v= number on the CSS and JS links in site/index.html, so browsers load the new files.
# Only those links are touched; other URLs with ?v= (such as YouTube videos) are left alone.
set -e
cd "$(dirname "$0")/.."
python3 -I - <<'PY'
import re
p = 'site/index.html'
s = open(p).read()
pat = re.compile(r'((?:href|src)="(?:css|js)/[^"?]+\?v=)(\d+)(")')
nums = [int(m.group(2)) for m in pat.finditer(s)]
new = max(nums) + 1
s = pat.sub(lambda m: m.group(1) + str(new) + m.group(3), s)
open(p, 'w').write(s)
print(f'CSS and JS links now use ?v={new}')
PY
