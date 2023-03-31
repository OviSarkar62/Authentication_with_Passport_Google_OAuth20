# Authentication with Passport Google OAuth20

This project is based on the authentication system with Passport Google OAuth20 using Node Express Mongodb & EJS.

## Command lines for packages

`npm install connect-mongo cors dotenv ejs express mongoose nodemon`

`npm install bcrypt express-session passport passport-google-oauth20`

`npm start`

## Database Connection
In the server side create .env file and put this code inside it.

`DB_URL = mongodb+srv://<user>:<pass>@cluster0.l17quyr.mongodb.net/database`

`GOOGLE_CLIENT_ID=<client ID>`

`GOOGLE_CLIENT_SECRET=<client secret>`

## Google Application Creation
Before using passport-google-oauth20, you must register an application with Google. If you have not already done so, a new project can be created in the [Google Developers Console](https://console.developers.google.com/). Your application will be issued a client ID and client secret, which need to be provided to the strategy. You will also need to configure a redirect URI which matches the route in your application.

`callbackURL: "http://www.example.com/auth/google/callback"`

To know more about the passport google oauth20 documentation visit [passport-google-oauth20](https://www.passportjs.org/packages/passport-google-oauth20/)
