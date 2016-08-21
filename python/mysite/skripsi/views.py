from django.http import HttpResponse
import requests, json

r = requests.get( 'http://localhost:2000/books', auth=('user', 'pass'))
j = json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': '))

def index(request):

	# r = requests.get( 'http://localhost:2000/books', auth=('user', 'pass'))
	# print(json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': ')))
    return HttpResponse("Hello, world. You're at the polls index.")