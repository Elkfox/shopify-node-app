---
title:  "Running"
handle: "running"
category: "running"
---

### Debug mode
To start the app in debug mode simply run `npm run debug`. This will start the app on port 3000 with debugging turned on.
You can access the app by visiting `localhost:3000`

Also available is `npm run debugwatch` which will start nodemon and allow you live-restart your server whenever you make changes.

### Production mode
You can start the app in production mode by running `npm start` or `npm watch`.

**Note**: You must set the environment variable `PORT` to whatever port you wish to run your production server on. (80, 8000, 8080, etc) If this is not defined app will run on port 3000 like in development mode.
