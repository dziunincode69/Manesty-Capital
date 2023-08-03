const express = require('express')
const sessions = require('express-session');
const app = express()
const port = 3000
const Router = require('./routes');
app.set('view engine', 'ejs')
app.use(express.static("./css"));
app.use(express.urlencoded({extended: true}))
app.use(sessions({
  secret: "thisismysecretmanesty13371337",
  resave: false,
  cookie: { 
    maxAge: 120 * 60 * 1000, // 1 hour, adjust as needed
    httpOnly: true,
    secure: false
},
  saveUninitialized: true,
}));
app.use(Router)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})