# Media Streaming Prototype

This project can be used for making backend of a media streaming app.

## Required

Run
`npm install`
to install all the dependencies

## Run

`npm start`

## HLD

A Frontend service could send the media file through the api. Then it can also request the feed for the user.
Which can be created specifically for the user as well. But here it is same for all users.
Also front-end could request the media in chunks such that user could easily stream through it.

## LLD

The api that frontend service could use is
/audio/upload - to upload the audio file along with adjoining data
/audio/:videoname - to get the respective audio file in chunk
/feed - to get the common feed for user to navigate
/video/upload - to upload the video file using multipart form
/video/:videoname - to get the respective video in chunk
