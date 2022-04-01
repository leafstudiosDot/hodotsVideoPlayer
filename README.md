This library was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and for React.js developers only.

# Notice to downloaders here!
Do not install this package in your React project yet, This package development is paused and we are deeply sorry if you have experienced bugs at this package.
We aren't sure when to resume it's development for the video player.

Sorry for the inconvinience

# hodots. Video Player
<p align="center">
    <img alt="hodots." src="https://d2yh2dnxo9v5ix.cloudfront.net/logo512.png" width=70>
</p>
hodots. Video Player is open source video player by [TuxPenguin09](https://github.com/TuxPenguin09) for his made from scratch video player.

## Install
`npm i @leafstudiosteam/hodotsvideoplayer --save`

## React.js Import
```
import { VideoPlayer } from '@leafstudiosteam/hodotsvideoplayer';
import '@leafstudiosteam/hodotsvideoplayer/dist/index.cjs.css';
```

## Usage
```node
//Import Libraries
import { VideoPlayer } from '@leafstudiosteam/hodotsvideoplayer';
import '@leafstudiosteam/hodotsvideoplayer/dist/index.cjs.css';

<VideoPlayer 
src={/* Source of the video */}
placeholder={/* Thumbnail */}
/>
```

## Parameters
### src (string)
A source of the video, or a link that returns a `video/*`.
### placeholder (string)
A source of an image, or a link that returns a `image/*`.
### keysDisabled (boolean)
Whether some keys assigned will never respond if the boolean is true.

## Key Bindings
- `<-` -5 seconds
- `->` +5 seconds
- `Space` Pause/Play