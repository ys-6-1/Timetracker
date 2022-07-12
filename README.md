# Time Tracker

Welcome to Time Tracker!
![time_tracker_img](https://user-images.githubusercontent.com/72680138/169623079-d7cef01d-06a5-40e7-9002-286e00f15ecc.jpg)

## Introduction

This application was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io/ "Code Chrysalis Website").

Time Tracker is a single page timer / time-tracking application. It allows users to keep track of their time based on the categories they created. It also offers visualization with charts for users to easily see their progress.

## Using the Application

To use the application locally, please follow the steps below.

Please visit the deployed app at: [https://timetracker-ys.herokuapp.com/](https://timetracker-ys.herokuapp.com/)

### Run it in the development mode

**1: Create .env file and database**

To run this application locally, you need to fork this repository and create the following:

- a `.env` file in the root directory
- a local psql database named `time_tracker`

**2: Copy and paste the following into a `.env` file**

```
DB_USER=your user name
DB_PASSWORD=your password
DB_NAME=time_tracker
```

**3: Install dependencies**
Install the dependencies by running:

```jsx
npm i
```

**4: Start server**

In the root directory, you can start a server by running:

`npm start`

**Note:** Database migration and data seeding runs automatically whenever the server is started. If you use nodemon to run the server by running `npm run hack:server`, please keep that in mind.
You can disable automatic migration / seeding by deleting or commenting out the relevant code in `index.js` file.

**5: Start front-end**

To start front-end, you can go into "client" directory by running `cd client` and run:

`npm start`

**6: Open in browser**

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Tech Stack

### Back-end:

Node.js / Express\
PostgreSQL\
Knex.js

### Front-end

React
