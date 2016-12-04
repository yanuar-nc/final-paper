from flask import Flask, jsonify, abort, redirect, url_for, make_response, request, render_template
import requests, json, datetime, time

app = Flask(__name__)
time = time
start = time.time()
host  = 'http://localhost:2000'
# Request to API

# get journal
@app.route('/', methods=['GET'])
def index():

    r = requests.get( host + '/journals', auth=('user', 'pass'))
    
    # Get json 
    response = json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': '))    
    journals = json.loads(response)["journals"];

    end    = time.time(); # microseconds
    output = round((end - start) / 1000, 4) # convert to milliseconds
    # start = 0.0
    end = 0.0
    # Output
    # return render_template('journals.html', result=datas, time = output)
    return render_template('index.html', result=journals, time = output)

# get detail
@app.route('/detail/<int:journal_id>', methods=['GET'])
def detail(journal_id):

    r = requests.get( host + '/journals/detail/' + str(journal_id), auth=('user', 'pass'))
    # Get json 
    datas = json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': '))
    
    end    = time.time(); # microseconds
    output = round((end - start) / 1000, 4) # convert to milliseconds

    # start = 0.0
    end = 0.0
    # Output
    return render_template('journals.html', result=datas, time = output)

# get search
@app.route('/search/<keyword>', methods=['GET'])
def search(keyword=None):

    global start, time
    start = time.time()
    r = requests.get( host + '/journals/search/' + keyword, auth=('user', 'pass'))
    
    # Get json 
    datas = json.dumps( r.json(), sort_keys=True,indent=4, separators=(',', ': '))
    
    end    = time.time(); # microseconds
    output = round((end - start) / 1000, 4) # convert to milliseconds

    # start = 0.0
    end = 0.0
    # Output
    return render_template('journals.html', result=datas, time = output)

# Insert journal
@app.route('/insert', methods=['GET', 'POST'])
def insert():

    if request.method == 'POST':
        
        post = request.form
        
        url = host + '/journals/add'
        # payload = "title=" + post['title'] + "&author=Dr.%20Ahmad%20Saleh%20Al-Sukkar%2C%20Dr.%20Al-Hareth%20Muhammad%20Musa%20Abu%20Hussein%2C%20Muhammad%20Mansour%20Abu%20Jalil&abstract=This%20study%20aimed%20at%20identifying%20the%20effect%20of%20applying%20artificial%20intelligence%20in%20shaping%20marketing%20strategies%20in%20the%20industrial%20companies%20listed%20in%20Amman%20stock%20market.%20The%20sample%20consisted%20of%20(65)%20marketing%20managers%20of%20the%20companies%20incorporated%20in%20the%20study.%20The%20study%20revealed%20the%20existence%20of%20an%20effect%20of%20applying%20artificial%20intelligence%20in%20shaping%20marketing%20strategies%20(cost%20leadership%2C%20differentiation%2C%20focus%2C%20alliance%2C%20diversification%20and%20direct%20marketing).%20In%20the%20light%20of%20the%20results%2C%20the%20researchers%20offered%20a%20number%20of%20recommendations%20the%20most%20prominent%20of%20which%20are%3A%20Practicing%20better%20use%20of%20modern%20and%20developed%20technological%20programs%20based%20on%20artificial%20intelligence%20styles%2C%20connecting%20between%20the%20application%20of%20artificial%20intelligence%20styles%20and%20the%20development%20of%20marketing%20strategies%20in%20a%20way%20that%20fosters%20the%20attention%20to%20embrace%20developed%20new%20products%20and%20giving%20more%20care%20to%20the%20implementation%20of%20artificial%20intelligence%20styles.&keywords=Artificial%20intelligence%2C%20marketing%20strategies%2C%20industrial%20companies&image=http%3A%2F%2Fwww.ijastnet.com%2Fijast%2Fpublic%2Fimages%2Fcover_page.jpg&file=http%3A%2F%2Fwww.ijastnet.com%2Fjournals%2FVol_3_No_4_April_2013%2F1.pdf&issn=2221-1004&publisher=International%20Journal%20of%20Applied%20Science%20and%20Technology&volume=3&page=&number=4&year=2013&month=4&day=1"
        headers = {
            'x-access-token': "52$QS^OVNjz4AnbWjwbyZ*I8F&MgIXXRDPm2XFDSJDpX8dUmP^zLVO#tE-g&yk)O",
            'cache-control': "no-cache",
            'postman-token': "a44fdd21-3f4e-dbae-2bd1-06b51dfe96d9",
            'content-type': "application/x-www-form-urlencoded"
        }

        response = requests.request("POST", url, data=post, headers=headers)

        end    = time.time(); # microseconds
        output = round((end - start) / 1000, 4) # convert to milliseconds

        # start = 0.0
        end = 0.0

        # Output
        # return render_template('journals.html', result=response.text, time = output)
        return redirect(url_for('index'))

    return render_template('insert.html')

# Update Journal
@app.route('/update')
def update():

    url = host + "/journals/edit/114"

    payload = "title=The%20Sun%20is%2C%20oh%2C%20so%20desperate%20to%20set%20tonight"
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
