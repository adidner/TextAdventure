from bs4 import BeautifulSoup
import urllib.request as ur


#the initial room of my current story is the following URL/ID combination



overarchingProject = {
    "baseURL": "https://infinite-story.com",
    "StoryName": "InnKeeper",
    "Author": "EndMaster",
    "LinkToStorySite": "https://infinite-story.com/story/info.php?id=2349",
    "LinkToProfile": "https://infinite-story.com/profile/?id=5396",
    "Description": "Running the family business isn't easy!",
    "StoryDateCreated": "12/28/2005",
    "Choices": "85",
    "Rooms": "75",
    "RoomKey": {}
}

baseURL = "https://infinite-story.com/"
queue = []
initialRoom = "story/room.php?id=87587"
queue.append(initialRoom)

'''
Room key object defintion
roomname: {
    urlExtension: ""
    title: "",
    body: "",
    choices: [""],
}
'''

RoomKey = {

}

while len(queue) > 0:
    links = []
    currentObject = {}
    urlExtension = queue.pop(0)
    urlToScrape = baseURL + urlExtension
    r = ur.urlopen(urlToScrape).read()
    soup = BeautifulSoup(r, features="html.parser")


    body = soup.find('div', attrs={'class': 'description'}).get_text()
    choices = soup.find('div', attrs={'class': 'room-choices mt-4'})


    for link in choices.find_all('a'):
        links.append(link.get('href'))
        queue.append(link.get('href'))

    currentObject = {
        "urlExtension": urlExtension,
        "body": body,
        "choices": links,
    }
    RoomKey["urlExtension"] = currentObject


overarchingProject["RoomKey"] = RoomKey
print(overarchingProject)
