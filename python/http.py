import http.client

conn = http.client.HTTPConnection("localhost:2000")

headers = {
    'x-access-token': "52$QS^OVNjz4AnbWjwbyZ*I8F&MgIXXRDPm2XFDSJDpX8dUmP^zLVO#tE-g&yk)O",
    'cache-control': "no-cache",
    'postman-token': "296d2c64-3353-93a6-1e77-b51793fc902f"
    }

conn.request("GET", "/journals", headers=headers)

res = conn.getresponse()
data = res.read()

print(data.decode("utf-8"))