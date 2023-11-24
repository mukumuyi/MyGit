pip install requests


import requests

url = "http://www.ymori.com/books/python2nen/testl.html"
response = requests.get(url)

response.encoding = response.apparent_encoding

print(response.text)