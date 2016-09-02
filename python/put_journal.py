from flask import Flask, jsonify, abort, make_response, request, render_template
import requests, json, datetime, time

app = Flask(__name__)
start = time.time();

# Request to API

# Make are roots
@app.route('/')
def hello_world():

    global start, time

    url = "http://10.0.13.35:2000/journals/edit/66"

    payload = "title=Effect%20of%20Index%20Derivative%20Trading%20on%20Indian%20Stock%20Market%3A%20A%20Comparison%20of%20Pre%20and%20post%20Introduction%20period"
    headers = {
        'x-access-token': "52$QS^OVNjz4AnbWjwbyZ*I8F&MgIXXRDPm2XFDSJDpX8dUmP^zLVO#tE-g&yk)O",
        'cache-control': "no-cache",
        'postman-token': "a89c7582-3222-70b0-39af-ed2ba7f8ad92",
        'content-type': "application/x-www-form-urlencoded"
    }

    response = requests.request("PUT", url, data=payload, headers=headers)

    end    = time.time(); # microseconds
    output = round((end - start) / 1000, 4) # convert to milliseconds

    # start = 0.0
    end = 0.0
    # Output
    return render_template('journals.html', result=response.text, time = output)
