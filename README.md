## Forum web
#### A node application created with Node, Express, Mongoose, Pug and another tools.

### Dependencies
1. Node.js [Download](https://nodejs.org/en/download/).
2. Mongo DB [Download](https://www.mongodb.com/download-center#community).

### Getting started
First copy the `.env.example` to `.env` and modify the environment variables with your values.
```sh
$ cp .env.example .env
```

```sh
DEBUG=nodejs-fsbt-04-2018:*
MONGO_URI_CONNECTION=mongodb://host/database
SESSION_KEY=secret
JWT_SECRET_KEY=secret
JWT_EXPIRES_IN=3600

# Firebase
FIREBASE_APIKEY=API_KEY
FIREBASE_AUTHDOMAIN=AUTHDOMAIN
FIREBASE_DATABASEURL=DATABASEURL
FIREBASE_STORAGEBUCKET=STORAGEBUCKET
FIREBASE_SENDERID=SENDERID
```

### Development
```sh
# Install dependencies
$ yarn install

# Start serve
$ yarn dev
```

### Production
```sh
# Install dependencies
$ yarn install

# Start production
$ yarn start
```

For any feedback contact me `hello@coderdiaz.me`.

Created with love and other things :heart: