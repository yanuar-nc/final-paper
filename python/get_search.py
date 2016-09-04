from flask import Flask, jsonify, abort, make_response, request, render_template
import requests, json, datetime, time

app = Flask(__name__)
start = time.time();

# Request to API

# Make are roots
@app.route('/')
def hello_world():

    global start, time

    r = requests.get( 'http://localhost:2000/journals/search/university', auth=('user', 'pass'))
    # Get json 
    datas = json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': '))
    
    end    = time.time(); # microseconds
    output = round((end - start) / 1000, 4) # convert to milliseconds

    # start = 0.0
    end = 0.0
    # Output
    return render_template('journals.html', result=datas, time = output)
