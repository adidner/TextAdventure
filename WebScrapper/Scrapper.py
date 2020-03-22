from bs4 import BeautifulSoup
import urllib.request as ur
import json

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
    currentChoiceURL: ""
    title: "",
    body: "",
    choices: [""],
}
'''

RoomKey = {

}

while len(queue) > 0:
    print("queue: ", end="")
    print(queue)
    links = []
    currentObject = {}
    currentChoiceURL = queue.pop(0)
    urlToScrape = baseURL + currentChoiceURL
    r = ur.urlopen(urlToScrape).read()
    soup = BeautifulSoup(r, features="html.parser")


    body = soup.find('div', attrs={'class': 'description'}).get_text()
    choices = soup.find('div', attrs={'class': 'room-choices mt-4'})

    endtag = soup.find('div', attrs={'class': 'room-footer text-center text-md-left'})
    currentRoomURL = endtag.find('a').get('href')

    try:
        for link in choices.find_all('a'):
            choiceURL = link.get('href')
            links.append(choiceURL)
            if choiceURL not in RoomKey.keys():
                queue.append(choiceURL)
    except:
        print("something went wrong")
        print(currentChoiceURL)
        print(currentRoomURL)

    currentObject = {
        "currentRoomURL": currentRoomURL,
        "body": body,
        "choiceURLs": links,
    }
    RoomKey[currentChoiceURL] = currentObject
    with open('result.json', 'w') as fp:
        json.dump(RoomKey, fp)


overarchingProject["RoomKey"] = RoomKey


# with open('result.json', 'a') as fp:
#     json.dump(overarchingProject, fp)

#print(overarchingProject)
