
# === PYTHON PROGRAMMING ===

import requests, json
r = requests.get( 'http://localhost:2000/books', auth=('user', 'pass'))
print(json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': ')))
