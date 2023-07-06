# React+Tailwind+Firebase with Vite build tool

This a deployable app with local firebase support.

The app has sign in and sign up forms that allow for proceeding into the restricted area.

Firebase emulators are already a part of the assembly and can be used after the setup.

## Setup

#### Configuration files (everything in caps and camelcase should be updated):

**.firebaserc.template** - duplicate and remove template extension
**.firebase.json.template** - duplicate and remove template extension
**src/firebase/firebase.config.js** - contents can be copied directly from firebase project settings

##### Useful commands:

Install app modules

> npm install

To run locally

> npm run dev

To run firebase locally:

> npm run emulators

to deploy

> npm run build

> npx firebase deploy


React and Vite Credits to [Brian Holt](https://github.com/btholt) 
