from flask import Flask, jsonify, abort, make_response, request, render_template
import requests, json, datetime, time

app = Flask(__name__)
start = time.time();

# Request to API

# Make are roots
@app.route('/')
def hello_world():

    global start, time

    url = "http://localhost:2000/journals/add"

    payload = "title=%20The%20Effect%20of%20Applying%20Artificial%20Intelligence%20in%20Shaping%20Marketing%20Strategies%3A%20Field%20Study%20at%20the%20Jordanian%20Industrial%20Companies&author=Dr.%20Ahmad%20Saleh%20Al-Sukkar%2C%20Dr.%20Al-Hareth%20Muhammad%20Musa%20Abu%20Hussein%2C%20Muhammad%20Mansour%20Abu%20Jalil&abstract=This%20study%20aimed%20at%20identifying%20the%20effect%20of%20applying%20artificial%20intelligence%20in%20shaping%20marketing%20strategies%20in%20the%20industrial%20companies%20listed%20in%20Amman%20stock%20market.%20The%20sample%20consisted%20of%20(65)%20marketing%20managers%20of%20the%20companies%20incorporated%20in%20the%20study.%20The%20study%20revealed%20the%20existence%20of%20an%20effect%20of%20applying%20artificial%20intelligence%20in%20shaping%20marketing%20strategies%20(cost%20leadership%2C%20differentiation%2C%20focus%2C%20alliance%2C%20diversification%20and%20direct%20marketing).%20In%20the%20light%20of%20the%20results%2C%20the%20researchers%20offered%20a%20number%20of%20recommendations%20the%20most%20prominent%20of%20which%20are%3A%20Practicing%20better%20use%20of%20modern%20and%20developed%20technological%20programs%20based%20on%20artificial%20intelligence%20styles%2C%20connecting%20between%20the%20application%20of%20artificial%20intelligence%20styles%20and%20the%20development%20of%20marketing%20strategies%20in%20a%20way%20that%20fosters%20the%20attention%20to%20embrace%20developed%20new%20products%20and%20giving%20more%20care%20to%20the%20implementation%20of%20artificial%20intelligence%20styles.&keywords=Artificial%20intelligence%2C%20marketing%20strategies%2C%20industrial%20companies&image=http%3A%2F%2Fwww.ijastnet.com%2Fijast%2Fpublic%2Fimages%2Fcover_page.jpg&file=http%3A%2F%2Fwww.ijastnet.com%2Fjournals%2FVol_3_No_4_April_2013%2F1.pdf&issn=2221-1004&publisher=International%20Journal%20of%20Applied%20Science%20and%20Technology&volume=3&page=&number=4&year=2013&month=4&day="
    headers = {
        'x-access-token': "52$QS^OVNjz4AnbWjwbyZ*I8F&MgIXXRDPm2XFDSJDpX8dUmP^zLVO#tE-g&yk)O",
        'cache-control': "no-cache",
        'postman-token': "a44fdd21-3f4e-dbae-2bd1-06b51dfe96d9",
        'content-type': "application/x-www-form-urlencoded"
        }

    response = requests.request("POST", url, data=payload, headers=headers)

    end    = time.time(); # microseconds
    output = round((end - start) / 1000, 4) # convert to milliseconds

    # start = 0.0
    end = 0.0
    # Output
    return render_template('journals.html', result=response.text, time = output)
