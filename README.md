<p align="center">
  <a href="https://suibian-database.herokuapp.com/">
    <img src="https://i.imgur.com/1vA5pMw.png" width="180px" alt="Suibian Logo" />
  </a>
</p>
<p align="center"><a href="https://suibian-database.herokuapp.com/">Go to Suibian!</a></p>
Suibian is a food recommendation app for groups of friends that don't know what or where to eat. Just load up Suibian, pick your location of meetup, and create a room. Your friends can then join your room and you can all decide as a group what food to eat by voting on food items. We'll show you where to eat at the end!

# How to use
![Suibian Landing Page](https://i.imgur.com/7A0o0Ti.png)
1. First, go to **User Preferences** to change your dietary restrictions. Go back to the home page after clicking save preferences.
2. One person from your group will be the room owner. From the home page, click on **Create Room**. You will be asked to input a meeting location and your username. This can be anything you like.
3. You will be moved into a room lobby. Take note of your room code at the top (without the '#' symbol). Send this to your friends so they can join your room!
4. The rest of the group will click on **Join Room** at the home page. You will be asked to put in the room code and a username.
5. The room owner clicks on **Start Room** once everybody is in.
6. Follow the instructions and click on the heart if you like the food, and the cross if you don't!
7. View the results and Suibian eat!


# Contributing to Suibian

To update the application code, you must be a contributor of this repository. Create a new branch and submit a pull request for the master branch. Do look at the issues if you want something to work on, or open your own!

Please make sure your code works before submitting a pull request. You should test your code on a local server localhost:3000 to make sure everything is functioning correctly first. 

# Getting started (For developers)

## Installation
1. Clone this repository into your local machine.
2. Make sure you have [yarn](https://yarnpkg.com/) installed.
3. Open a terminal instance and `cd` to the root directory of your cloned repository. In the root directory, type `yarn install`. This is a mono-repo format where the common modules will be installed in the root folder directory and the more specific modules are installed in the respective packages of client and server.

## Testing your local setup

After the node modules is installed, run `yarn dev` in both suibian-server and suibian-app to get it working. This runs both the server and client in development mode.

Open [http://localhost:3000](http://localhost:3000) to view it in the browser. The app is being served via a http proxy to the express server which serves the react app.

# Yarn commands

If you would like a more specific runtime, there are several other commands to run either the client or server in standalone mode.

## From root directory

### `yarn run app-start`

Runs only the client in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will hot reload if you make edits and save.<br />
You will also see any linting errors in the console.

### `yarn run server-start`

Runs the server using ts-node.

### `yarn run server-dev`

Runs the server using nodemon, enabling hot reloading.

## From suibian-app directory (client)

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

## From suibian-server directory (server)

### `yarn start`

Compiles the typescript files and launches the express server on the port specified (default is 4000).

### `yarn run clean`

Cleans the outDir of the typescript compile, removing old typescript files.
