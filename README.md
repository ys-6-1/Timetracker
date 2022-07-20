# Time Tracker

Welcome to Time Tracker!
![time_tracker_img](https://user-images.githubusercontent.com/72680138/179129719-3f709c9c-54da-49c3-8470-5ae348de4d86.png)

![timer_tracker_img2](https://user-images.githubusercontent.com/72680138/179129978-b96f32ec-4054-43e1-8d79-21c93d3da4c1.png)

<img src="https://user-images.githubusercontent.com/72680138/179130230-0317829b-e2f6-4f6a-8de7-4f582da752cc.png" width="200">

# Introduction

This application was created during my time as a student at [Code Chrysalis](https://www.codechrysalis.io/ "Code Chrysalis Website").

Time Tracker is a timer / time-tracking application that allows users to keep track of their time based on the categories they created. It also offers visualization with charts for users to easily see their progress.

## Demo Video

Demo video is available on [YouTube](https://www.youtube.com/watch?v=72FbO49y2eQ)

## Deployed Application

Deployed app is avaialble at: [https://timetracker-ys.herokuapp.com/](https://timetracker-ys.herokuapp.com/)

## Features

- User registration
- User sign-in / sign-out
- CRUD features for categories and duration
- Timer feature
- Search by catetgory title
- Sort by category title, total time, updated time, etc.
- Visualisation of statistics with charts and a summary table
- Pagination
- Toggle feature for base calculation period

# Run it in the development mode

To use the application locally, please follow the steps below.

**1: Create .env file and database**

To run this application locally, you need to fork this repository and create the following:

- a `.env` file in the root directory
- a local psql database named `time_tracker`

**2: Copy and paste the following into a `.env` file**

```
DB_USER=your user name
DB_PASSWORD=your password
DB_NAME=timetracker
SESSION_SECRET=your secret key
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

# Tech Stack

## Back-end:

Node.js / Express\
PostgreSQL\
Knex.js\
Passport.js

## Front-end

React\
Apex Chart\
Moment.js\
React Bootstrap\
Sass
