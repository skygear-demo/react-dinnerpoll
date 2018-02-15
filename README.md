# Dinner poll

A serverless polling web app using [Skygear](https://skygear.io/) as cloud database. https://reactdinnerpoll.skygeario.com/static/

Skygear features demonstrated:

* User Authentication: Sign in/up/out
* Cloud Database
  * Basic CRUD: CRUD a vote
* PubSub: Hot reloading when others voted
* Cloud Functions
  * Raw SQL execution
  * Trigger by Client SDK
    * `op` in JS cloud code (index.js)
    * `lambda` in JS SDK (ResultsChart.js)

## Quick start

Development:

```bash
git clone https://github.com/skygear-demo/react-dinnerpoll.git
cd dinner-poll
yarn install # npm install, if you are using npm
yarn start
```

Deploying:

```bash
yarn build
yarn deploy
```

## Remarks for building React app with Skygear

1. Provide the website root URL in the `homepage` field in `package.json` to tell React to build the app relatively to it
2. Rename the `build` directory to `public_html` after building

(This app has already been properly configured)

## To-do

none
