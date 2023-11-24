


def get_price(page_url):
    res = requests.get(page_url)
    soup = bs4.BeautifulSoup(res.text, features="lxml")
    selected_html = soup.select('.a-span12 span.a-color-price')

    if not selected_html:
        selected_html = soup.select('.a-color-base span.a-color-price')

    pattern = r'\d*,?\d*,?\d*\d'
    regex = re.compile(pattern)
    matches = re.findall(regex, selected_html[0].text)
    price = matches[0].replace(',', '')
    return int(price)


def get_title(page_url):
    res = requests.get(page_url)
    soup = bs4.BeautifulSoup(res.text, features="lxml")
    selected_html = soup.select('#productTitle')
    title = selected_html[0].text
    title = title.replace(' ', '')
    title = title.replace('\n', '')
    return title

print(get_title('https://qiita.com/kawa-Kotaro/items/f417e7a5776a8ece0d0b'))