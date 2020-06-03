from bs4 import BeautifulSoup
import urllib.request as ur
import json
import os
import time

'''
When redoing a new app,
change the overarchingProject spec below to match what it should be,
new inital room, StoryName, ect
run
take the json file it creates and copy the contents into src/data/StoryKey.json in the mobile app code
then change the APP.JSON stuff to be correct
'''

#the initial room of my current story is the following URL/ID combination
overarchingProject = {
    "baseURL": "https://infinite-story.com/",
    "StoryName": "Imagination",
    "Author": "EndMaster",
    "LinkToStorySite": "https://infinite-story.com/story/info.php?id=2323",
    "LinkToProfile": "https://infinite-story.com/profile/?id=5396",
    "Description": "",
    "StoryDateCreated": "11/28/2005",
    "Choices": "31",
    "Rooms": "32",
    "RoomKey": {},
    "initialRoom": "story/room.php?id=41162",
}

'''
overarchingProject = {
    "baseURL": ,
    "StoryName": ,
    "Author": ,
    "LinkToStorySite": ,
    "LinkToProfile": ,
    "Description": ,
    "StoryDateCreated": ,
    "Choices": ,
    "Rooms": ,
    "RoomKey": ,
    "initialRoom": ,
}

'''


baseURL = overarchingProject["baseURL"]
queue = []
initialRoom = overarchingProject["initialRoom"]
queue.append(initialRoom)



os.system("mkdir " + ".\\" + overarchingProject["StoryName"])

filepath = os.path.join(".", overarchingProject["StoryName"], overarchingProject["StoryName"] + "Spec.json")

with open(filepath, "w") as f:
    json.dump(overarchingProject,f)


'''
Room key object defintion
roomname: {
    currentChoiceURL: ""
    title: "",
    body: "",
    choices: [{choiceText: "", choiceURL: ""}],
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
    body = body.replace("\u0085"," ")
    choices = soup.find('div', attrs={'class': 'room-choices mt-4'})

    endtag = soup.find('div', attrs={'class': 'room-footer text-center text-md-left'})
    currentRoomURL = endtag.find('a').get('href')

    try:
        for link in choices.find_all('a'):
            choiceURL = link.get('href')
            choiceText = link.get_text()
            choiceText = choiceText.replace("\u0085"," ")
            links.append({"choiceURL": choiceURL, "choiceText": choiceText})
            if choiceURL not in RoomKey.keys():
                queue.append(choiceURL)
    except:
        print("End of Path Reached")
        print(currentChoiceURL)
        print(currentRoomURL)

    currentObject = {
        "currentRoomURL": currentRoomURL,
        "body": body,
        "choices": links,
    }
    RoomKey[currentChoiceURL] = currentObject



overarchingProject["RoomKey"] = RoomKey



with open("./"+ overarchingProject["StoryName"] + "/" + overarchingProject["StoryName"]+'.json', 'w') as fp:
    json.dump(overarchingProject, fp)
