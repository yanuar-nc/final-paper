
# === PYTHON PROGRAMMING ===

import requests, json
r = requests.get( 'http://localhost:2000/books?token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoxLCJ1c2VybmFtZSI6Im55bXBoZXRhbWluZSIsInBhc3N3b3JkIjoiZGFkMDhmZTJiMGU1N2FkOTc1NmRmNTY4MjMzOGVmZjAiLCJhcGlfa2V5IjoiNTIkUVNeT1ZOano0QW5iV2p3YnlaKkk4RiZNZ0lYWFJEUG0yWEZEU0pEcFg4ZFVtUF56TFZPI3RFLWcmeWspTyIsImxldmVsIjo5OSwic3RhdHVzIjoxfSwiaWF0IjoxNDY5NjExMDA1LCJleHAiOjE0Njk2OTc0MDV9.X2b6yiipX4AOq-NEOe0cWR7GDxUVRRRT5vPr14FTHyI', '')
print(json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': ')))
