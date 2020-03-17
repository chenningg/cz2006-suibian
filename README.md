# Accessing the app
The app is being hosted on Heroku. Due to free dyno hours, please do not access it during 2:30am-8:30am GMT+8.<br />
You can find the app [HERE.](https://suibian-sg.herokuapp.com/)

# Deploying server code
To update the application code, you must be a contributor of this repository. Create a new branch and submit a pull request for the master branch. Once approved, your code will automatically be deployed to Heroku.

Please make sure your code works before deploying to master. You should test your code on a local server localhost:3000 to make sure everything is functioning correctly first.


# Getting started

### Installation
cd into suibian-server and suibian-app and run `npm install` in both directories. 

### Testing local setup 
After the node modules is installed, run `npm start` in both suibian-server and suibian-app to get it working. 

Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
The app is being served via a http proxy to the express server which serves the react app.




# React commands
### `npm start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

# Express commands

### `npm start`

Compiles the typescript files and launches the express server on the port specified (default is 4000).

### `npm run clean`

Cleans the outDir of the typescript compile, removing old typescript files


## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

# NodeJS
Insert server stuff here.
