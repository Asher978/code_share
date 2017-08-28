# Group Project: Code-Share

General Assembly WDI NYC
August, 2107

#### The Master Minds
- Mitchel Severe 
- Mili Neykkova
- Asher Shaheen

![code-share](https://thumbs.gfycat.com/DirtyPlasticAndeancat-max-1mb.gif)

## Description 
Code Share is a platform that provide Groups an ability to code together without being together in one place. The app has an option to work on coding challenges which include _TESTS_ or to work/share individual code collabratively. Users can also save the writen code in a JS format for their reference. The app provides a _CODE EDITOR_ sourced from another NPM PACKAGE _CODEMIRROR_. The app will also provide a feature where USERS can find coding events based on the USER input language. USERS will also be able to create their own events. The app will provide a feature for _AUTHS_ thus enabling the USERS to post specific events connected to their profile.

## User Stories ( M V P )
  *  USER should be able to create a USER NAME ( NO AUTHS )
  *  USER should be able to view the coding challenges & the events on the main page
  *  USER should be able to select a challenge followed by a render of code editor for that challenge in a specific ROOM
  *  USER should be able to SAVE the code by an option of DOWNLOAD
  *  USER should be abe to view who is in the ROOM and who is typing should show
  *  USER should be able to CREATE or SEARCH coding events based on the language they provided

## BONUS FEATURES
  *  AUTHS - option to REGISTER and LOGIN - [x]
  *  CHAT window in the ROOMS - [x]
  *  Providing tests for the code challenges - [x]

## Our Approach
  
## Sourced Technologies                  
- [x] React.js
- [x] Node.js
- [x] Express
- [x] Socket.io
- [x] PSQL
- [x] JSX
- [x] BootStrap
- [x] Passport / Sessions

## Sourced NPM Packages Outside of Our Course
- [x] Socket.io (Enabling Realtime. Connected with the chat box and code editor so all users see real time updates on all connected sockets)
- [x] Moment & Moment-Duration-Format" (Parsing Dates & Times received from API Response)
- [x] Codemirror (React Code Editor Component. Set to be used in JS Language only)
- [x] VM (Sandbox For Code Evaluation. To execute user code in its own ENV without effecting our own App's EVN)
- [x] Chai, Expect, Assert & Check-Error (User Code Testing & Error Handlings)
- [x] File-Saver (Option to download the User code in JS format)

## 3rd Part API
- [x] Google (Provided Lat & Lng from User Input ZIP)
- [x] Meetup (Provided Events on requested ZIP CODE)

## ERDs

Events  |  Type  |
---  |  ---  |
ID  |  SERIAL PRIMARY KEY
Title  |  VARCHAR(255)
Desc  |  TEXT
date  |  DATE
time  |  TIME
user_id  |  INTEGER REFERENCES users(id)

Users  |  Type  | 
---  |  ---  |
ID  |  SERIAL PRIMARY KEY
username  |  VARCHAR(255) UNIQUE NOT NULL
password_digest  |  TEXT NOT NULL
email  |  VARCHAR(255) UNIQUE NOT NULL
firstname  |  TEXT NOT NULL
lastname  |  TEXT NOT NULL

## Snap Shot of File Structure (Front End & Back End)
<details>
<summary>Front End</summary>

```
|_ client
    |_ node_modules
    |_ public
    |_ src
        |_ challenges (JS file containing an array of challenges)
        |_ components
        |    |_ ApiEventList.jsx
        |    |_ ChallengesList.jsx
        |    |_ Chat.jsx
        |    |_ CodeEditor.jsx
        |    |_ EventAddForm.jsx
        |    |_ EventList.jsx
        |    |_ Footer.jsx
        |    |_ Home.jsx
        |    |_ Login.jsx
        |    |_ MainNav.jsx
        |    |_ NotLoggedNav.jsx
        |    |_ Register.jsx
        |    |_ SingleChallenge.jsx
        |__ App.js
        |__ App.css
        |__ index.js
        |__ index.css
```
</details>
<details>
<summary>Back End</summary>


```
|_ controllers
|  |_ events-controller.js
|  |_ users-controller.js
|
|_ db
|  |_ migrations
|  |  |_ migration-082117.sql
|  |_ config.js
|
|_ models
|  |_ events.js
|  |_ user.js
|
|_ routes
|  |_ auth-routes.js
|  |_ code-routes.js
|  |_ event-routes.js
|  |_ meetup-routes.js
|  |_ user-routes.js
|
|_ services
|  |_ auth
|  |  |_ auth-helpers.js
|  |  |_ local.js
|  |  |_ passport.js
|  |
|  |_ code
|  |  |_ code-helper.js
|  |
|  |_ meetup
|    |_ meetup-helper
|
|_ app.js

```

</details>

## Road Blocks