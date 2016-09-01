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

    payload = "title=Visual%20Communication%20and%20Design%E2%80%99s%20Role%20Drives%20Branding%20Innovation%20and%20Social%20Responsibility&author=Stephen%20T.F.%20Poon&abstract=In%20this%20paper%2C%20the%20aim%20of%20research%20is%20to%20analyse%20the%20theoretical%20principles%20of%20traditional%20and%20newer%20forms%20of%20branding%20design%2C%20and%20to%20review%20the%20visual%20communicator%E2%80%99s%20roles%20as%20constructed%20through%20traditional%2C%20social%20and%20postmodernist%20perspectives.%20Where%20designers%20traditionally%20direct%20their%20course%20in%20the%20branding%20process%20to%20solving%20clients%E2%80%99%20problems%20through%20the%20production%20of%20symbolic%20icons%20and%20images%2C%20this%20study%20will%20place%20their%20responsibility%20towards%20understanding%20society%E2%80%99s%20attitudinal%20and%20behavioural%20change%20at%20the%20forefront.%20This%20paper%20uses%20case%20study%20and%20qualitative%20inquiry%20methods%20to%20challenge%20the%20design%20fraternity%20to%20see%20beyond%20the%20bread-and-butter%20work%20behind%20conceptual%20design%20development%2C%20and%20to%20find%20a%20stronger%20relational%20understanding%20between%20their%20life%20experiences%2C%20changing%20consumer%20perceptions%20of%20the%20world%2C%20and%20businesses%E2%80%99%20ultimate%20goals%20of%20profit.%20Research%20shows%20that%20as%20the%20dynamics%20of%20ethical%20business%20and%20social%20purpose%20continue%20to%20affect%20the%20production%20and%20consumption%20of%20goods%2C%20the%20visual%20communicator%E2%80%99s%20role%20is%20to%20both%20define%20and%20empower%20cultural%20consumption%20as%20the%20core%20brand%20purpose%20of%20today%E2%80%99s%20organisations%20-%20five%20decades%20since%20Ken%20Garland%E2%80%99s%20manifesto%3B%20%E2%80%9CFirst%20Things%20First%E2%80%9D%20was%20proclaimed.%20Lastly%2C%20it%20shall%20be%20argued%20for%20every%20designer%20to%20evaluate%20their%20social%20responsibility%20in%20the%20branding%20execution%20of%20marketed%20consumer%20brands%20beyond%20symbolic%20meaning%20construction&keywords=&image=http%3A%2F%2Fjournals.itb.ac.id%2Fpublic%2Fsite%2Fimages%2Fbudini%2Fjvad.jpg&file=http%3A%2F%2Fjournals.itb.ac.id%2Findex.php%2Fjvad%2Farticle%2Fview%2F2040%2F1220&issn=2337-5795&publisher=Journal%20of%20Visual%20Art%20and%20Design&volume=8&page=1-15&number=1&year=2016&month=&day="
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
