
# Additional notes for the NodeJS/Express server

## How to prep and run this server

```
cd server
npm install
npm start
```

This will launch the server listening on port 8081

If you run `npm start` in the project home directory, webpack-hot-loader (WHL) will be listening on port 8080.
So while you are making code changes to your React components, WHL is updating the running code in your browser.
Also, WHL is already configured to look at port 8081 for any url that starts with /apt/ so you can fetch info
from the server running in this directory.

## Things you can add to server.js

1. CORS - allow this server to field requests from web pages at a different IP address
  In the above example, with two servers on ports 8080 and 8081 the IP address is the same so this is not needed.

  ```bash
  npm install cors --save
  ```

  ```js
  const cors = require('cors');
  app.use(cors());
  ```

2. Save secret info like login credentials in a .env file and then access the info in server.js

```bash
npm install dotenv --save
```

your `.env` file might look like this

```bash
UNSPLASH_ID='long hex code free account ID'
UNSPLASH_SECRET='long hex code secret number'
```


```js
require('dotenv').config()

// access all the variables by process.env.VAR_NAME

const cred = {
   applicationId: process.env.UNSPLASH_ID,
   secret: process.env.UNSPLASH_SECRET
}
```